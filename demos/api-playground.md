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

<label>Teletext level
  <select autocomplete="off" v-model="screenLevel" @change="onLevelChanged">
    <option>0</option>
    <option selected>1</option>
    <option>1.5</option>
    <option>2.5</option>
  </select>
</label>

<label>Font
  <select v-model="screenFont" @change="onFontChanged">
    <option>sans-serif</option>
    <option>Bedstead</option> 
    <option>native</option> 
    <option>serif</option> 
    <option>Unscii</option> 
    <option>Ubuntu</option>
    <option>Roboto Mono</option>
    <option>monospace</option> 
    <option>cursive</option>
  </select>
</label>

<label>Mosaic graphics rendering
  <select v-model="mosaicRendering" @change="onMosaicRenderingChanged">
    <option value="classic__font-for-mosaic">Font-rendered mosaics</option>
    <option value="classic__graphic-for-mosaic">Graphic-rendered mosaics</option>
  </select>
</label>

<label>Mosaic graphics upscaling
  <select v-model="mosaicUpscaledSelection" @change="onMosaicUpscaledSelectionChanged">
    <option>Not upscaled</option>
    <option>Upscaled</option>
  </select>
</label>

<p style="margin-top: 1rem; margin-bottom: 1rem;">{{ apiInvokedMessage }}</p>


<ClientOnly>
<div id="screen"></div>
</ClientOnly>

<script setup>
import { onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
import { runDemoInVitepress } from './runDemoCodeHelper.js';
import { Teletext, Level } from '@techandsoftware/teletext';
import { WIKIFAX, PAGE_LEVEL_1, PAGE_WITH_DOUBLE_WIDTH_AND_HEIGHT } from './demoPages.js';

// model declarations linked to the the demo UI components
const apiInvokedMessage = ref('// Use the buttons above and the invoked API will appear here');
const screenLevel = ref('1');
const screenFont = ref('sans-serif');
const mosaicRendering = ref('classic__font-for-mosaic');
const mosaicUpscaledSelection = ref('Not upscaled');
let resetMosaicRenderingToFont = false; // state management if upscaling switched off


let t; // teletext instance - will be initialised after onMounted

// define each demo button and the corresponding API action.
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
    id: 'setPageRowsButton',
    label: 'Draw multiple rows',
    key: 'd',
    invokingMsg: 'calling setPageRows(arrayOfRowData)',
    run() {
      t.setPageRows(PAGE_LEVEL_1)
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
      t.setPageRows(PAGE_WITH_DOUBLE_WIDTH_AND_HEIGHT);
      screenLevel.value = '2.5';
    }
  }
];
// TODO
// finish writePageRowsToScreen
// styling of the buttons and selectors

// Create a map of button keyboard shortcut to the button index, for keyboard shortcut handling
const keyToButtonIndex = Object.fromEntries(buttons.map((btn, indexToButton) => [btn.key, indexToButton]));
const buttonElementRefs = useTemplateRef('buttonEls');


function onLevelChanged() {
  apiInvokedMessage.value = `calling setLevel(Level[${screenLevel.value}])`;
  // the watch() function will call setLevel
}

watch(screenLevel, (newLevel) => {
  t.setLevel(Level[newLevel]);
});

function onFontChanged() {
  apiInvokedMessage.value = `calling setFont("${screenFont.value}")`;
  t.setFont(screenFont.value);
}

function onMosaicRenderingChanged() {
  apiInvokedMessage.value = `calling setView("${mosaicRendering.value}")`;

  // watch() will call setView()

  // as setView unloads the mosaic plugin, keep the demo UI state correct
  if (mosaicRendering.value == 'classic__font-for-mosaic' && mosaicUpscaledSelection.value == 'Upscaled') {
    mosaicUpscaledSelection.value = 'Not upscaled'
  }
}

watch(mosaicRendering, (newVal) => {
  t.setView(newVal)
});

async function onMosaicUpscaledSelectionChanged() {
  const isUpscaled = mosaicUpscaledSelection.value === 'Upscaled';

  if (isUpscaled) {
    await loadSmoothMosaic();
  } else {
    unloadSmoothMosaic();
  }
}

async function loadSmoothMosaic() {
  ensureGraphicMosaicRendering();

  apiInvokedMessage.value = 'importing @techandsoftware/teletext-plugin-smooth-mosaic and calling registerViewPlugin(plugin) // requires graphic rendering of mosaics'

  try {
    const { SmoothMosaicPlugin } = await import('@techandsoftware/teletext-plugin-smooth-mosaic');
    t.registerViewPlugin(SmoothMosaicPlugin);
  } catch (e) {
    apiInvokedMessage.value = '// Error - failed to import the plugin: ' + e.message;
    console.error(e);
  }
}

function unloadSmoothMosaic() {
  if (resetMosaicRenderingToFont) {
    mosaicRendering.value = 'classic__font-for-mosaic';
    resetMosaicRenderingToFont = false;
  }

  apiInvokedMessage.value = `calling setView("${mosaicRendering.value}") // setting the view unloads the plugin`;
  t.setView(mosaicRendering.value);
}

// this is used when loading/unloading the smooth mosaic plugin to restore the prior state of mosaic rendering
function ensureGraphicMosaicRendering() {
  if (mosaicRendering.value === 'classic__font-for-mosaic') {
    mosaicRendering.value = 'classic__graphic-for-mosaic';
    resetMosaicRenderingToFont = true;
  } else {
    resetMosaicRenderingToFont = false;
  }
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
  // ignore keypress in some cases
  if (document.body.classList.contains('DocSearch--active')) return;  // ignore key press if search is open
  const tag = document.activeElement?.tagName;
  if (tag == 'SELECT') return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  const key = e.key.toLowerCase();
  const idx = keyToButtonIndex[key];
  if (idx === undefined) return;

  const btn = buttons[idx]; // button data
  buttonElementRefs.value[idx].focus({ preventScroll: true }); // focus the button element
  trigger(btn);
}

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress);
});

</script>

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
