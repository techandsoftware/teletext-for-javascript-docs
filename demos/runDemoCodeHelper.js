// this script is for vitepress itegration of the demo code
import { onMounted, onUnmounted, nextTick } from 'vue';

export function runDemoInVitepress(demoFn) {
  let destroyFn;

  // run the demo function after onMounted
  // the demo function returns a destroy function for cleaning up
  onMounted(async () => {
    await nextTick();
    destroyFn = demoFn();
  });


  // run the destroy function returned above
  onUnmounted(() => {
    if (typeof destroyFn === 'function') {
      destroyFn();
    }
  });
}