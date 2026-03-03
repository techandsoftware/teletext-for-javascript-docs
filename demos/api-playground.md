# Demo: Screen API playground

This page demoes the teletext screen APIs not already demonstrated. Use the buttons below to invoke each API. Keyboard shortcuts are in brackets.

<div class="button-row">
  <button
    v-for="btn in DemoButtons.buttons"
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
import { onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
import { runDemoInVitepress } from './runDemoCodeHelper.js';
import { Teletext, Level } from '@techandsoftware/teletext';
import * as DemoButtons from './buttonsForAPIDemo.js';

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
  t.setLevel(Level[newLevel]);
});

function onFontChanged() {
  apiInvokedMessage.value = `calling setFont("${screenFont.value}")`;
  t.setFont(screenFont.value);
}

async function onMosaicRenderingChanged() {
  const render = MOSAIC_RENDER_CONFIG[mosaicRendering.value];

  let message = `calling setView("${render.view}")`;
  if (render.upscaled) message += '; calling registerViewPlugin(SmoothMosaicPlugin)';
  apiInvokedMessage.value = message;

  t.setView(render.view);
  if (render.upscaled) {
    await loadSmoothMosaic();
  }
}

async function loadSmoothMosaic() {
  try {
    const { SmoothMosaicPlugin } = await import('@techandsoftware/teletext-plugin-smooth-mosaic');
    t.registerViewPlugin(SmoothMosaicPlugin);
  } catch (e) {
    apiInvokedMessage.value = '// Error - failed to import the plugin: ' + e.message;
    console.error(e);
  }
}

runDemoInVitepress(() => {
  window.addEventListener('keydown', handleKeyPress);

  t = Teletext();
  DemoButtons.setButtonTeletextInstance(t); // the demo buttons are imported
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
  const idx = DemoButtons.keyToButtonIndex[key];
  if (idx === undefined) return;

  const btn = DemoButtons.buttons[idx]; // button data
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
