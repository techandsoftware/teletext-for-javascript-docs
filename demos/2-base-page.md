# Demo: The base page

Writing text and graphics on the base page, and using attributes.

<button id="revealButton">Reveal</button>

<div id="screen"></div>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { Attributes, Colour, Teletext } from '@techandsoftware/teletext';

const t = Teletext();

function demo() {
    t.addTo('#screen');
    document.querySelector('#revealButton').onclick = () => t.toggleReveal();

    const green = Attributes.charFromTextColour(Colour.GREEN);
    const white = Attributes.charFromTextColour(Colour.WHITE);

    // use setRow to draw individual rows. However, it's quite laborious
    // Use setPageRows to draw multiple rows with one method, from the top of the screen
    // Use writeByte and writeBytes to draw anywhere on the screen

    t.setRow(1, 
      Attributes.charFromAttribute(Attributes.DOUBLE_HEIGHT) + '        ' +
      Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) +
      Attributes.charFromTextColour(Colour.BLUE) +
      'Welcome to demo 2  ' +
      Attributes.charFromAttribute(Attributes.BLACK_BACKGROUND)
    );

    t.setRow(4, Attributes.charFromGraphicColour(Colour.RED) + '\x28' +
      white + 'Draw text on the screen with' + green + 'setRow');

    t.setRow(5, Attributes.charFromGraphicColour(Colour.YELLOW) + '\x28' +
      white + 'Use' + green + 'charFromTextColour' + white + 'and');

    t.setRow(6, green + '  charFromGraphicColour' + white + 'to switch');

    t.setRow(7, '   between G0 and G1 (mosaic) sets');

    t.setRow(8, Attributes.charFromGraphicColour(Colour.RED) + '\x28 ' + 
      Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) +
      white + 'Changing the fg and bg colours ');

    t.setRow(9, '  ' + Attributes.charFromGraphicColour(Colour.RED) + 
      Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) +
      white + 'uses 3 attributes');

    t.setRow(11,
      Attributes.charFromAttribute(Attributes.FLASH) + Attributes.charFromTextColour(Colour.RED) + 'This text is flashing');

    // conceal resets if colour is changed requiring it to be applied again
    t.setRow(12, Attributes.charFromAttribute(Attributes.CONCEAL) + ' This text is concealed' +
      Attributes.charFromTextColour(Colour.YELLOW) +
      Attributes.charFromAttribute(Attributes.CONCEAL) + '(")>');

    t.setRow(14, Attributes.charFromGraphicColour(Colour.YELLOW) + '\x28' +
       white + 'The next row has contiguous mosaics');

    // Using character codes directly to draw the graphics
    // These use the G1 set. They are contiguous by default
    t.setRow(15, Attributes.charFromGraphicColour(Colour.CYAN) +
      '   \x24\x31\x24\x31\x66\x66\x66\x3d\x77\x7f\x35');

    t.setRow(17, Attributes.charFromGraphicColour(Colour.RED) + '\x28' +
       white + 'The next row has separated mosaics');

    t.setRow(18, Attributes.charFromAttribute(Attributes.SEPARATED_GRAPHICS) +
      Attributes.charFromGraphicColour(Colour.CYAN) +
        '  \x24\x31\x24\x31\x66\x66\x66\x3d\x77\x7f\x35');

    t.setRow(20, Attributes.charFromGraphicColour(Colour.YELLOW) + '\x28' +
       white + 'Mosaics rendered with SVG graphics')
    t.setRow(21, '   by default');

    t.setRow(24, Attributes.charFromTextColour(Colour.MAGENTA) +
      Attributes.charFromAttribute(Attributes.NEW_BACKGROUND) +
      white + 'Press REVEAL to show concealed text');
}
    
onMounted(demo);
onUnmounted(() => t.destroy());
</script>