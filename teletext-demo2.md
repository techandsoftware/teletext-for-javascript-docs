# Demo 2

<div id="screen"></div>

<script setup>
import { onMounted } from 'vue';
import { Teletext } from '@techandsoftware/teletext';

onMounted(() => {
  const t = Teletext();
  t.addTo('#screen');
  t.setRow(0, 'Direct API use!');
});
</script>