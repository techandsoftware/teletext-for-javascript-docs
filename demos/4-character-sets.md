# Demo: Character sets

This shows each G0 character set, with character range from 0x20 to 0x7f. Select a set from the drop-down menu, which sets the default G0 set for the whole screen.  Note that ASCII isn't available, although g0_latin is close. The demo is using [`setDefaultG0Charset()`](../teletext-screen-api#setdefaultg0charset-charset-withupdate).

<label for="g0setselector">G0 set selection</label><br>
<select style="margin-bottom: 1rem;" id="g0setselector" on>
    <option>g0_latin</option>
    <option>g0_latin__czech_slovak</option>
    <option selected>g0_latin__english</option>
    <option>g0_latin__estonian</option>
    <option>g0_latin__french</option>
    <option>g0_latin__german</option>
    <option>g0_latin__italian</option>
    <option>g0_latin__latvian_lithuanian</option>
    <option>g0_latin__polish</option>
    <option>g0_latin__portuguese_spanish</option>
    <option>g0_latin__romanian</option>
    <option>g0_latin__serbian_croatian_slovenian</option>
    <option>g0_latin__swedish_finnish_hungarian</option>
    <option>g0_latin__turkish</option>
    <option>g0_greek</option>
    <option>g0_cyrillic__russian_bulgarian</option>
    <option>g0_cyrillic__serbian_croatian</option>
    <option>g0_cyrillic__ukranian</option>
    <option>g0_arabic</option>
    <option>g0_hebrew</option>
</select>


<ClientOnly>

<div id="screen"></div>

<script setup>
import { runDemoInVitepress } from './runDemoCodeHelper.js';
import { Attributes, Colour, Teletext } from '@techandsoftware/teletext';

const DEFAULT_DEMO_G0_SET = 'g0_latin__english';

runDemoInVitepress(() => {

    document.querySelector('#g0setselector').onchange = g0setselected;
    const t = Teletext();
    t.addTo('#screen');
    t.setDefaultG0Charset(DEFAULT_DEMO_G0_SET);

    t.setRow(1, '    \x03Teletext G0 set demo', false);
    t.setRow(6, '\x02    0 1 2 3 4 5 6 7 8 9 a b c d e f', false);

    let charCode = 0x20;
    let chars;
    for (let r = 0; r < 6; r++) {
        chars = '  \x02' + (r+2) + '\x07';
        for (let c = 0; c < 16; c++) {
            chars += String.fromCharCode(charCode) + ' ';
            charCode++;
        }
        t.setRow(r + 8, chars, false);
    }

    updateSet(DEFAULT_DEMO_G0_SET);

    function updateSet(set) {
        t.setDefaultG0Charset(set);
        t.setRow(3, '     Set: ' + convertCharSetName(set));
    }

    function g0setselected(e) {
        const set = e.target.value;
        updateSet(set);
    }

    return () => t.destroy(); // cleanup after unmount in vitepress
});

function convertCharSetName(charset) {
    return charset.replace(/_/g, ' ');
}
</script>
</ClientOnly>
