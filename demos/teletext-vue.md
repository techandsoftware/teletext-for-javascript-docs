# Demos

<!-- unused demo -->

<TeletextScreen @ready="runDemo"/>

<script setup>
  import TeletextScreen from '../components/TeletextScreen.vue';
  // todo import this globally

  function runDemo(t) {
    t.clearScreen();
    t.setRow(0, 'Demo will go here');
  }
</script>