# Demo: Screen API playground

This page demoes the teletext screen APIs not already demonstrated. Use the buttons below to invoke each API. Keyboard shortcuts are in brackets.

<div class="button-row">
  <button
    v-for="btn in buttons"
    :key="btn.id"
    type="button"
    @click="trigger(btn)"
    ref="buttonEls"
  >
    {{ btn.label }} ({{ btn.key }})
  </button>
</div>

<p style="margin-top: 1rem; margin-bottom: 1rem;">{{ apiInvokedMessage }}</p>


<ClientOnly>
<div id="screen"></div>

<script setup>
import { onBeforeUnmount, ref, useTemplateRef } from 'vue';
import { runDemoInVitepress } from './runDemoCodeHelper.js';
import { Attributes, Colour, Teletext, Level } from '@techandsoftware/teletext';

const apiInvokedMessage = ref('// Use the buttons above and the invoked API will appear here');
// this is raw page data used with loadPageFromEncodedString()
const WIKIFAX = 'QIECBAgQV9OvTmw-EDFgwQIKmjry5oIPDkgZMkDFwwYOmDAugQNEDRogaIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIAh0uqYOmDrRowJGjxg80ZNGDIHqaMqDNyy5UCBAgQIECBAgCHS6DSh0odWpSwat0HfU61atYfLux-cezfwy5NOFAgQIECAovXr1q9avWrV65cuXrFq5atWr169evXr169evXr169evXr0CBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgDRuW_ag6b8mHyn5oM2XD068suRBh5dNOPZlQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIAcXDy6aA-nmg6aMqDpo08siDhsw7svRBm5b9qDpoyoOfXcgQYd2RB00ZUG_ds8oMPPpy37t-3Tjw7EG_Fqy4-iDXu399yBB03oNGHli39eSDZpzZVyCT0QaeaDpoyoMmXdzy8-iBAgQIEHDZh3ZeiDTuQdNGVBz37MPJBz88-mXagw7siDbv59ECBAgQbcPPnp7ZUG_Mg6aMqDNv68kHLfj1-UHDZh3ZenNcgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIEEHFv69EDJylQb8yCLh5dNCfmg59eWbDjyoNPNBsw7sixAgQd9PTQg6aMqDll24dO7Jl5IMe_tl5ZciDTuQd8PTLyQYd2RBt649CDfmQRcPLpoT80HDfsw8kHLLn0793NBj39svLLkQIEGncg048q5AgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBBFw8umhBm38tuXIg39svJA0XNUGLTs2ad-5B5y4eXNAgQIEGHPvXIK-npo07kHTRlQZtPLn0QYtOzZp37kHnLh5c1iBAgQbNObKgw8OGXDyy5EGncg6aMqDfjy4d3NBh3ZEGLLnw7kCBB03oMObNlx9EEXDy6aE_NBh6bd_Phoy8sqDDuyIECBAgQIEHPryzYceVcgQIEAIxM048u7nlQU6ESwghw1sKytpwVrNcwQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA';

let t; // will be initialised after onMounted

// define each button and the corresponding API action.
// reveal, mix and boxed demonstate the events API, which doesn't require access to the teletext instance
const buttons = [
  {
    id: 'revealButton',
    label: 'Toggle reveal',
    key: '?',
    invokingMsg: 'dispatching Event("ttx.reveal") // we could also use toggleReveal().  No effect if the screen doesn\'t contain concealed characters',
    run() {
      window.dispatchEvent(new Event('ttx.reveal'))
    }
  },
  {
    id: 'mixButton',
    label: 'Toggle mix mode',
    key: 'm',
    invokingMsg: 'dispatching Event("ttx.mix") // we could also use toggleMixMode()',
    run() {
      window.dispatchEvent(new Event('ttx.mix'))
    }
  },
  {
    id: 'boxedButton',
    label: 'Toggle boxed mode',
    key: 'b',
    invokingMsg: 'dispatching Event("ttx.subtitlemode") // we could also use toggleBoxMode().  The screen is blank if it doesn\'t contain boxed characters',
    run() {
      window.dispatchEvent(new Event('ttx.subtitlemode'))
    }
  },
  {
    id: 'gridButton',
    label: 'Toggle grid',
    key: 'g',
    invokingMsg: 'calling toggleGrid()',
    run() {
      t.toggleGrid()
    }
  },
  {
    id: 'clearButton',
    label: 'Clear screen',
    key: 'w',
    invokingMsg: 'calling clearScreen()',
    run() {
      t.clearScreen()
    }
  },
  {
    id: 'loadPageButton',
    label: 'Load a page encoded in a string',
    key: 'l',
    invokingMsg: 'calling loadPageFromEncodedString(data) // data is a string packed from 7-bit bytes',
    run() {
      t.loadPageFromEncodedString(WIKIFAX)
    }
  },
  {
    id: 'smoothButton',
    label: 'Toggle mosaic upscaling',
    key: 'p',
    invokingMsg: 'TODO // this loads or unloads @techandsoftware/teletext-plugin-smooth-mosaic',
    run() {
      // TODO
    }
  },
  {
    id: 'setPageRowsButton',
    label: 'Draw multiple rows',
    key: 'd',
    invokingMsg: 'calling setPageRows(arrayOfRowData)',
    run() {
      writePageRowsToScreen()
    }
  },
  {
    id: 'loadTestPageButton',
    label: 'Load a built-in test page',
    key: 't',
    invokingMsg: 'calling showTestPage()',
    run() {
      t.showTestPage()
    }
  },
  {
    id: 'randomiseButton',
    label: 'Randomise page',
    key: 'x',
    invokingMsg: 'calling showRandomisedPage()',
    run() {
      t.showRandomisedPage()
    }
  }, {
    id: 'doubleWidthAndSize',
    label: 'Show a level 2.5 page containing double width and size characters',
    key: 'z',
    invokingMsg: 'calling setPageRows(arrayOfRowData) and setLevel(Level[2.5]) // data includes double width and size attributes',
    run() {
      writePageWithSizeAttributes();
      t.setLevel(Level[2.5]);
    }
  }
];
// TODO
// font
// level
// aspect ratios
// mosaic rendering (view)


// Create a map of button keyboard shortcut to the button index, for keyboard shortcut handling
const keyToButtonIndex = Object.fromEntries(buttons.map((btn, indexToButton) => [btn.key, indexToButton]));
const buttonElementRefs = useTemplateRef('buttonEls');

function writePageRowsToScreen() {
  t.setPageRows([
    'This is teletext level 1.5  ETSI 300 706',
    '',
    '    40 columns \u{7f} 25 rows \u{7f} 8 colours',
    '',
    Attributes.charFromTextColour(Colour.YELLOW) + 'Foreground colours',
    '',
    'TODO'
  ]);
}

// this demoes double width and double size text and mosaics
function writePageWithSizeAttributes() {
  t.setPageRows([
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
  ]);
}

runDemoInVitepress(() => {
  window.addEventListener('keydown', handleKeyPress);

  t = Teletext();
  t.addTo('#screen');
  t.showTestPage();

  return () => t.destroy(); // cleanup after unmount in vitepress
});

function trigger(btn) {
  apiInvokedMessage.value = btn.invokingMsg;
  btn.run();
}

function handleKeyPress(e) {
  const key = e.key.toLowerCase();
  const idx = keyToButtonIndex[key];
  if (idx === undefined) return;

  const btn = buttons[idx]; // button data
  buttonElementRefs.value[idx].focus(); // focus the button element
  trigger(btn);
}

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress);
});

</script>
</ClientOnly>

<style>
.button-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.button-row button {
  flex: 0 0 auto; 
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-soft);
  cursor: pointer;
}
.button-row button:hover {
  background-color: var(--vp-c-bg-emphasis);
}
</style>
