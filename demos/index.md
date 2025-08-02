# Demos

The source of the demos is available at https://github.com/techandsoftware/teletext-for-javascript-docs/tree/main/demos

The first demo creates the teletext object, loads into the `<div>` container, and shows a built-in test page.

<ClientOnly>
<div id="screen"></div>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue'; // this is only needed for vitepress integration
import { Teletext } from '@techandsoftware/teletext';

let t;

function demo() {
    t = Teletext();
    // defaults to Level 1
    t.addTo('#screen');
    t.setDefaultG0Charset('g0_latin__english'); // selects UK G0 set
    t.showTestPage('ENGINEERING');
}

// these are needed for integration with vitepress, as the teletext package doesn't yet support server-side rendering within vitepress
onMounted(async() => { await nextTick(); demo() });
onUnmounted(() => t.destroy());
</script>
</ClientOnly>
