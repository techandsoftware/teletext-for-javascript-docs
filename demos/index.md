# Demos

The source of the demos is available at https://github.com/techandsoftware/teletext-for-javascript-docs/tree/main/demos

The first demo creates the teletext object, loads into the `<div>` container, and shows a built-in test page.

<div id="screen"></div>

<script setup>
import { onMounted, onUnmounted } from 'vue'; // this is only needed as I'm use vue to embed within the documentation page
import { Teletext } from '@techandsoftware/teletext';

const t = Teletext();
// defaults to Level 1

function demo() {
    t.addTo('#screen');
    t.setDefaultG0Charset('g0_latin__english'); // selects UK G0 set
    t.showTestPage('ENGINEERING');
}

onMounted(demo);
onUnmounted(() => t.destroy());
</script>