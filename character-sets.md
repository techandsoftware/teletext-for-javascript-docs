# Character sets

At level 1, there are two character sets on a page: G0 and G1.  From level 1.5, two more are available: G2 and G3. Each set is 7 bit, with up to 96 characters with codes 0x20 to 0x7f.  A description of each set follows, where the _base page_ refers to the normal grid of 40 x 25 characters, and _enhancements_ refer to writing characters at specific rows and columns on top of the base page using the API. In this module, enhancements can be written at all levels, but are only displayed at level 1.5 and above.

## G0

- Used on base page for the text
- 20 character sets available. See the API docs below for the list.  None of these are ASCII, but `g0_latin` is close.
- At level 1, a primary set is selectable from the available sets
- At level 1.5, primary and secondary G0 set can be selected and used simultaneously
- At level 1.5, can be placed using enhancements
- At level 1.5, diacritics can be placed atop G0 characters as enhancements, from 15 available diacritical marks
- Use: `loadPageFromEncodedString()`, `setPageRows()`, `setRow()`, `setPageFromOutputLines()`, `setRowFromOutputLine()` to write G0 characters to the base page, with attribute characters to switch between G0 and G1.  `enhance().putG0()` writes enhancements with or without diacritics.  `setDefaultG0Charset()` and `setSecondG0Charset()` select the G0 sets in use.  `Attributes.ESC` switches between the primary and secondary sets, if `setSecondG0Charset()` was called.

## G1 "Block Mosaic set"

- Used on base page for block mosaic graphics. (Unicode refers to these as sextants; Wikipedia as semigraphics)
- Mosaic characters are at codes 0x20 to 0x3f and 0x60 to 0x7f. Characters 0x40 to 0x5f in G1 instead show the corresponding characters in the G0 set that's currently selected
- At level 2.5, can be placed using enhancements
- Use: `loadPageFromEncodedString()`, `setPageRows()`, `setRow()`, `setPageFromOutputLines()`, `setRowFromOutputLine()` write G1 characters to the base page, with attribute characters to switch between G0 and G1.  `enhance().putG1()` writes enhancements.

## G2 "Supplementary Sets"

- At level 1.5, placed using enhancements. Not available for use on the base page.
- 4 sets available. See the API docs below for the list.
- Use: `enhance().putG2()` writes enhancements.  `setDefaultG0Charset()` sets the G2 set corresponding with the selected G0 set. `setG2Charset()` sets the G2 set independently of the G0 set.

## G3 "Smooth Mosaics and Line Drawing Set"

- At level 1.5, placed using enhancements. Not available for use on the base page.
  - At level 1.5, four characters are placeable
  - At level 2.5, entire set is placeable
- Use: `enhance().putG3()` writes enhancements

## Other notes

The `@` character is missing from most G0 and G2 sets. At level 1.5, it can be placed as an enhancement. Use: `enhance().putAt()`

The teletext spec also mentions that G2 is not defined at level 1.5, and it's up to a local code of practice to define G2 based on the country's requirements. As the spec doesn't include any of these localised G2 sets, they're not included here.
