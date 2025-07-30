# Demos

The source of the demos is available at https://TODO

The first demo creates the teletext object, loads into the &lt;div&gt; and shows a built-in test page.

<div id="screen"></div>

<script setup>
import { onMounted } from 'vue';
import { Teletext } from '@techandsoftware/teletext';

function demo() {
  const t = Teletext();
    // defaults to Level 1
    t.addTo('#screen');
    t.showTestPage('ENGINEERING');
}

onMounted(demo);
</script>