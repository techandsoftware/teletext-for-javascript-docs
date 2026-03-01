import { Attributes, Colour } from '@techandsoftware/teletext';

// this is raw page data used with loadPageFromEncodedString()
// it was prepared with https://edit.tf
const WIKIFAX = 'QIECBAgQV9OvTmw-EDFgwQIKmjry5oIPDkgZMkDFwwYOmDAugQNEDRogaIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIAh0uqYOmDrRowJGjxg80ZNGDIHqaMqDNyy5UCBAgQIECBAgCHS6DSh0odWpSwat0HfU61atYfLux-cezfwy5NOFAgQIECAovXr1q9avWrV65cuXrFq5atWr169evXr169evXr169evXr0CBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgDRuW_ag6b8mHyn5oM2XD068suRBh5dNOPZlQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIAcXDy6aA-nmg6aMqDpo08siDhsw7svRBm5b9qDpoyoOfXcgQYd2RB00ZUG_ds8oMPPpy37t-3Tjw7EG_Fqy4-iDXu399yBB03oNGHli39eSDZpzZVyCT0QaeaDpoyoMmXdzy8-iBAgQIEHDZh3ZeiDTuQdNGVBz37MPJBz88-mXagw7siDbv59ECBAgQbcPPnp7ZUG_Mg6aMqDNv68kHLfj1-UHDZh3ZenNcgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIEEHFv69EDJylQb8yCLh5dNCfmg59eWbDjyoNPNBsw7sixAgQd9PTQg6aMqDll24dO7Jl5IMe_tl5ZciDTuQd8PTLyQYd2RBt649CDfmQRcPLpoT80HDfsw8kHLLn0793NBj39svLLkQIEGncg048q5AgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBBFw8umhBm38tuXIg39svJA0XNUGLTs2ad-5B5y4eXNAgQIEGHPvXIK-npo07kHTRlQZtPLn0QYtOzZp37kHnLh5c1iBAgQbNObKgw8OGXDyy5EGncg6aMqDfjy4d3NBh3ZEGLLnw7kCBB03oMObNlx9EEXDy6aE_NBh6bd_Phoy8sqDDuyIECBAgQIEHPryzYceVcgQIEAIxM048u7nlQU6ESwghw1sKytpwVrNcwQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA';

const PAGE_LEVEL_1 = [
    'This is teletext level 1.5  ETSI 300 706',
    '',
    '    40 columns \u{7f} 25 rows \u{7f} 8 colours',
    '',
    Attributes.charFromTextColour(Colour.YELLOW) + 'Foreground colours',
    '',
    'TODO'
];

// array of strings is used with loadPageRows()
const PAGE_WITH_DOUBLE_WIDTH_AND_HEIGHT = [
    Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + 'D o u b l e   w i d t h',
    Attributes.charFromGraphicColour(Colour.WHITE) + Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + 'g r a p h i c s' + Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) + '  s e p a r a t e d',
    Attributes.charFromTextColour(Colour.GREEN) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromGraphicColour(Colour.WHITE) + Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + 'g r a p h i c s' + Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) + '  s e p a r a t e d',
    '0123456789012345678901234567890123456789',
    ' ' + Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + 'D' +
        Attributes.charFromTextColour(Colour.BLUE) +'o' +
        Attributes.charFromTextColour(Colour.RED) +'u' +
        Attributes.charFromTextColour(Colour.MAGENTA) +'b' +
        Attributes.charFromTextColour(Colour.GREEN) +'l' +
        Attributes.charFromTextColour(Colour.YELLOW) +'e' +
        Attributes.charFromTextColour(Colour.YELLOW) +' ' +
        Attributes.charFromTextColour(Colour.CYAN) +'w' +
        Attributes.charFromTextColour(Colour.YELLOW) +'i' +
        Attributes.charFromTextColour(Colour.GREEN) +'d' +
        Attributes.charFromTextColour(Colour.MAGENTA) +'t' +
        Attributes.charFromTextColour(Colour.RED) +'h',
    '01234567890123456789',
    Attributes.charFromTextColour(Colour.RED) + Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) + Attributes.charFromTextColour(Colour.YELLOW) + Attributes.charFromAttribute(Attributes.DOUBLE_WIDTH) + 'R e d' + Attributes.charFromAttribute(Attributes.BLACK_BACKGROUND) + 'B a c k g r o u n d',
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

export { WIKIFAX, PAGE_LEVEL_1, PAGE_WITH_DOUBLE_WIDTH_AND_HEIGHT};
