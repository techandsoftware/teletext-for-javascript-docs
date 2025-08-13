# Demo: Character sets

## G0 and G2

This shows each G0 character set, with character range from 0x20 to 0x7f. Select a set from the drop-down menu, which sets the default G0 set for the whole screen.  Note that ASCII isn't available, although g0_latin is close. The demo is using [`setDefaultG0Charset()`](../teletext-screen-api#setdefaultg0charset-charset-withupdate) to switch sets.  The method also sets the corresponding G2 set, which requires level 1.5. The G2 characters are drawn on top of the base page as enhancements. The methods used are [`setLevel()`](../teletext-screen-api#setlevel-level) to set level 1.5, with [`pos()`](../teletext-screen-api#pos-col-row) and [`putG2()`](../teletext-screen-api#putg2-char) for each character.

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
</ClientOnly>

## G3

The G3 set requires level 2.5. Like G2, characters are placed using enhancements, with the [`putG3()`](../teletext-screen-api#putg3-char) method.  The [Unscii](http://viznut.fi/unscii/) font is used to render the G3 characters, which are mapped to characters in Unicode's Symbols for Legacy Computing block.

<ClientOnly>
<div id="screen2"></div>
</ClientOnly>


<script setup>
import { runDemoInVitepress } from './runDemoCodeHelper.js';
import { Attributes, Colour, Level, Teletext } from '@techandsoftware/teletext';

const DEFAULT_DEMO_G0_SET = 'g0_latin__english';

runDemoInVitepress(() => {

    // G0 and G2
    document.querySelector('#g0setselector').onchange = g0setselected;
    const t = Teletext();
    // level 1.5 is required to draw enhancements
    t.setLevel(Level[1.5]);
    t.addTo('#screen');

    drawG0Set(t);
    drawG2Set(t);

    updateSet(t, DEFAULT_DEMO_G0_SET);
    
    function g0setselected(e) {
        const set = e.target.value;
        updateSet(t, set);
    }

    // G3
    const t2 = Teletext();
    t2.setLevel(Level[2.5]);
    t2.addTo('#screen2');

    drawG3Set(t2);

    return () => { // cleanup after unmount in vitepress
        t.destroy();
        t2.destroy();
    }
});

function updateSet(t, set) {
    const setNames = getSetNames(set);
    t.setDefaultG0Charset(set, false);
    t.setRow(2, ' \x03G0 set:\x06' + setNames.g0SetName);
    t.setRow(14, ' \x03G2 set:\x06' + setNames.g2SetName);

}

function drawG0Set(t) {
    t.setRow(3, '  Placed on base page');
    t.setRow(5, '\x02    0 1 2 3 4 5 6 7 8 9 a b c d e f', false);

    let charCode = 0x20;
    let chars;
    for (let r = 0; r < 6; r++) {
        chars = '  \x02' + (r+2) + '\x07';
        for (let c = 0; c < 16; c++) {
            chars += String.fromCharCode(charCode) + ' ';
            charCode++;
        }
        t.setRow(r + 7, chars, false);
    }
}

function drawG2Set(t) {
    t.setRow(15, '  Placed using level 1.5 enhancements');

    for (let r = 0; r < 6; r++) {
        t.setRow(r + 17, '  \x02' + (r+2) + '\x07', false);
    }

    // draw G2 using enhancements on base page
    const e = t.enhance();
    let charCode = 0x20;
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 16; c++) {
            const char = String.fromCharCode(charCode);
            e.pos((c * 2) + 5, r + 17).putG2(char);
            charCode++;
        }
    }
    e.end();
}

function drawG3Set(t) {
    t.setRow(1, ' \x03Teletext G3 Character Set');
    t.setRow(3, '  Smooth mosaics and line drawing');
    t.setRow(4, '  Placed using level 2.5 enhancements');
    t.setRow(6, '\x02    0 1 2 3 4 5 6 7 8 9 a b c d e f', false);

    for (let r = 0; r < 6; r++) {
        t.setRow(r * 2 + 8, '  \x02' + (r+2) + '\x07', false);
    }

    // draw G2 using enhancements on base page
    const e = t.enhance();
    let charCode = 0x20;
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 16; c++) {
            const char = String.fromCharCode(charCode);
            e.pos((c * 2) + 5, r * 2 + 8).putG3(char);
            charCode++;
        }
    }
    e.end();
}

function getSetNames(charset) {
    const g0SetName = charset.replace(/_/g, ' ');

    let g2SetName = charset.replace(/^g0_(.+?)(?:$|_.+)/, "g2 $1");
    if (g2SetName == 'g2 hebrew') g2SetName = 'g2 arabic';

    return {
        g0SetName,
        g2SetName
    };
}
</script>
