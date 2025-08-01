# Using @techandsoftware/teletext

## For browsers


### Quickstart - using a CDN

This needs no tooling.

```html
<div id="teletextscreen"></div>

<script type="module">
  import { Teletext } from 'https://cdn.jsdelivr.net/npm/@techandsoftware/teletext@latest/dist/teletext.min.js';

  const teletext = Teletext();
  teletext.addTo('#teletextscreen');
  teletext.setRow(0, 'Hello world!');
</script>
```

### Using npm

1. Install dependency: `npm install @techandsoftware/teletext`

2. In your HTML, include the following to import as an ES6 module:

```html
<div id="teletextscreen"></div>

<script type="module">
  import { Teletext } from './node_modules/@techandsoftware/teletext/dist/teletext.min.js';

  // Or, use this if you have tooling like vite:
  // import { Teletext } from '@techandsoftware/teletext';

  const teletext = Teletext();
  teletext.addTo('#teletextscreen');
  teletext.setRow(0, 'Hello world!');
</script>
```

This creates an SVG object in the #teletextscreen div which contains the teletext display.

## For nodejs

Your code needs to pass in a document object model window to the `Teletext()` function.

1. Install dependencies: `npm install @techandsoftware/teletext jsdom`

2. Example ES6 code (requires node >= 16)

```javascript
import { Teletext } from '@techandsoftware/teletext';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<div id="teletextscreen"></div>');

const teletext = Teletext({
    dom: dom.window
});
teletext.addTo('#teletextscreen');
teletext.setRow(0, 'Hello from node');

const svg = dom.window.document.querySelector('#teletextscreen').innerHTML;
```

## Drawing text

See also: [base page demo](/demos/2-base-page)

```javascript
teletext.setRow(0, 'This is text using the default attributes');
teletext.setRow(1, Attributes.charFromTextColour(Colour.GREEN) + 'Green text using an attribute.')
```

See:
* [Attributes](/teletext-attributes)
* [Write rows to the base page](/teletext-screen-api#write-rows-to-the-base-page)
* [Write bytes to the base page](/teletext-screen-api#write-bytes-to-the-base-page)

## Drawing graphics

See also: [graphics demo](/demos/3-graphics)

```javascript
// Draw block mosaic characters in magenta. Codes are for the G1 set
// Each character has 6 pixels
teletext.setRow(0),  Attributes.charFromGraphicColour(Colour.MAGENTA) + '\x66\x39';

// Plot an individual pixel
teletext.plot(7, 1);
teletext.updateDisplay();
```

See:
* [Attributes](/teletext-attributes)
* [Write rows to the base page](/teletext-screen-api#write-rows-to-the-base-page)
* [Write bytes to the base page](/teletext-screen-api#write-bytes-to-the-base-page)
* [Plot pixel graphics](/teletext-screen-api#plot-pixel-graphics)
