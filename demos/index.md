# Demos

The source of the demos is available at https://github.com/techandsoftware/teletext-for-javascript-docs/tree/main/demos

The first demo creates the teletext object, loads into the `<div>` container, and shows a built-in test page.

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

  return () => t.destroy(); // cleanup after unmount in vitepress
});
</script>
</ClientOnly>
