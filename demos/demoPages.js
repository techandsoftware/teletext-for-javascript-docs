import { Attributes, Colour } from '@techandsoftware/teletext';

// this is raw page data used with loadPageFromEncodedString()
// it was prepared with https://edit.tf
export const WIKIFAX = 'QIECBAgQV9OvTmw-EDFgwQIKmjry5oIPDkgZMkDFwwYOmDAugQNEDRogaIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIAh0uqYOmDrRowJGjxg80ZNGDIHqaMqDNyy5UCBAgQIECBAgCHS6DSh0odWpSwat0HfU61atYfLux-cezfwy5NOFAgQIECAovXr1q9avWrV65cuXrFq5atWr169evXr169evXr169evXr0CBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgDRuW_ag6b8mHyn5oM2XD068suRBh5dNOPZlQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIAcXDy6aA-nmg6aMqDpo08siDhsw7svRBm5b9qDpoyoOfXcgQYd2RB00ZUG_ds8oMPPpy37t-3Tjw7EG_Fqy4-iDXu399yBB03oNGHli39eSDZpzZVyCT0QaeaDpoyoMmXdzy8-iBAgQIEHDZh3ZeiDTuQdNGVBz37MPJBz88-mXagw7siDbv59ECBAgQbcPPnp7ZUG_Mg6aMqDNv68kHLfj1-UHDZh3ZenNcgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIEEHFv69EDJylQb8yCLh5dNCfmg59eWbDjyoNPNBsw7sixAgQd9PTQg6aMqDll24dO7Jl5IMe_tl5ZciDTuQd8PTLyQYd2RBt649CDfmQRcPLpoT80HDfsw8kHLLn0793NBj39svLLkQIEGncg048q5AgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBBFw8umhBm38tuXIg39svJA0XNUGLTs2ad-5B5y4eXNAgQIEGHPvXIK-npo07kHTRlQZtPLn0QYtOzZp37kHnLh5c1iBAgQbNObKgw8OGXDyy5EGncg6aMqDfjy4d3NBh3ZEGLLnw7kCBB03oMObNlx9EEXDy6aE_NBh6bd_Phoy8sqDDuyIECBAgQIEHPryzYceVcgQIEAIxM048u7nlQU6ESwghw1sKytpwVrNcwQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA';

// attributes are written with helper functions here, but could use the raw attribute character codes
export const PAGE_LEVEL_1 = [
    'This is teletext level 1.5  ETSI 300 706',
    Attributes.charFromTextColour(Colour.YELLOW) + '   40 columns' + Attributes.charFromTextColour(Colour.WHITE) + '\u{7f}' + Attributes.charFromTextColour(Colour.YELLOW) + '25 rows' + Attributes.charFromTextColour(Colour.WHITE) + '\u{7f}' + Attributes.charFromTextColour(Colour.YELLOW) + '8 colours',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + ' ' +
    Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromTextColour(Colour.BLUE) + '    96',
    'abcdefghijklmnopqrstuvwxyz' + ' ' +
    Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromTextColour(Colour.BLUE) + 'characters',
    '0123456789012345678901234567890123456789',
    ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~\u007f',
    '````````````````````````````````````````',
    'This is' + Attributes.charFromTextColour(Colour.WHITE) + 'white text!  ' + Attributes.charFromTextColour(Colour.YELLOW) + 'yellow text!',
    '     ' + Attributes.charFromAttribute(Attributes.START_BOX) + Attributes.charFromAttribute(Attributes.START_BOX) + Attributes.charFromTextColour(Colour.CYAN) + 'cyan text!   ' + Attributes.charFromTextColour(Colour.GREEN) + 'green text!' + Attributes.charFromAttribute(Attributes.END_BOX),
    '      ' + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromTextColour(Colour.MAGENTA) + 'magenta text!' + Attributes.charFromTextColour(Colour.RED) + 'red text!   ' + Attributes.charFromAttribute(Attributes.BLACK_BACKGROUND),
    '      ' + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromTextColour(Colour.BLUE) + 'blue text!  ' + Attributes.charFromTextColour(Colour.WHITE) + Attributes.charFromTextColour(Colour.BLACK) + 'black text! ' + Attributes.charFromAttribute(Attributes.BLACK_BACKGROUND),
    Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + '   ' +
    Attributes.charFromTextColour(Colour.YELLOW) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + '   ' +
    Attributes.charFromTextColour(Colour.CYAN) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + '   ' +
    Attributes.charFromTextColour(Colour.GREEN) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + '   ' +
    Attributes.charFromTextColour(Colour.MAGENTA) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + '   ' +
    Attributes.charFromTextColour(Colour.RED) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + '   ' +
    Attributes.charFromTextColour(Colour.BLUE) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + '   ' +
    Attributes.charFromTextColour(Colour.BLACK) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + '   ',
    Attributes.charFromGraphicColour(Colour.WHITE) + '    !"#$%&\'()*+,-./' + Attributes.charFromTextColour(Colour.WHITE) + "  64 graphic",
    Attributes.charFromTextColour(Colour.RED) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromGraphicColour(Colour.WHITE) + ' 0123456789:;<=>?' + Attributes.charFromTextColour(Colour.WHITE) + '  characters',
    Attributes.charFromGraphicColour(Colour.WHITE) + '   `abcdefghijklmno',
    Attributes.charFromGraphicColour(Colour.WHITE) + ' ' + Attributes.charFromAttribute(Attributes.START_BOX) + Attributes.charFromAttribute(Attributes.START_BOX) + 'pqrstuvwxyz{|}~\u007f' + Attributes.charFromTextColour(Colour.WHITE) + Attributes.charFromAttribute(Attributes.CONCEAL) + ' Concealed',
    Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) + Attributes.charFromGraphicColour(Colour.WHITE) + '   !"#$%&\'()*+,-./' + Attributes.charFromTextColour(Colour.WHITE) + Attributes.charFromAttribute(Attributes.FLASH) + ' Flashing!' + Attributes.charFromAttribute(Attributes.STEADY) + '[',
    Attributes.charFromTextColour(Colour.RED) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) + Attributes.charFromGraphicColour(Colour.WHITE) + '0123456789:;<=>?' + Attributes.charFromTextColour(Colour.WHITE) + Attributes.charFromAttribute(Attributes.CONCEAL) + '(")>' + Attributes.charFromAttribute(Attributes.FLASH) + 'Both',
    Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) + Attributes.charFromGraphicColour(Colour.WHITE) + '  `abcdefghijklmno',
    Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) + Attributes.charFromGraphicColour(Colour.WHITE) + '  pqrstuvwxyz{|}~\u007f',
    Attributes.charFromTextColour(Colour.BLUE) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromTextColour(Colour.WHITE) + 'Normal' + Attributes.charFromAttribute(Attributes.DOUBLE_HEIGHT) + 'Double height gjpqy' + Attributes.charFromGraphicColour(Colour.WHITE) + '\u0024\u007b' + Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) + '\u0024\u007b' + Attributes.charFromAttribute(Attributes.NORMAL_SIZE) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromTextColour(Colour.BLUE) + '\u{7f}\u{7f}',
    'This text should not be visible', // the row below a row containing double height is hidden

    "Hold " +                                                        // character displayed is:
    Attributes.charFromAttribute(Attributes.HOLD_MOSAICS) +        // space
    Attributes.charFromGraphicColour(Colour.GREEN) +               // space
    '9' +                                                          // contiguous mosaic
    Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) +  // held contiguous mosaic from character before
    '9' +                                                          // separated mosaic
    Attributes.charFromAttribute(Attributes.CONTIGUOUS_GRAPHICS) + // held separated mosaic
    '99' +                                                          // contiguous mosaic
    ' ' +                                                          // space
    Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) +  // space
    '9' +                                                          // separated mosaic
    Attributes.charFromAttribute(Attributes.CONTIGUOUS_GRAPHICS) + // held separated mosaic
    '9' +                                                          // contiguous mosaic
    Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) +  // held contiguous mosaic
    '99' +                                                          // separated mosaic
    ' ' +                                                          // space
    Attributes.charFromGraphicColour(Colour.WHITE) +               // (held) space
    '9' +                                                          // separated mosaic        white
    Attributes.charFromGraphicColour(Colour.YELLOW) +              // held separated mosaic   white
    Attributes.charFromGraphicColour(Colour.CYAN) +                // held separated mosaic   yellow
    Attributes.charFromGraphicColour(Colour.GREEN) +               // held separated mosaic   cyan
    Attributes.charFromGraphicColour(Colour.MAGENTA) +             // held separated mosaic   green
    Attributes.charFromGraphicColour(Colour.RED) +                 // held separated mosaic   magenta
    Attributes.charFromGraphicColour(Colour.BLUE) +                // held separated mosaic   red
    Attributes.charFromAttribute(Attributes.CONTIGUOUS_GRAPHICS) + // held separated mosaic   blue
    '9' +                                                          // contiguous mosaic       blue
    Attributes.charFromGraphicColour(Colour.RED) +                 // held contiguous mosaic  blue
    Attributes.charFromGraphicColour(Colour.MAGENTA) +             // held contiguous mosaic  red
    Attributes.charFromGraphicColour(Colour.GREEN) +               // held contiguous mosaic  magenta
    Attributes.charFromGraphicColour(Colour.CYAN) +                // held contiguous mosaic  green
    Attributes.charFromGraphicColour(Colour.YELLOW) +              // held contiguous mosaic  cyan
    Attributes.charFromGraphicColour(Colour.WHITE) +               // held contiguous mosaic  yellow
    '99',
    "mosaics" + Attributes.charFromTextColour(Colour.BLUE) + "^ ^     ^ ^     ^^^^^^^ ^^^^^^"
];

// page from Teefax created by Peter Kwan
// array of Output Line strings used with setPageFromOutputLines()
export const PAGE_OUTPUT_LINES = [
    "OL,0,XXXXXXXXTEEFAX mpp DAY dd MTH C hh:nn.ss",
    "OL,1,Q pppRpppTpppR||,,,<,,<,,<,,|,,,|,l<,|||",
    "OL,2,Q 5|jR5|jT5|jR]Q//jsjsjshs4ouz?   ",
    "OL,3,Q 5/jR5/jT5/jR]Q  jpjpj j 55j   ",
    "OL,4,Q ###R###T###R##########################",
    "OL,5,CNews                                   ",
    "OL,6,AM TEEFAX: QUALITY TELETEXT SINCE 2015  ",
    "OL,8,F```````````````````````````````````````",
    "OL,9,BWHAT'S NEW....G101FBAMBOOZLE.......G150",
    "OL,10,BTV LISTINGS...G620FVIEWERS' PAGES..G200",
    "OL,11,BBBC NEWS......G104FREVIEWS.........G400",
    "OL,12,BUK WEATHER....G401FMr Biffo........G570",
    "OL,13,BLA ON THE QT..G160FUKEFAX..........G600",
    "OL,15,AARTS & ENT....G500CTTXT REPLICAS...G670",
    "OL,16,ACarlos' Art...G501CENGINEERING INFOG700",
    "OL,17,ADan's Art.....G510CRASPBERRY Pi....G785",
    "OL,18,ASteve Horsley G520CTESTCARDS INDEX G790",
    "OL,19,ACY2...........G530CTELETEXT EVENTS G800",
    "OL,20,AChris TsangariG540CBlock Party 2021G810",
    "OL,21,ARaquel Meyers G555CDigitiser.......G470",
    "OL,23,V]!D!DIGITISER! Mr.Biffo!  Pages 571-574",
    "OL,24,A About BBamboozle CEvents FArt Archive"
];

// array of strings is used with setPageRows()
export const PAGE_WITH_DOUBLE_WIDTH_AND_HEIGHT = [
    Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + 'D o u b l e   w i d t h',
    Attributes.charFromGraphicColour(Colour.WHITE) + Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + 'g r a p h i c s' + Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) + '  s e p a r a t e d',
    Attributes.charFromTextColour(Colour.GREEN) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromGraphicColour(Colour.WHITE) + Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + 'g r a p h i c s' + Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) + '  s e p a r a t e d',
    '0123456789012345678901234567890123456789',
    ' ' + Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + 'D' +
    Attributes.charFromTextColour(Colour.BLUE) + 'o' +
    Attributes.charFromTextColour(Colour.RED) + 'u' +
    Attributes.charFromTextColour(Colour.MAGENTA) + 'b' +
    Attributes.charFromTextColour(Colour.GREEN) + 'l' +
    Attributes.charFromTextColour(Colour.YELLOW) + 'e' +
    Attributes.charFromTextColour(Colour.YELLOW) + ' ' +
    Attributes.charFromTextColour(Colour.CYAN) + 'w' +
    Attributes.charFromTextColour(Colour.YELLOW) + 'i' +
    Attributes.charFromTextColour(Colour.GREEN) + 'd' +
    Attributes.charFromTextColour(Colour.MAGENTA) + 't' +
    Attributes.charFromTextColour(Colour.RED) + 'h',
    '01234567890123456789',
    Attributes.charFromTextColour(Colour.RED) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromTextColour(Colour.YELLOW) + Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + 'R e d' + Attributes.charFromAttribute(Attributes.BLACK_BACKGROUND) + 'Bhaicdkdgerno u n d',
    Attributes.charFromAttribute(Attributes.START_BOX) + Attributes.charFromAttribute(Attributes.START_BOX) + Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + 'B o x e d' + Attributes.charFromAttribute(Attributes.END_BOX) + Attributes.charFromAttribute(Attributes.END_BOX) + ' U n b o x e d',
    Attributes.charFromTextColour(Colour.RED) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromTextColour(Colour.YELLOW) + Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + '2 * w' + Attributes.charFromAttribute(Attributes.NORMAL_SIZE) + 'Normal' + Attributes.charFromAttribute(Attributes.DOUBLE_HEIGHT) + '2 * h',
    'row hidden',
    Attributes.charFromAttribute(Attributes.START_BOX) + Attributes.charFromAttribute(Attributes.START_BOX) + 'Boxed' + Attributes.charFromTextColour(Colour.RED) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromTextColour(Colour.YELLOW) + Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + '2 * w' + Attributes.charFromAttribute(Attributes.NORMAL_SIZE) + 'Normal' + Attributes.charFromAttribute(Attributes.DOUBLE_HEIGHT) + '2 * h',
    'row hidden',
    Attributes.charFromAttribute(Attributes.DOUBLE_SIZE) + 'D o u b l e ' +
    Attributes.charFromTextColour(Colour.RED) + ' s i z e' +
    Attributes.charFromAttribute(Attributes.DOUBLE_HEIGHT) + 'height' +
    Attributes.charFromAttribute(Attributes.NORMAL_SIZE) + 'normal',
    'row hidden',
    Attributes.charFromTextColour(Colour.MAGENTA) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromTextColour(Colour.WHITE) + Attributes.charFromAttribute(Attributes.DOUBLE_SIZE) + 'D o u b l e ' +
    Attributes.charFromTextColour(Colour.YELLOW) + ' s i z e' +
    Attributes.charFromAttribute(Attributes.DOUBLE_HEIGHT) + 'height' +
    Attributes.charFromAttribute(Attributes.NORMAL_SIZE) + 'normal',
    'row hidden',
    Attributes.charFromTextColour(Colour.GREEN) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromGraphicColour(Colour.BLUE) + Attributes.charFromAttribute(Attributes.DOUBLE_SIZE) + 'g r a p h i c s' + Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) + '  s e p a r a t e d',
    'row hidden',
    Attributes.charFromAttribute(Attributes.START_BOX) + Attributes.charFromAttribute(Attributes.START_BOX) + Attributes.charFromAttribute(Attributes.DOUBLE_SIZE) + 'B o x e d' + Attributes.charFromAttribute(Attributes.END_BOX) + Attributes.charFromAttribute(Attributes.END_BOX) + ' U n b o x e d',
];
