# Character sets

At level 1, there are two character sets on a page: G0 and G1. Level 1.5 adds G2. Level 2.5 adds G3.

| Set          | Name                           | Base page | Enhancement L1.5 | Enhancement L2.5 |
| ------------ |--------------------------------|-----------|------------------|------------------|
| G0           | Alphanumeric                   | ✅        | ✅               | ✅               |
| G0 secondary | Alphanumeric                   | ✅        |                  |                  |
| G1           | Block mosaic                   | ✅        |                  | ✅               |
| G2           | Supplementary                  |           | ✅               | ✅               |
| G3           | Smooth Mosaic and Line Drawing |           |                  | ✅               |

Each set is 7 bit, with up to 96 characters with codes 0x20 to 0x7f.  A description of each set follows, where the _base page_ refers to the normal grid of 40 x 25 characters, and _enhancements_ refer to writing characters at specific rows and columns on top of the base page using the API. In this package, enhancements can be written at all levels, but are only displayed at level 1.5 and above.

## G0 "Alphanumeric sets"

- Used on base page for the text
- 20 character sets available. See the API docs below for the list.  None of these are ASCII, but `g0_latin` is close.
- At level 1, primary and secondary G0 set can be selected and used simultaneously
- At level 1.5,
  - can be placed using enhancements
  - diacritics can be placed atop G0 characters as enhancements, from 15 available diacritical marks

To use: See the APIs to write [rows](/teletext-screen-api#write-rows-to-the-base-page) and [bytes](/teletext-screen-api#write-bytes-to-the-base-page) to the base page. [`enhance().putG0()`](/teletext-screen-api#putg0-char-diacriticcode) writes enhancements with or without diacritics. On the base page and enhancements, [`setDefaultG0Charset()`](/teletext-screen-api#setdefaultg0charset-charset-withupdate) sets the G0 set. On the base page only, [`setSecondG0Charset()`](/teletext-screen-api#setsecondg0charset-charset-withupdate) can be used with `Attributes.ESC` to switch between the default and secondary set.

## G1 "Block Mosaic set"

- Used on base page for block mosaic graphics. (Unicode refers to these as sextants.)
- Mosaic characters are at codes 0x20 to 0x3f and 0x60 to 0x7f. Characters 0x40 to 0x5f in G1 instead show the corresponding characters in the base page G0 set that's currently selected
- The block mosaics have two types of glyphs, contiguous or separated, defaulting to contiguous
- At level 2.5, can be placed using enhancements

To use: Use attributes to switch from G0 to G1, e.g. include [`Attributes.charFromGraphicColour(Colour.RED)`](/teletext-attributes#attributes-charfromgraphiccolour-colour) in the string passed to APIs to write [rows](/teletext-screen-api#write-rows-to-the-base-page) or [bytes](/teletext-screen-api#write-bytes-to-the-base-page) to the base page. Use `Attributes.CONTIGUOUS_GRAPHICS` or `Attributes.SEPARATED_GRAPHICS` with [`Attributes.charFromAttribute()`](/teletext-attributes#attributes-charfromattribute-attribute), or the underlying control characters, to control the rendering mode. [`enhance().putG1()`](/teletext-screen-api#putg1-char) writes enhancements.

## G2 "Supplementary Sets"

- At level 1.5 or 2.5, placed using enhancements. Not available for use on the base page.
- 4 sets available

To use: [`enhance().putG2()`](/teletext-screen-api#putg2-char) writes enhancements. [`setDefaultG0Charset()`](/teletext-screen-api#setdefaultg0charset-charset-withupdate) sets the G2 set corresponding with the selected G0 set. [`setG2Charset()`](/teletext-screen-api#setg2charset-charset-withupdate) sets the G2 set independently of the G0 set.

## G3 "Smooth Mosaics and Line Drawing Set"

- At level 1.5,
  - placed using enhancements. Not available for use on the base page.
  - four characters are placeable
- At level 2.5, entire set is placeable using enhancements

To use: [`enhance().putG3()`](/teletext-screen-api#putg3-char) writes enhancements.

## Additional notes

The `@` character is missing from most G0 and G2 sets. At level 1.5 and 2.5, it can be placed as an enhancement. Use: [`enhance().putAt()`](/teletext-screen-api#putat)

The teletext spec also mentions that G2 is not defined at level 1.5, and it's up to a local code of practice to define G2 based on the country's requirements. As the spec doesn't include any of these localised G2 sets, they're not included here. If you happen to know the source of these localised G2 sets, please contact me.
