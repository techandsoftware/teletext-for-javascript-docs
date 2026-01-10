<template>
  <button @click="openInNewTab" style="padding-bottom: 0.5em">
    View in new tab ↗
  </button>
  <div ref="el" class="screenembed">
    <iframe :src="src" onload="this.focus()"></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  src: { type: String, required: true }
});

const el = ref(null);
const THRESHOLD = 646;
let sizeObserver = null;

onMounted(() => {
  if (!el.value) return;

  sizeObserver = new ResizeObserver(entries => {
    const w = entries[0].contentRect.width;
    const newRatio =  w < THRESHOLD ? '3 / 5' : '4 / 3';
    if (el.value.style.aspectRatio != newRatio) el.value.style.aspectRatio = newRatio;
  });

  sizeObserver.observe(el.value);
});

onUnmounted(() => {
  if (sizeObserver) sizeObserver.disconnect();
});

function openInNewTab() {
  window.open(props.src, '_blank', 'noopener');
}
</script>

<style scoped>
.screenembed {
  width: 100%;
  aspect-ratio: 4 / 3;
}
.screenembed iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
