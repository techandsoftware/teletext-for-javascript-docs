---
aside: false
---
# Demo: Teletext API playground

This page demoes the teletext screen APIs not already demonstrated. Use the buttons and options below (or at the side) of the teletext screen to invoke each API. Keyboard shortcuts are in brackets.

<div id="playground-outer-layout">
<div class="demo-main">

  <ClientOnly>
  <div id="screen"></div>
  </ClientOnly>

  <p style="margin-top: 1rem; margin-bottom: 1rem;">{{ apiInvokedMessage }}</p>
</div>

<div class="demo-controls">
<div class="select-row">
  <label>Teletext level
    <select autocomplete="off" v-model="screenLevel" @change="onLevelChanged">
      <option>0</option>
      <option selected>1</option>
      <option>1.5</option>
      <option>2.5</option>
    </select>
  </label><label>Font
    <select v-model="screenFont" @change="onFontChanged">
      <optgroup label="Named fonts">
        <option value="'Atkinson Hyperlegible Mono', monospace">Atkinson Hyperlegible Mono</option>
        <option value="Bedstead, monospace">Bedstead (retro font)</option>
        <option value="'Bitcount Single'">Bitcount Single (pixel font)</option>
        <option value="Cousine, monospace">Cousine</option>
        <option value="Unscii, monospace">Unscii (retro font)</option>
      </optgroup>
      <optgroup label="Font families">
        <option>cursive</option>
        <option>fantasy</option>
        <option>monospace</option> 
        <option>native</option> 
        <option>sans-serif</option>
        <option>serif</option> 
        <option>ui-monospace</option>
      </optgroup>
    </select>
  </label><label>Mosaic graphics rendering
    <select v-model="mosaicRendering" @change="onMosaicRenderingChanged">
      <option value="font">Font-rendered mosaics</option>
      <option value="graphics">Graphics-rendered mosaics</option>
      <option value="graphics-upscaled">Graphics-rendered mosaics with upscaling</option>
    </select>
  </label>
</div>

<div class="button-row">
  <button
    v-for="btn in DemoAPIModule.buttons"
    :key="btn.id"
    type="button"
    @click="trigger(btn)"
    ref="buttonEls"
  >
    {{ btn.label }} ({{ btn.key }})</button>
</div>
</div> <!-- controls -->
</div> <!-- playground-outer-layout -->

<script setup>
// The UI code for the demo is using vue as it's integrated with vitepress.  For your own code, you can call the teletext API however you like.
// For the teletext API calls, see apiPlaygroundMappings.js - this separates it from the vue code here

import * as DemoAPIModule from './apiPlaygroundMappings.js'; // teletext API calls are in this module
import { Teletext } from '@techandsoftware/teletext';

import { onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
import { runDemoInVitepress } from './runDemoCodeHelper.js';

// model declarations linked to the the demo UI components
const apiInvokedMessage = ref('// Use the buttons and options below, and the invoked API will appear here');
const screenFont = ref("'Atkinson Hyperlegible Mono', monospace");

// the following refs are defaults for a new teletext instance
const screenLevel = ref('1'); // teletext level 1
const mosaicRendering = ref('graphics'); // use graphics for rendering mosaics

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
  t.setFont(screenFont.value); // override the default font
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
/* top to bottom layout by default */
#playground-outer-layout {

  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* wide screens  - teletext screen on left, controls on right */
  @media (min-width: 1200px) {
    flex-direction: row;
    align-items: flex-start;

    .demo-main {
      flex: 1 1 0;
    }

    .demo-controls {
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
