# Using @techandsoftware/teletext

## For browsers

Quickstart:

```html
<div id="teletextscreen"></div>

<script type="module">
  import { Teletext } from 'https://cdn.jsdelivr.net/npm/@techandsoftware/teletext@latest/dist/teletext.min.js';

  const teletext = Teletext();
  teletext.addTo('#teletextscreen');
  teletext.setRow(0, 'Hello world!');
</script>
```

If you want to use npm to install instead of jsdelivr:

1. Install dependency:

`npm install @techandsoftware/teletext`

2. In your HTML, include the following to use an an ES6 module:

```html
<div id="teletextscreen"></div>

<script type="module">
  import { Teletext } from './node_modules/@techandsoftware/teletext/dist/teletext.min.js';

  // Or if you import the npm module directly, use the following import instead of the one above.
  // (You will also need tooling to resolve the module for the browser, like vite.)
  // import { Teletext } from '@techandsoftware/teletext';

  const teletext = Teletext();
  teletext.addTo('#teletextscreen');
  teletext.setRow(0, 'Hello world!');
</script>
```

This creates an SVG object in the #teletextscreen div which contains the teletext display.

## For nodejs

Your code needs to pass in a document object model window to the `Teletext()` function.

1. Install dependencies:

`npm install @techandsoftware/teletext jsdom`

2. Example code if using ECMAScript modules (requires node >= 16)

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

## Drawing graphics
