<!-- Basic vue component for @techandsoftware/teletext -->
<template>
  <div class="teletextscreen" :id="dynamicId"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Teletext } from '@techandsoftware/teletext';

const emit = defineEmits(['ready'])
const dynamicId = 'teletext-' + Math.random().toString(36).slice(2);

onMounted(() => {
  const screen = Teletext();
  screen.addTo(`#${dynamicId}`);
  screen.setPageRows([' TeletextScreen intialised', '\x02Screen id: ' + dynamicId]);
  emit('ready', screen);
});
</script>

<style>
  .teletextscreen {
    padding-top: 10px;
  }
</style>
