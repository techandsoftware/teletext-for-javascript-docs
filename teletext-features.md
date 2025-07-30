# @techandsofware/teletext

This package renders teletext pages using vector graphics (SVG). Note that this implements the display part of teletext, not the VBI packets, and operates as a screen or a dumb terminal.  The application using this package will need to supply the page content, implement page numbers, navigation, etc.  The package provides an API to set page content and change the display characteristics such as the screen height and aspect ratio.

This supports all of level 1 and level 1.5, and a little of level 2.5.  A full list follows.  Display rendering features include changing the text font (including proportional fonts), aspect ratio and screen height. Mosaic graphics can be rendered with a font or using SVG graphics. 

Extensions are supported via plugins.

See also these modules:

* [@techandsoftware/teletext-service](https://www.npmjs.com/package/@techandsoftware/teletext-service), a higher level module with page numbers, subpage and colour button navigation.
* @techandsoftware/teletext-caster, Chromecast integration, for displaying teletext on Chromecast and compatible TVs

## Teletext features supported

[Teletext](https://en.wikipedia.org/wiki/Teletext) is a technical standard for showing pages of text and semigraphics on TV screens, devised in 1976 by the BBC and IBA. The spec for the most recent version is [ETSI EN 300 706](https://www.etsi.org/deliver/etsi_en/300700_300799/300706/01.02.01_60/en_300706v010201p.pdf). It's still used in Europe, where it's used for broadcast TV. Its a cousin of [Viewdata](https://en.wikipedia.org/wiki/Viewdata). UK broadcast subtitles still use the 7-bit character set defined by teletext despite newer systems being availble.

* **Level 1**

    * Screen size of 40 x 25 characters
    * 6 colour foreground text or mosaic characters (also called [semigraphics](https://en.wikipedia.org/wiki/Semigraphics) or [sextants](https://en.wikipedia.org/wiki/Symbols_for_Legacy_Computing))
    * 7 colour background
    * Text displayed using the G0 character sets
    * 20 G0 character sets are available, with up to 96 characters per set. Supports Latin, Greek, Cyrillic, Hebrew and Arabic scripts
    * Primary and secondary G0 sets selectable and switchable
    * Mosaics are contiguous or separated
    * Double height, flashing, concealed, boxed characters
    * Held mosaic characters, to replace the display of a spacing attributes with the last held graphic
    * Newsflash / subtitles page display mode
    * Mix display mode, which isn't part of the teletext spec but is normal on TVs
* **Level 1.5**
    * Black foreground text or mosaic (this is level 2.5 in the teletext spec but included here at 1.5 as with some TVs)
    * G2 character set selectable from 4 available sets (Latin, Greek, Cyrillic and Arabic)
    * Add enhancements to the base page at (row, col) locations:
       * Place characters from the G0 sets
       * Place diacritical marks on characters from the G0 sets
       * Place characters from the G2 sets
       * Place `@` symbol (it isn't in most G0 sets or the G2 sets)
       * 4 characters from the G3 character set placeable
* **Level 2.5**
    * Double width and double size characters
    * Add enhancements to base page at (row, col) locations:
      * Place characters from the G1 set (block mosaics)
      * Place characters from the G3 set (smooth mosaics and line drawing)

**Additional features of this module:**

* API to draw text and graphics on the screen
* Screen is rendered with SVG graphics. The SVG is exportable for display in any SVG viewer without needing Javascript, and is fully scalable to any resolution
* The API supports setting the font for text, change the height and aspect ratio, switch teletext levels, and set an on-screen grid
* Use characters or SVG shapes for rendering mosaics
* Plugin architecture. Plugins can supplement or overwrite the rendering

## Plugins

* [@techandsoftware/teletext-plugin-smooth-mosaic](https://www.npmjs.com/package/@techandsoftware/teletext-plugin-smooth-mosaic) - render smooth mosaic graphics using a pixel art scaling algorithm instead of the usual block mosaics

## Demos

For a live demo, see https://teletextmoduledemo.robdev.org.uk/

See the `demo` directory in the repo for examples of using with an ES6 module import or a UMD import.

## License

The project is licensed under GNU Affero General Public License 3 ([AGPL-3.0-only](https://www.gnu.org/licenses/agpl-3.0.en.html)). For commercial support and integration enquiries, contact <techandsoftwareltd@outlook.com>.

The fonts supplied in the `demo/fonts` directory of the repo have their own licenses. See the `*.license` files in that directory.

This package is compliant with [REUSE 3](https://reuse.software/).

## TODO

These features of [ETSI EN 300 706](https://www.etsi.org/deliver/etsi_en/300700_300799/300706/01.02.01_60/en_300706v010201p.pdf) aren't supported yet. I'm not sure how much is worth doing:

At Level 2.5 or 3.5:
* non-spacing attributes. The non-spacing attributes include underline, inverse, bold, italic, proportional text and extra flashing modes in addition to the normal level 1 attributes
* 32 colours via 4 colour tables
* colour table selection and remapping
* default screen/row colours
* side panels
* redefinable characters
* modified G0/G2 set selectable for use with enhancements

The spec also defines navigation and object pages, which I consider out of scope as they're more in the domain of the application rather than the display.

## Bugs

If you encounter any issues, contact techandsoftwareltd@outlook.com

## Credits

* Unscii font used for block graphics when `setView` or `enhance().putG3()` is called - http://viznut.fi/unscii/
* Bedstead font - http://bjh21.me.uk/bedstead/
* Native font stack adapted from Bootstrap's - https://getbootstrap.com/docs/4.5/content/reboot/#native-font-stack
* The internal API used for drawing SVG is a subset of svg.js v3 - https://svgjs.dev/docs/3.0/
* Teletext test pages from https://archive.teletextarchaeologist.org/
* The data format for stored test pages and for the `loadPageFromEncodedString` API is from Simon Rawles' teletext editor - https://edit.tf/
* The Output Line format is taken from MRG's .tti file spec - https://zxnet.co.uk/teletext/documents/ttiformat.pdf
