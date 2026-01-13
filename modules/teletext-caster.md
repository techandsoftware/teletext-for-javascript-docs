# @techandsoftware/teletext-caster

## Overview

This is a Javascript module to cast teletext pages to Chromecast devices from supporting browsers. Supporting browsers are Chrome on Windows/Mac/Linux/ChromeOS/Android, but not Chrome on iOS.  It possibly supports other browsers if they implement Goggle's [Web Sender SDK](https://developers.google.com/cast/docs/web_sender).

It can be used on any teletext related website or web app, or in conjunction with [@techandsoftware/teletext](../teletext-usage) and [@techandsoftware/teletext-service](./teletext-service).

## Usage

### As an ECMAScript module

The HTML/javascript code below does the following:
* Imports the Google cast API framework
* Shows a cast button
* Imports this module using a CDN
* Uses it to cast a teletext page

```html
<script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
<google-cast-launcher id="castbutton"></google-cast-launcher>

<script type="module">
  import { ttxcaster } from 'https://cdn.jsdelivr.net/npm/@techandsoftware/teletext-caster@latest/dist/teletextcaster.min.js';

  // dispay a page using a base64url encoded string. See below about PACKED_PAGE
  ttxcaster.display(PACKED_PAGE)

  // display a page using Output Lines. Parameters described below
  ttxcaster.display({
    defaultG0Charset: encoding,
    header: header,
    outputLines: outputLines
  })
</script>
```

If using npm instead of jsdelivr, then install the package:

```bash
npm install @techandsoftware/teletext-caster
```

Use this import instead:

```javascript
import { ttxcaster } from './node_modules/@techandsoftware/teletext-caster/dist/teletextcaster.min.js';
```

### Non-module code or older browsers

If you're targetting browsers that don't support ES6 modules, or have an existing codebase that isn't based on ES modules, a UMD is available in the `dist` directory for importing using `<script>`. This exports the module in the global `ttx` so access it as `ttx.ttxcaster`

```html
<!-- from jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/@techandsoftware/teletext-caster@latest/dist/teletextcaster.umd.min.js"></script>

<!-- using npm -->
<script src="./node_modules/@techandsoftware/teletext-caster/dist/teletextcaster.umd.min.js"></script>
```

## API

The `ttxcaster.display` method is the only one which needs to be called to display a page. The other methods are optional.

(Google's API framework and cast button are discussed in [Google's guide](https://developers.google.com/cast/docs/web_sender/integrate). It's not necessary to call Google's API directly as this module wraps around it.)

### ttxcaster.display(PACKED_PAGE || object)

Displays a page. You can supply a string or an object.

PACKED_PAGE is a base64-encoded string of 7-bit characters for the 25 rows x 40 characters concatenated together. The encoded string uses the character repertoire defined in the [base64url encoding](https://tools.ietf.org/html/rfc4648#section-5). This format is taken from the URL hash fragment format used by Simon Rawles' online edit.tf teletext editor. See further details here: https://github.com/rawles/edit.tf

If an object is supplied, it has these properties:
```javascript
{
  defaultG0Charset: string (optional),
  header: string (optional),
  outputLines: [strings],
  packed: string
}
```

`defaultG0Charset` is optional.  If supplied, the page uses it as the default G0 character set.  The available character sets can be seen in the documentation for [`setDefaultG0Charset()`](../teletext-screen-api#setdefaultg0charset-charset-withupdate) from [@techandsoftware/teletext](../teletext-usage).

`header` is optional. When present, it's a string of 32 characters, which have the same encoding as the outputLines (see below) but without the initial `OL,rowNum,` . This is used as the header row and is used instead of Output Line 0 in the provided outputLines. When not provided, the row 0 in the lines is used if there is one.  When a header is supplied, the page is also cleared before the outputLines are displayed.

One of `outputLines` or `packed` is required, which are alternative formats for the page data.  If `packed` is supplied, it's a string with the PACKED_PAGE format described above.  `outputLines` is an array of strings with up to 25 elements. The strings are in the Output Line format used in MRG's .tti files.  Each line has this format:

`OL,rowNum,line`

In this:

* `rowNum` is between 0 and 24
* `line` is the string to display. Attribute characters (character codes less than 0x20) are represented in three ways: 1) As they are with no translation, or 2) They have 0x80 added to translate them to characters with codes 128-159, or 3) they are replaced by escape (character 0x1b) then the character with 0x40 added.

### ttxcaster.available.attach(function)

Register a function to receive the available event. The available event happens when the client browser (probably Chrome) supports Google's casting API, so there is the possibility of connecting to Chromecast devices and you can expect to get `castStateChanged` events. If the browser doesn't supporting casting then there's no event.

### ttxcaster.castStateChanged.attach(function)

Register a function for state change events. The function is called when the cast icon state changes. The state can be retrieved with `ttxcaster.getCastState()`.  (This is a proxy to [CAST_STATE_CHANGED](https://developers.google.com/cast/docs/reference/web_sender/cast.framework#.CastContextEventType) events on [CastContext](https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext) in Google's cast API.)

### ttxcaster.getCastState()

Gets the cast icon state. The response is a string with one of these values:

* `NO_DEVICES_AVAILABLE`
* `NOT_CONNECTED`
* `CONNECTING`
* `CONNECTED`

(This is a proxy to [CastContext.getCastState()](https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext#getCastState) in Google's cast API.)

### ttxcaster.setSmoothMosaics()

Renders block mosaics using a pixel art scaling algorithm so that graphics are higher resolution.

### ttxcaster.setBlockMosaics()

Renders block mosaics in their usual blocky form.

### ttxcaster.clearScreen()

Clears the screen.

### ttxcaster.toggleReveal()

Shows or hides concealed characters if the page contains them.
    
### ttxcaster.toggleMixMode()

Hides or shows row background colours.

### ttxcaster.toggleBoxMode()

Activates or deactivates box mode mode display. The page needs to contain boxed characters for them to display, otherwise the page is transparent.
    
### ttxcaster.toggleGrid()

Shows or hides a grid.

### ttxcaster.mount()

For single page apps, call this in your mounted hook, so that the available event and state change event are re-issued. This ensure that your UI is synced with the cast state. You need to call `mount()` after `ttxcaster.available.attach()` and `ttxcaster.available.attach()`, if your are using these.

### ttxcaster.destroy()

For single page apps, call this in your unmounted hook. This removes event listener references, and can help garbage collection.

## Demo

The cast button will appear in the panel below on supporting browsers, and if you have a Chromecast on the same network. Generally, that's in Chrome on any OS except iOS.

<strong>1. Click/touch to connnect or disconnect</strong>

<div id="casterlauncherwrapper" class="" style="">
    <google-cast-launcher id="castbutton"></google-cast-launcher>
</div>

<i>Cast state: {{ castState }}</i>

If the cast state is 'state not set' then your browser doesn't support Google's web sender API.

<strong>2. Select a page to cast</strong>

<div class="button-row">
<button type="button" data-page="QIECBAgQIJ9KDDmRUDZi3QU8PRk1QQeHIHDaIEDJiwYumDACdDwcnbLy6aeeXbl3dECBAgQIECBAgQIECBAgQIHwZkvcoCx0og8LNGjYwQPEjzpoWaNjBA82YHnTQwabEjTpowPEiBAgLHSiBbs1atjFA9SPe2pZqQNUHX1qQatSlrqQNW-5UsaIECAsdKIFidUqQJUCVAlVKlipchQJUCJanVIEqpAlSqlC5CgQIEB0ogQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQHSKBAgQYEH7ogQaGCApw_fEm54R3PCm5JuSKHoFUEVIECAudIoECBB6-___TB-_v0JTU_WqkZHFyQKHmjYgYBECpAqQIC50igQIEH___3_-iD__6FFSAig-IP6JCg26lzRr3avEgFUgLnSKBAg1f1X9lv_9NSBAgI6G-HX1V_EqBUqQJUqXBzagVSAudIoECD9_Qa2qL__6IMDzoq682qdAgQIEARAgQIECBAgVIC50igQIP_9AiaoFX__0VfV_1kjQIECBAgQBECBAgAoECpAgLnSKBBq__0CBCgQa___oreokCBAgQIECBAgQBECBAgVIECAudIoEHr__QIECBAg3_36FAgQIECBAgQIECAIgQIFSBAgQIAZ0igQf_7dAgKIECAinKf9bTR9QIv-N6i_ofzNagQIECBAgJnSKDR__tUBRAoe6NiBB_XYf_rqg_q2iD-gRb-iBAgQIECAmdIoNX_-1QFECDrq9IMH9h664P_D-w34P7DZ4ToECBAgQICZ0ig___5TQ8SfEHzQ82MPCzpoedEHzA82MPjDQ0-LNDSk0JnSOD___lNXVh_Qf9T3cx_oP-prqa_1S3Y0_q_zX-s1NdTUmdI6v_9-U1NUH9B_1NdTX-g_6mvpL_wMNTX-g1Nf6DAz1tSZ0j-_v0JREjQokaFEhRIUSNCiRoUCNAjRoEaBEhRo0CNGgBnSP9OgQFECCNPpIIVKfDkVaUWmggzoiCFPny5M6PTQIECAGdIjUAGlJnR0DBu5coGrFm0YMEE-kgpxYqChBjxUDNuwQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAy92np007s6AFSy9tOXvzQA7O_ryQTd-7L5DQVtpBJ3ZMvg">Advert</button>
<button type="button" data-page="QIECBAgQIIcWLGg2EDFy2QIJu_cgZNUETLjQA2TN0xYr2DAodJIECBAgQIEGDB4_PUCBAgQIECBAgQIECBAgQIEANkvaMih0kgQIECDA1Qfv__OgQYGCBAgQIECBAgQIECBAgQIECBAgKHSSBAgQIH6FR-__-v7___oECBAgQIEAORPmxUE6LXpoECAodJIECBAoQKum7______9-gQIECBAgQA82_Zs39-aB8-QIAh0kgQIECBAgSev_____v06BAgQIECBAgQIECBAgQIECBAgKHSSBAgQIECBR00____-_w9GCBAgQIECBAgQIECBAgQIECAodJIECBAgQIECD8rx________ECBAgQIECBAgQIECBAgQICh0kgQIECBAgQLETRlv_______6oECBAgQIECBAgQIECBAgKHSyBAgQIHGQlwYIEH_-_x_____9-dECBAgQIECBAgQIECAIdLIECDAmJbfz_-0RJ0qBV________7sECBAgQIECBAgQIAh0sgQIMzAl-__fX5Sg0JECvX______586IECBAgQIECBAgCHSyBAgwJiW9OjX_0qBAgQIEX________-l8fPjBAgQIECAIdLIEHBYhQIECBQxQICWDhg5fv____________tUCBAgQIAh0sgzIECBAgQIEGlAgQEtP_______________-lQIECBAgCHSyBUwQIECBAgQakCBASQqv_____________-6FAgQIECAIdLIECJygQIECBAgaoEBJBg______________5-OiBAgQIAh0sgQKGKBAgQIEHBKgJIMH7____8v__________QoECBAgCHSyBRmQIECBA4RoECAkgVoVaNel________r16FAgQIECAIdLINCFAgwOEyBAgQICSBAgQePn7___r06RAgQIECBAgQIAh0sgQLeKxCgQIECBAgJIECDR__v0aNGhQIECBAgQIECBAgCHSSBAgQIECBAgQIECBAgQYP3_-1QIECBAgQIECBAgQIECAIdJIECBAgQIECBAgQIECBB6boUSBAgQIECBAgQIECBAgQIAh0kgQIECBAgQIECBAgQIFStAgQIECBAgQIECBAgQIECBAgAzsvjognZe_MFIy4cmzTuy8wdTfwQU-G_l0DVKy-lhyad6A">UK</button>
<button type="button" data-page="QIECBAgQIIcWLGg2EDdy3QIKnXKgYtUE7f2QA2TB0wYr2DECAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAYMS54fzJmix4-YCDToOLOjyZ0WLSkzo6AkcGHuZUcRHlB4dgyAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAWDP9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_YNCho9zImSoAqBGoAp0FUy8-iChhz5UCA4MPEuZYgTAFyAFg1_f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f2DYCAAoACACeQHkBdYTJlixIkSKlSJEoUKIEBQABAAQAEABYN_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_39g4AgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgGDn9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_YsAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIBix_f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f2LICAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAYs_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_39i0AgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgGLX9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_Ytq-jT0yg7OXZs39w0Pzh3Ao_LLl3BZuHPl3dMIGllyBIWzrlLmkKJGTSJUycsoUqlZJYtXLzLBiyZlWjVs3IuHLp2UePXz9AgQokaBIlTJ0ChSqVoFi1cvQMGLJmgaNWzdA4cunaB49fP0ECDChoIkWNHQSJMqWgmTZ09BQo0qaCpVrV0FizatoLl29fQYMOLGgyZc2dBo06taDZt3b0HDjy5oOnXt3QePPr2g-ff38pgw4sZHJlzZyujTq1ktm3dvNcOPLmW6de3cn48-vZf59_fwZiHv3Y8uHYIjbMPPQDVCxcLf4E0-mXDk8mI-_dlFCn5a9_DKr6q-qvqr6q-qvqr6AFS390DJoGQKr6q-qvqr6q-qvqr6o">Engineering</button>
<button type="button" data-page="QIECBAgQV9OvTmw-EDFgwQIKmjry5oIPDkgZMkDFwwYOmDAugQNEDRogaIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIAh0uqYOmDrRowJGjxg80ZNGDIHqaMqDNyy5UCBAgQIECBAgCHS6DSh0odWpSwat0HfU61atYfLux-cezfwy5NOFAgQIECAovXr1q9avWrV65cuXrFq5atWr169evXr169evXr169evXr0CBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgDRuW_ag6b8mHyn5oM2XD068suRBh5dNOPZlQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIAcXDy6aA-nmg6aMqDpo08siDhsw7svRBm5b9qDpoyoOfXcgQYd2RB00ZUG_ds8oMPPpy37t-3Tjw7EG_Fqy4-iDXu399yBB03oNGHli39eSDZpzZVyCT0QaeaDpoyoMmXdzy8-iBAgQIEHDZh3ZeiDTuQdNGVBz37MPJBz88-mXagw7siDbv59ECBAgQbcPPnp7ZUG_Mg6aMqDNv68kHLfj1-UHDZh3ZenNcgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIEEHFv69EDJylQb8yCLh5dNCfmg59eWbDjyoNPNBsw7sixAgQd9PTQg6aMqDll24dO7Jl5IMe_tl5ZciDTuQd8PTLyQYd2RBt649CDfmQRcPLpoT80HDfsw8kHLLn0793NBj39svLLkQIEGncg048q5AgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBBFw8umhBm38tuXIg39svJA0XNUGLTs2ad-5B5y4eXNAgQIEGHPvXIK-npo07kHTRlQZtPLn0QYtOzZp37kHnLh5c1iBAgQbNObKgw8OGXDyy5EGncg6aMqDfjy4d3NBh3ZEGLLnw7kCBB03oMObNlx9EEXDy6aE_NBh6bd_Phoy8sqDDuyIECBAgQIEHPryzYceVcgQIEAIxM048u7nlQU6ESwghw1sKytpwVrNcwQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA">Wikifax</button>
</div>

Credit to <a href="https://www.teletextarchive.com/">The Teletext Archive</a> for the pages above.

Remote controls:

<div class="button-row">
  <button type="button" id="revealButton">REVEAL</button>
  <button type="button" id="mixButton">MIX</button>
  <button type="button" id="boxedButton">Toggle boxed mode</button>
  <button type="button" id="clearButton">Clear screen</button>
  <button type="button" id="gridButton">Toggle grid</button>
  <button type="button" id="smoothButton">Smoother graphics</button>
</div>

<script setup>
import { ref } from 'vue';
import { runDemoInVitepress } from '../demos/runDemoCodeHelper.js';
import { ttxcaster as screen } from '@techandsoftware/teletext-caster';

addCastSDKScript();

const castState = ref('State not set');

runDemoInVitepress(() => {
    screen.castStateChanged.attach(castStateChanged);
    screen.mount();

    // the buttons map directly to API calls on ttxcaster
    document.querySelector('#revealButton').addEventListener('click', () => screen.toggleReveal());
    document.querySelector('#mixButton').addEventListener('click', () => screen.toggleMixMode());
    document.querySelector('#boxedButton').addEventListener('click', () => screen.toggleBoxMode());
    document.querySelector('#clearButton').addEventListener('click', () => screen.clearScreen());
    document.querySelector('#gridButton').addEventListener('click', () => screen.toggleGrid());
    document.querySelector('#smoothButton').addEventListener('click', () => screen.setSmoothMosaics());

    // the page data is embedded in the HTML. Here we'll get it using dataset and pass it to ttxcaster.display()
    // the page data format is described by Simon Rawles https://github.com/rawles/edit.tf
    document.querySelectorAll('[data-page]').forEach(e => e.addEventListener('click', () => screen.display(e.dataset.page)));

    return () => { screen.destroy(); }
});

function addCastSDKScript() {
  if (typeof window === 'undefined') return;
  if (document.querySelector('script[src*="cast_sender.js"]')) return;

  const s = Object.assign(document.createElement('script'), {
    src: 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1',
    async: true,
  });
  document.head.appendChild(s);
}

function castStateChanged() {
    castState.value = screen.getCastState();
}
</script>
<style>
#casterlauncherwrapper {
  display: inline-flex;
  align-items: center;
  padding: 6px 8px;
  border-left: 4px solid var(--vp-c-tip-1);
  background-color: var(--vp-c-tip-soft);
  border-radius: 6px;
}
#castbutton {
  width: 32px;
  height: 32px;
}

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

## Licensing

The Chromecast receiver app that this module connects to is intended for non-commercial use.  For commercial enquiries, contact techandsoftwareltd@outlook.com
