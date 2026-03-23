<script setup>
defineProps({
  demo: {
    type: String,
    required: true
  }
})
</script>

<template>
  <span class="block">■</span> <a :href="`/demos/${demo}`">View demo</a>
</template>

<style scoped>
  .block {
    color: #0f0;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
</style>