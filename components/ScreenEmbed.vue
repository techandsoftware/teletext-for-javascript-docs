<template>
  <button @click="openInNewTab">
    View in new tab ↗︎
  </button>
  <div ref="framecontainer" class="screenembed">
    <iframe :src onload="this.focus()" />
  </div>
</template>

<script setup>
import { useTemplateRef, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  src: { type: String, required: true }
});

const el = useTemplateRef("framecontainer");
const THRESHOLD = 646;
let sizeObserver = null;

onMounted(() => {
  if (!el.value) return;

  // set the aspect ratio depending on the width of the iframe container
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
  window.open(props.src, '_blank');
}
</script>

<style scoped>
button {
  margin-bottom: 0.5rem;
}
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
