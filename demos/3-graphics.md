# Demo: Graphics

Plotting pixels on the screen. This uses the block mosaic set, G1. Unicode calls these characters sextants, with 6 pixels per character.

<button id="gridButton">Toggle grid</button>

<ClientOnly>

<div id="screen"></div>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import { Attributes, Colour, Teletext } from '@techandsoftware/teletext';

let t;

function demo() {
    t = Teletext();
    t.addTo('#screen');
    document.querySelector('#gridButton').onclick = () => t.toggleGrid();

    // set graphics mode with alternative colours per row
    for (let r = 0; r < 25; r++) {
        t.writeByte(0, r, r % 2 ? '\x13' : '\x12');
    }
    for (let radius = 5; radius <= 30; radius += 4) {
        midpointCircle(40, 37, radius);
    }
    t.updateDisplay();

    // midpoint circle algorithm
    function midpointCircle(x0, y0, radius) {
        let x = radius;
        let y = 0;
        let decisionOver2 = 1 - x;

        while (y <= x) {
            t.plot(x + x0, y + y0);
            t.plot(y + x0, x + y0);
            t.plot(-x + x0, y + y0);
            t.plot(-y + x0, x + y0);
            t.plot(-x + x0, -y + y0);
            t.plot(-y + x0, -x + y0);
            t.plot(x + x0, -y + y0);
            t.plot(y + x0, -x + y0);

            y++;
            if (decisionOver2 <= 0) {
                decisionOver2 += 2 * y + 1;
            } else {
                x--;
                decisionOver2 += 2 * (y - x) + 1;
            }
        }
    }
}
    
onMounted(async() => { await nextTick(); demo() });
onUnmounted(() => t.destroy());
</script>
</ClientOnly>
