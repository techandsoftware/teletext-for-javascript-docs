<!--
SPDX-FileCopyrightText: © 2025 Rob Hardy
SPDX-License-Identifier: AGPL-3.0-only
-->

# Screen API

## Screen creation

### Teletext(options)

Returns the teletext instance with the API functions below.

The `options` parameter object is optional, with properties:

* `webkitCompat`: boolean (optional)
   * `true` (default) - the generated SVG is compatible with Safari/Webkit browsers (all browsers on iOS), but it's bigger
   * `false` - uses SVG2 features which work in most browsers but not Safari or any browser on iOS, as they fail to render the graphics properly ([see this bug](https://bugs.webkit.org/show_bug.cgi?id=182172)), unless you use `setView` to switch the view to `classic__font-for-mosaic` (documented below)

* `dom`: object (optional)
   * if running in nodejs you need to pass in a window dom object. See the example above

Call the following methods on the teletext instance to draw on the screen and control the rendering.


### addTo(selector)

`selector` is a DOM selector string, e.g. `#teletextscreen` to match a `<div id="teletextscreen"></div>` element.

This adds a teletext screen to the DOM element referred to by the selector, which will create an inline SVG document to render the screen. If you want to export a snapshot of the SVG, you can access it with `document.querySelector(selector).innerHTML`

### setLevel(level)

Sets the teletext level used to display the page. The value is a property on the `Level` object.  `Level` is importable:

```javascript
import { Level } from '@techandsoftware/teletext'
```

Values are `Level[0]`, `Level[1]`, `Level[1.5]`, `Level[2.5]`.  Level 0 isn't a real teletext level, but uses a subset of the spacing attributes roughly corresponding to Ceefax test pages from 1975 (no background colours, double height, reveal, boxed or held mosaic).  Levels 1 to 2.5 are from the ETSI spec. The default is Level 1.

### remove()

Removes the teletext display from the DOM.

## Character sets

### setDefaultG0Charset(charset, withUpdate)

Sets the default G0 character set, and the G2 set with the script matching the G0 set. The character set applies until the function is called again. The default G0 set is `g0_latin`, which is similar to ASCII (it has `¤` instead of `$` and `■` instead of the delete control code). The suffix on the `g0_latin` character set names below correspond to the national option selections defined in ETSI EN 300 706, which modify certain characters from the `g0_latin` set.

`charset` is a string corresponding to one of these:

* g0_latin
* g0_latin\__czech_slovak
* g0_latin\__english
* g0_latin\__estonian
* g0_latin\__french
* g0_latin\__german
* g0_latin\__italian
* g0_latin\__latvian_lithuanian
* g0_latin\__polish
* g0_latin\__portuguese_spanish
* g0_latin\__romanian
* g0_latin\__serbian_croatian_slovenian
* g0_latin\__swedish_finnish_hungarian
* g0_latin\__turkish
* g0_greek
* g0_cyrillic\__russian_bulgarian
* g0_cyrillic\__serbian_croatian
* g0_cyrillic\__ukranian
* g0_arabic
* g0_hebrew

`withUpdate` is an optional boolean. When `true` the display is updated immediately. Defaults to `false`.

There are four G2 sets available. The G2 set which is selected has the same script passed in as the `charset` (for example, if `charset` is `g0_greek` then G2 is set to `g2_greek`.) Hebrew doesn't have a corresponding G2 set, and G2 is set to `g2_arabic`.

For reference, the code charts are on [Wikipedia](https://en.wikipedia.org/wiki/Teletext_character_set), however the character codepoints there don't necessarily match the tables in this codebase (see `src/data/characterEncodings.json`).  The control codes for characters 0 to 1f are used for attributes - see Attributes.

### setSecondG0Charset(charset, withUpdate)

Sets the second G0 character set.  This is used with `Attributes.ESC` (character code 1b) to switch between the default G0 character set and the second G0 character set. The parameters are the same as for `setDefaultG0Charset`. There is no change to the G2 set.

### setG2Charset(charset, withUpdate)

Sets the G2 character set. This can be called to override the G2 set that was selected if `setDefaultG0Charset()` was called.  The G2 set applies until the function is called again or if `setDefaultG0Charset()` is called.

`charset` is a string corresponding to one of these:

* g2_latin
* g2_greek
* g2_cyrillic
* g2_arabic

`withUpdate` is an optional boolean. When `true` the display is updated immediately. Defaults to `false`.

## Write rows to the base page

### setPageRows([strings])

Display the content in the strings. Array of up to 25 elements. Each element is a string up to 40 characters. This is used to set the contents of the whole screen.

Display attributes such as text or graphic colour, flashing and other features are set with control codes defined by ETSI EN 300 706. These can be embedded directly in the strings or are exposed via an `Attributes` class to generate them. See the section below. 

### setRow(rowNum, string)

Display the string on the row number. `rowNum` is between 0 and 24. The string is up to 40 characters.  Display attributes in the string can be used - see the section below.

### loadPageFromEncodedString(base64input, header)

Displays a page from the `base64input`.  The input is a base64-encoded string of 7-bit characters for the 25 rows x 40 characters concatenated together. The encoded string uses the character repertoire defined in the [base64url encoding](https://tools.ietf.org/html/rfc4648#section-5). This format is taken from the URL hash fragment format used by Simon Rawles' online edit.tf teletext editor. See further details here: https://github.com/rawles/edit.tf

`header` is optional. When supplied, it replaces row 0 on the displayed page. It's a string of 32 characters. It can use the Output Line format but without the initial `OL,rowNum,`. See `setPageFromOutputLines` for the format.

### setRowFromOutputLine(rowNum, string)

This is a wrapper around `setRow` which accepts the Output Line format used in .tti files, but without the initial `OL,rowNum,` at the beginning. It displays the string on the row number after decoding the Output Line. See `setPageFromOutputLines` for the format. `rowNum` is between 0 and 24.

### setPageFromOutputLines([lines], header)

This is a wrapper around `setPageRows` which accepts strings in the Output Line format used in MRG's .tti files. The lines are displayed after being decoded. `lines` is an array with up to 25 elements in this format:

`OL,rowNum,line`

In this:

* `rowNum` is between 0 and 24
* `line` is the string to display. Attribute characters (character codes less than 0x20) are represented in three ways: 1) As they are with no translation, or 2) They have 0x80 added to translate them to characters with codes 128-159, or 3) they are replaced by escape (character 0x1b) then the character with 0x40 added.

`header` is optional. When present, it's a string of 32 characters, which have the same encoding as the Output Lines but without the initial `OL,rowNum,` . This is used as the header row and is used instead of Output Line 0 in the provided `lines`. When not provided, the row 0 in the `lines` is used if there is one. 

## Write bytes to the base page

These methods let you set the column as well as the row.

### writeBytes(colNum, rowNum, [lines])

Writes each line in the array to the screen starting from `colNum`, `rowNum`.  This allows you to place a block of text on the screen without affecting preceding columns. `colNum` is from 0 to 39, `rowNum` from 0 to 24.

### writeByte(colNum, rowNum, byte, withUpdate)

Writes the byte to the `colNum`, `rowNum`.  `colNum` is from 0 to 39, `rowNum` from 0 to 24. The `byte` should have a character code of 0x0 to 0x127. The byte won't display literally, as the display uses the active G0 character set and spacing attributes to work out what to show.

`withUpdate` is an optional boolean, default is `false`. When true, the page display is updated.

## Plot pixel graphics

The mosaic graphics set (G1) uses characters with 6 pixels. The `plot` and `plotPoints` methods allow you draw individual pixels and the required characters will be calculated.

### plot(graphicColNum, graphicRowNum)

Plots a pixel. The coordinates are from (0, 0) to (79, 74). The origin is the top-left. Note this uses a different coordinate scheme than methods like `writeBytes()`, which refer to the character cell rows and columns. For performance, there is no range checking, so the display will crash if you try to plot outside of the range. The page display is not updated. You can force an update with `updateDisplay()`.

This generates a 2x3 mosaic (sextant) character corresponding to the character cell in the page model that you're plotting to. Existing mosaics in the cell are modified to plot the pixel. If characters with codes 0x0 to 0x1f are in the target cell, these are unchanged so that spacing atributes are preserved, and the plot has no effect. If characters with codes 0x40 to 0x5f are at the character position you're plotting to, this is cleared first.

To use this, you will first need to set graphics mode for the row by writing a graphic spacing attribute, for example by using `writeByte()` and `Attributes.charfromGraphicColour(colour)`.

### plotPoints(graphicColNum, graphicRowNum, numPixelsPerRow, pixelsArray)

Plots multiple pixels, with the top left origin of (`graphicColNum`, `graphicRowNum`) and `numPixelsPerRow`. This internally calls `plot()`. The top-left coordinates are (0, 0) to (79, 74). As with `plot()`, existing spacing attributes are not overridden, and the display is not updated. You can force an update ewith `updateDisplay()`.  Unlike `plot()`, `plotPoints()` does range checking to ensure the plotted pixels fit on the display.

`numPixelsPerRow` is the number of pixels for each row in the `pixelsArray`.

`pixelsArray` is an array of bytes. Each byte represents a pixel. If its value is 255 then a point is plotted. If it's not 255, the point is unplotted. (This is intended to be easy to generate from some other bitmap pixel source).

To use this, you will first need to set graphics mode for each text row by writing a graphic spacing attribute, for example by using `writeByte()` and  `Attributes.charfromGraphicColour(colour)`.

## Remote-control like functions

### toggleReveal()

Toggles reveal on or off to show or hide concealed characters. The initial state is to conceal, and the reveal state is reset to concealed on API calls which update the page, set the character set (when `withUpdate` is true) or set the level.  See also the `ttx.reveal` event.

### toggleMixMode()

Toggle mixed display mode on or off.  See also the `ttx.mix` event.

### toggleBoxMode()

Toggles boxed display mode on or off. See also the `ttx.subtitlemode` event.

## Screen methods

### clearScreen(withUpdate)

Clears the screen.  `withUpdate` is an optional boolean, default is `true`. When `true`, the page is cleared immediately.  When `false` the page model is cleared but the display is not updated.  In that case, the screen is cleared the next time you call a function which updates the display, such as `setPageRows`.

### updateDisplay()

Force an update of the display. This is useful in certain cases where the page model has been updated and the display is not automatically updated, for example with `plot()`.


### showTestPage(pageName)

4 test pages are built-in. This displays a test page. Without the pageName, this rotates through the pages every time this is called.

If supplied, the given pageName is displayed. Available pages are: SPLASH, ENGINEERING, ADVERT, UK.

The test pages were kindly supplied by https://archive.teletextarchaeologist.org/

### toggleGrid()

Show or a hide a grid. The grid shows the rows and cells.

### showRandomisedPage()

Randomises the display data. This doesn't have a practical use but emulates a dodgy TV signal and creates a nice mash of display attributes.

## Enhancements

_Enhancements_ refers to drawing characters on top of the base page, which allows for diacritics, more character sets with a bigger graphic repertoire, and to fill in the gaps on the base page caused by spacing attributes.

### enhance()

Returns an `enhancement` instance.  This is used to overwrite characters on top of the base page. It can be used to write diactitics on G0 characters, and also gives access to characters from the G2 and G3 character sets.  Enhancements aren't displayed at Level 0 or Level 1; you need to call `setLevel()` with `Level[1.5]` or `Level[2.5]`.  The enhancement instance provides the methods below to write the enhancements. The enhancements are cleared with a call to `setPageRows()`, `setPageFromOutputLines()`, `loadPageFromEncodedString()`, `clearScreen()` or `showTestPage()`.

The *position* is a bit like a cursor and analogous to the Active Position in the teletext spec. Call `pos()` to update it, and subsequent calls apply to that position.  Characters are not displayed until `end()` is called on the enhancement instance.  The methods can be chained together, for example `enhance().pos(2, 5).putG0('e', 2).end()` .

The methods are:

### pos(col, row)

Updates the *position* to the `col` and `row`.  The *position* is only updated when this function is called.  The initial position is 0, 0, which is the top left.

### putG0(char, diacriticCode)

Requires level 1.5 or 2.5.  Writes a character from the primary G0 set at the *position*. If the primary G0 set is one of the Latin-based national options, g0_latin is used as the set. The secondary G0 set is not used.

`char` is a character with a code between 0x20 and 0x7f.

`diacriticCode` is optional, and is a number between 0 and 15.  If it's not provided or if its value is 0, the char is written without a diacritic.  Values 1 to 15 correspond to the diacritics in column 4 of the g2_latin set, which are: 

| `diacriticCode` | diacritic |
|-----------------|-----------|
| 1               | ◌&#x300;  |
| 2               | ◌&#x301;  |
| 3               | ◌&#x302;  |
| 4               | ◌&#x303;  |
| 5               | ◌&#x304;  |
| 6               | ◌&#x306;  |
| 7               | ◌&#x307;  |
| 8               | ◌&#x308;  |
| 9               | ◌&#x323;  |
| 10              | ◌&#x30a;  |
| 11              | ◌&#x327;  |
| 12              | ◌&#x332;  |
| 13              | ◌&#x30b;  |
| 14              | ◌&#x328;  |
| 15              | ◌&#x30c;  |

### putG1(char)

Requires level 2.5. Writes a block mosaic character from the G1 set at the *position*. The mosaic's contiguous or separated state from the base page is inherited.

`char` is a character with a code between 0x20 to 0x3f or 0x60 to 0x7f. Character codes 0x40 to 0x5f write a character from the g0 set.

### putG2(char)

Requires level 1.5 or 2.5.  Writes a character from the current G2 set at the *position*.

`char` is a character with a code between 0x20 and 0x7f.

### putG3(char)

Requires level 1.5 or 2.5.  Writes a smooth mosaic or line drawing character from the G3 set at the *position*.  Level 1.5 supports 4 characters. Level 2.5 supports the entire set.

`char` is a character with a code between 0x20 and 0x7d.  At level 1.5, only characters 51, 5b, 5c and 5d are displayed.

Character 5f isn't supported, which is intended to show the level 2.5 row background colour in the teletext spec.

The G3 characters are written using the codepoints defined by Unicode for Symbols for Legacy Computing.  You can use the Unscii font to display these correctly. Put Unscii in a `fonts` subdirectory relative to the page containing the teletext display div.  Unscii is available with `npm install @techandsoftware/teletext-fonts` or downloadable from http://viznut.fi/unscii/ .

### putAt()

Requires level 1.5 or 2.5. Writes a `@` character at the *position*.  This is needed because `@` is missing from most G0 and G2 sets, and the teletext spec has special provision for it.

### end()

Finish adding enhancements, and the display is updated.

## Display and rendering

### setAspectRatio(value)

`value` is a number or the string `natural`.

Set the aspect ratio of the display.  The page height is kept and the width adjusted. The display's default aspect ratio is 1.2 to match typical teletext displays. The special value of `natural` removes pixel distortion - so the pixels are square - but the page looks squashed.

### setHeight(heightInPixels)

Sets the screen height to the number of pixels you passed in. The aspect ratio is maintained. You could set the screen to fill the available window height using `document.documentElement.clientHeight` as the value. If you use CSS for layout you probably don't need to use this, and instead use the CSS to scale the page.

### setFont(font)

Sets the text font. `font` is a string, which can be a string corresponding to a CSS [font family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family) or a couple of special values.

Special values are:
* `native` - uses the native font specific to your operating system. The actual font used depends on your system. Sourced from [bootstrap 4's native font stack](https://getbootstrap.com/docs/4.1/content/reboot/#native-font-stack).
* `default` - uses the generic font family sans-serif 

Bedstead and Unscii are retro fonts you might want to use in your app if that's the look you want.  You can get them with `npm install @techandsoftware/teletext-fonts` . For Bedstead and Unscii to work correctly, you need to put them in a `fonts` subdirectory relative to the page containing the teletext display div
* `Bedstead` - a font emulating the mode 7 character generator on a BBC Micro, by bjh21.
* `Unscii` - a blocky retro-computing font by Viznut.

Normal values for `font` include `serif`, `sans-serif`, `monospace` and specific font family names of the sort you'd use in a CSS stylesheet, which might be browser- or OS-specific. Your containing HTML page can supply its own font family (using Google Fonts, for example) and then refer to it here. Even though the teletext layout is grid-based, you can use a proportional font and the grid is maintained.

If `g0_arabic` was set as the character set, the characters are rendered differently so that they're cursive. Whether this works correctly depends on your font.

### setView(view)

`view` is a string with one of these values:
* `classic__font-for-mosaic` - render mosaic graphics using a font
* `classic__graphic-for-mosaic` - render mosaic graphics using SVG shapes.  This is the default view.

When using `classic__font-for-mosaic`, the contiguous mosaic characters use codepoints defined in Unicode [Symbols for Legacy Computing](https://en.wikipedia.org/wiki/Symbols_for_Legacy_Computing). The separated mosaic characters use private use codepoints because the separated mosaics are missing from Unicode's legacy computing block.  The mosaic characters use the Unscii font. For this to work, you need to supply Unscii in a `fonts` subdirectory relative to the page containing the teletext display div.  Unscii is available with `npm install @techandsoftware/teletext-fonts` or downloadable from http://viznut.fi/unscii/ .

Using the font will result in a smaller SVG.  If you export the SVG from the DOM then you will need to ensure the Unscii font is available so that the SVG can be viewed properly in isolation. Because of issues with getting the edges of the mosaics to join up without gaps, the font size is slightly bigger than it should be. Using SVG graphics for the mosaics is more portable, and the mosaics are more precisely positioned.

## Misc APIs

### registerViewPlugin(plugin)

Pass in a plugin class. The plugin can hook in and override parts of the page rendering using a plugin interface.

### getBytes()

Gets the raw bytes used in the page model. The response is a `Uint8Array` with 1000 elements. As each teletext byte is 7-bit, the element values will be between 0 and 127 inclusive.

### getScreenImage()

Gets a static image of the screen. This returns SVG markup.
