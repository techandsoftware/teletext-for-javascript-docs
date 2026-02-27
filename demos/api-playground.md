# Demo: Screen API playground

Use the buttons below to invoke each API. Keyboard shortcuts are in brackets.

<div class="button-row" @click="handleClick">
  <button type="button" id="revealButton" data-key="?">Toggle reveal (?)</button>
  <button type="button" id="mixButton" data-key="m">Toggle mix mode (m)</button>
  <button type="button" id="boxedButton" data-key="b">Toggle boxed mode (b)</button>
  <button type="button" id="clearButton" data-key="w">Clear screen (w)</button>
  <button type="button" id="gridButton" data-key="g">Toggle grid (g)</button>
  <button type="button" id="smoothButton" data-key="p">Toggle mosaic upscaling (p)</button>
  <button type="button" id="loadTestPageButton" data-key="t">Load a built-in test page (t)</button>
  <button type="button" id="loadPageButton" data-key="l">Load a page encoded in a string (l)</button>
  <button type="button" id="setPageRowsButton" data-key="d">Draw multiple rows (d)</button>
  <button type="button" id="randomiseButton" data-key="x">Randomise (x)</button>
<!-- TODO continue adding buttons -->

</div>

<p style="margin-top: 1rem; margin-bottom: 1rem;">{{ apiInvokedMessage }}</p>


<ClientOnly>
<div id="screen"></div>

<script setup>
import { onBeforeUnmount, ref } from 'vue';
import { runDemoInVitepress } from './runDemoCodeHelper.js';
import { Attributes, Colour, Teletext } from '@techandsoftware/teletext';

const apiInvokedMessage = ref('// Tap/click a button to invoke an API');
// this is raw page data used with loadPageFromEncodedString()
const WIKIFAX = 'QIECBAgQV9OvTmw-EDFgwQIKmjry5oIPDkgZMkDFwwYOmDAugQNEDRogaIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIAh0uqYOmDrRowJGjxg80ZNGDIHqaMqDNyy5UCBAgQIECBAgCHS6DSh0odWpSwat0HfU61atYfLux-cezfwy5NOFAgQIECAovXr1q9avWrV65cuXrFq5atWr169evXr169evXr169evXr0CBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgDRuW_ag6b8mHyn5oM2XD068suRBh5dNOPZlQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIAcXDy6aA-nmg6aMqDpo08siDhsw7svRBm5b9qDpoyoOfXcgQYd2RB00ZUG_ds8oMPPpy37t-3Tjw7EG_Fqy4-iDXu399yBB03oNGHli39eSDZpzZVyCT0QaeaDpoyoMmXdzy8-iBAgQIEHDZh3ZeiDTuQdNGVBz37MPJBz88-mXagw7siDbv59ECBAgQbcPPnp7ZUG_Mg6aMqDNv68kHLfj1-UHDZh3ZenNcgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIEEHFv69EDJylQb8yCLh5dNCfmg59eWbDjyoNPNBsw7sixAgQd9PTQg6aMqDll24dO7Jl5IMe_tl5ZciDTuQd8PTLyQYd2RBt649CDfmQRcPLpoT80HDfsw8kHLLn0793NBj39svLLkQIEGncg048q5AgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBBFw8umhBm38tuXIg39svJA0XNUGLTs2ad-5B5y4eXNAgQIEGHPvXIK-npo07kHTRlQZtPLn0QYtOzZp37kHnLh5c1iBAgQbNObKgw8OGXDyy5EGncg6aMqDfjy4d3NBh3ZEGLLnw7kCBB03oMObNlx9EEXDy6aE_NBh6bd_Phoy8sqDDuyIECBAgQIEHPryzYceVcgQIEAIxM048u7nlQU6ESwghw1sKytpwVrNcwQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA';

let t; // will be initialised after onMounted

// maps the buttons to the API being invoked on the Teletext instance.
// reveal, mix and boxed demonstate the events API, which doesn't require access to the teletext instance
const actions = {
  revealButton: {
    invokingMsg: 'dispatching Event("ttx.reveal") // we could also use toggleReveal().  No effect if the screen doesn\'t contain concealed characters',
    run() {
      window.dispatchEvent(new Event('ttx.reveal'))
    }
  },
  mixButton: {
    invokingMsg: 'dispatching Event("ttx.mix") // we could also use toggleMixMode()',
    run() {
      window.dispatchEvent(new Event('ttx.mix'))
    }
  },
  boxedButton: {
    invokingMsg: 'dispatching Event("ttx.subtitlemode") // we could also use toggleBoxMode().  The screen is blank if it doesn\'t contain boxed characters',
    run() {
      window.dispatchEvent(new Event('ttx.subtitlemode'))
    }
  },
  gridButton: {
    invokingMsg: 'calling toggleGrid()',
    run() {
      t.toggleGrid()
    }
  },
  clearButton: {
    invokingMsg: 'calling clearScreen()',
    run() {
      t.clearScreen()
    }
  },
  loadPageButton: {
    invokingMsg: 'calling loadPageFromEncodedString(data) // data is a string packed from 7-bit bytes',
    run() {
      t.loadPageFromEncodedString(WIKIFAX)
    }
  },
  smoothButton: {
    invokingMsg: 'TODO // this loads or unloads @techandsoftware/teletext-plugin-smooth-mosaic',
    run() {
      // TODO
    }
  },
  setPageRowsButton: {
    invokingMsg: 'calling setPageRows(arrayOfRowData)',
    run() {
      writePageRowsToScreen();
    }
  },
  loadTestPageButton: {
    invokingMsg: 'calling showTestPage()',
    run() {
      t.showTestPage();
    }
  },
  randomiseButton: {
    invokingMsg: 'calling showRandomisedPage()',
    run() {
      t.showRandomisedPage();
    }
  }
}

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



runDemoInVitepress(() => {
  window.addEventListener('keydown', handleKeyPress);

  t = Teletext();
  t.addTo('#screen');
  t.showTestPage();

  return () => t.destroy(); // cleanup after unmount in vitepress
});


function trigger(buttonId) {
  console.debug('action', buttonId);
  const action = actions[buttonId];
  if (!action) return;

  apiInvokedMessage.value = action.invokingMsg;
  action.run();
}

function handleClick(event) {
  const button = event.target.closest('button[id]');
  if (button) trigger(button.id);
}

function handleKeyPress(e) {
  const key = e.key.toLowerCase();
  const button = document.querySelector(`button[data-key="${key}"]`);

  if (button) {
    button.focus();
    trigger(button.id)
  }
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
