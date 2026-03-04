# Demo: Screen API playground

This page demoes the teletext screen APIs not already demonstrated. Use the buttons below to invoke each API. Keyboard shortcuts are in brackets.

<div class="button-row">
  <button
    v-for="btn in DemoAPIModule.buttons"
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
    <option value="font">Font-rendered mosaics</option>
    <option value="graphics">Graphics-rendered mosaics</option>
    <option value="graphics-upscaled">Graphics-rendered mosaics with upscaling</option>
  </select>
</label>

<p style="margin-top: 1rem; margin-bottom: 1rem;">{{ apiInvokedMessage }}</p>


<ClientOnly>
<div id="screen"></div>
</ClientOnly>

<script setup>
// code here is vue code for the demo UI.
// for the teletext API calls, see apiPlaygroundMappings.js - this separates it from the vue code here

import { onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
import { runDemoInVitepress } from './runDemoCodeHelper.js';
import { Teletext } from '@techandsoftware/teletext';
import * as DemoAPIModule from './apiPlaygroundMappings.js';

// model declarations linked to the the demo UI components
const apiInvokedMessage = ref('// Use the buttons above and the invoked API will appear here');
const screenLevel = ref('1');
const screenFont = ref('sans-serif');
const mosaicRendering = ref('font');

let t; // teletext instance - will be initialised after onMounted

const MOSAIC_RENDER_CONFIG = {
  font: {
    view: 'classic__font-for-mosaic',
    upscaled: false
  },
  graphics: {
    view: 'classic__graphic-for-mosaic',
    upscaled: false
  },
  'graphics-upscaled': {
    view: 'classic__graphic-for-mosaic',
    upscaled: true
  }
};


// TODO
// finish writePageRowsToScreen
// styling of the buttons and selectors


const buttonElementRefs = useTemplateRef('buttonEls');

function onLevelChanged() {
  apiInvokedMessage.value = `calling setLevel(Level[${screenLevel.value}])`;
  // the watch() function will call setLevel
}

watch(screenLevel, (newLevel) => {
  DemoAPIModule.setTheTeletextLevel(newLevel);
});

function onFontChanged() {
  apiInvokedMessage.value = `calling setFont("${screenFont.value}")`;
  DemoAPIModule.setTheTeletextFont(screenFont.value);
}

async function onMosaicRenderingChanged() {
  const render = MOSAIC_RENDER_CONFIG[mosaicRendering.value];

  let message = `calling setView("${render.view}")`;
  if (render.upscaled) message += '; calling registerViewPlugin(SmoothMosaicPlugin)';
  apiInvokedMessage.value = message;

  DemoAPIModule.setTheTeletextView(render.view);
  // t.setView(render.view);
  if (render.upscaled) {
    try {
      await DemoAPIModule.loadTheSmoothMosaicPlugin();
    } catch (e) {
      apiInvokedMessage.value = '// Error - failed to import the plugin: ' + e.message;
      console.error(e);
    }
  }
}

runDemoInVitepress(() => {
  window.addEventListener('keydown', handleKeyPress);

  t = Teletext();
  DemoAPIModule.setButtonTeletextInstance(t); // the demo buttons are imported
  t.addTo('#screen');
  t.showTestPage();

  return () => t.destroy(); // cleanup after unmount in vitepress
});

function trigger(btn) {
  apiInvokedMessage.value = btn.invokingMsg;
  btn.run();
  if (btn.id == 'doubleWidthAndSize') {
    screenLevel.value = '2.5';
  }
}

function handleKeyPress(e) {
  // ignore keypress in some cases
  if (document.body.classList.contains('DocSearch--active')) return;  // ignore key press if search is open
  const tag = document.activeElement?.tagName;
  if (tag == 'SELECT') return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  // find the key to button index
  const key = e.key.toLowerCase();
  const idx = DemoAPIModule.keyToButtonIndex[key];
  if (idx === undefined) return;

  const btn = DemoAPIModule.buttons[idx]; // button data

  // run the button
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
