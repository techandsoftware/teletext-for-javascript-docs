# Attributes

Control code characters set display attributes which control the text colour, double height, flashing etc. The default attributes at the beginning of a row are white text on a black background, single height, not flashing, not boxed, not concealed, no held mosaic. Graphics, when activated, default to contiguous. When an attribute is set it stays activated until the end of the row (generally). An attribute takes up a space unless hold mosaics is active, in which case the held mosaic is used.

To help with the codes, the `Attributes` and `Colour` objects can be used when composing strings for `setPageRows()` and `setRow()`.

```javascript
import { Attributes, Colour } from '@techandsoftware/teletext';
```

## Attributes.charFromTextColour(colour)

Sets text mode for the specified colour. Characters following this are mapped according to the G0 character set.  See below for the colours.

## Attributes.charfromGraphicColour(colour)

Sets graphic mode for the specified colour. Characters following this draw block mosaics from the G1 character set if the character code is 20 to 3f or 60 to 7f; characters 40 to 5f show the character from the G0 set with the same character code.

`colour` is one of these:

* Colour.RED 
* Colour.GREEN
* Colour.YELLOW
* Colour.BLUE
* Colour.MAGENTA
* Colour.CYAN
* Colour.WHITE
* Colour.BLACK - black was added in level 2.5, but is included here at level 1.5 and ignored at level 1

## Attributes.charFromAttribute(attribute)

Gets the code for an attribute. `attribute` is one of these:

| Attribute                     | Use                                |
|-------------------------------|------------------------------------|
| Attributes.NEW_BACKGROUND     | set the background colour to the current foreground colour |
| Attributes.BLACK_BACKGROUND   | set the background colour to black |
| Attributes.CONTIGUOUS_GRAPHICS | set the mosaic graphics to contiguous blocks |
| Attributes.SEPARATED_GRAPHICS  | set the mosaic graphics to separated blocks |
| Attributes.FLASH              | activate flashing for text/mosaic |
| Attributes.STEADY             | deactivate flashing for text/mosaic |
| Attributes.NORMAL_SIZE        | set text/mosaic to normal height |
| Attributes.DOUBLE_HEIGHT      | set text/mosaic to double height. The row below will be hidden. Background colours on this row will be extended to the row below. Single height characters on the top row stay single height but their background colour is still extended to the lower row |
| Attributes.DOUBLE_WIDTH       | set text/mosaic to double width. Double width characters use two cells, and the character in the next cell is hidden. Requires Level 2.5 to be set |
| Attributes.DOUBLE_SIZE        | set text/mosaic to double size. Double size characters use four cells. The row below is hidden as per double height, and the character in the cell after a double size character is hidden as per double width. Requires Level 2.5 to be set |
| Attributes.CONCEAL            | text/mosaic characters show as spaces until reveal is pressed. For use with `toggleReveal()` / `ttx.reveal`. The concealed atttribute is active until the next colour attribute (or the end of the row) |
| Attributes.HOLD_MOSAICS       | stores the last mosaic character seen on a row (going left to right) so that on the next spacing attribute the held mosaic is used instead of a space. A practical use is in a row of graphics, so that the colour could be changed without a space, with the space being filled in with the mosaic before the colour change. The held mosaic is reset to a space with a change of size or text/graphics mode |
| Attributes.RELEASE_MOSAICS    | cancels held mosaic mode, so that attributes will show a space and not the held mosaic. The held mosaic isn't reset to a space |
| Attributes.START_BOX          | starts boxed characters (used for subtitles, newsflash). Two adjacent start box characters need to be used, with the box starting between the two. For use with `toggleBoxMode()` |
| Attributes.END_BOX            | ends boxed characters. Two adjacent end box characters need to be used, with the box ending between the two. |
| Attributes.ESC                | switch between the default G0 character set and the second G0 character set.  This requires the second G0 character set to have been set with `setSecondG0Charset`.  If this hasn't been set, the attribute has no effect |

As an example, to set red text on a yellow background, you will need:

```javascript
teletext.setPageRow(0, Attributes.charFromTextColour(Colour.YELLOW) +
    Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) +
    Attributes.charFromTextColour(Colour.RED) + "Red on yellow");
```

The attributes take up 3 spaces before the text.

If you prefer to use the control codes directly, check the source of Attributes.js or the teletext spec to get the control code values. Double height, for instance, is code 13 (or d in hexadecimal), so you could use strings like `"\x0d"`, `"\u{d}"`, `String.fromCharCode(13)`.
