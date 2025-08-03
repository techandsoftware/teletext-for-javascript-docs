# Demos

The source of the demos is available at https://github.com/techandsoftware/teletext-for-javascript-docs/tree/main/demos

::: tip
The source in the repository includes some helper code for Vitepress integration, which can be ignored.
:::

The first demo creates the teletext object, loads into the `<div>` container, and shows a built-in test page.


::: details Code 
```javascript
import { Teletext } from '@techandsoftware/teletext';

const t = Teletext();
t.addTo('#screen');
t.setDefaultG0Charset('g0_latin__english');
t.showTestPage('ENGINEERING');
```
:::

<button id="mixButton">Toggle mix mode</button> | <button id="boxedButton">Toggle boxed mode</button> | <button id="revealButton">Toggle reveal</button>

<ClientOnly>
<div id="screen"></div>

<script setup>
import { runDemoInVitepress } from './runDemoCodeHelper.js';
import { Teletext } from '@techandsoftware/teletext';

runDemoInVitepress(() => {

  const t = Teletext();
  t.addTo('#screen');
  t.setDefaultG0Charset('g0_latin__english');
  t.showTestPage('ENGINEERING');

  document.querySelector('#mixButton').onclick = () => t.toggleMixMode();
  document.querySelector('#boxedButton').onclick = () => t.toggleBoxMode();
  document.querySelector('#revealButton').onclick = () => t.toggleReveal();

  return () => t.destroy(); // cleanup after unmount in vitepress
});
</script>
</ClientOnly>
