// this script is for vitepress itegration of the demo code
import { onMounted, onUnmounted, nextTick } from 'vue';

export function runDemoInVitepress(demoFn) {
  let destroyFn;

  onMounted(async () => {
    await nextTick();
    destroyFn = demoFn();
  });

  onUnmounted(() => {
    if (typeof destroyFn === 'function') {
      destroyFn();
    }
  });
}