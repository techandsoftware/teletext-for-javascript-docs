# @techandsoftware/teletext-service

The package represents a teletext service, and is a wrapper for [@techandsoftware/teletext](../teletext-features).  It adds page numbers, subpage and fastext navigation (colour buttons). By default, pages are fetched as JSON over HTTP, but that can be overriden by your own page fetcher. It supports casting pages to Chromecast using [@techandsoftware/teletext-caster](https://www.npmjs.com/package/@techandsoftware/teletext-caster), and higher-resolution mosaic graphics using a pixel-art scaling algorithm via [@techandsoftware/teletext-plugin-smooth-mosaic](https://www.npmjs.com/package/@techandsoftware/teletext-plugin-smooth-mosaic).

This implements the display portion of teletext and wraps it up as a web app.  It's not an emulator as it doesn't decode teletext data transmission over the VBI like a TV or teletext display adapter.

# Demos

* [Minimal demo](./teletext-service-demo)
* [Full service demo](./teletext-service-demo-full-service)

# Usage

```bash
# install dependency
npm install @techandsoftware/teletext-service
```

The module includes two classes and an HTML web application. The `TeletextService` class handles page retrieval and display. The `TeletextServiceViewer`  class is higher level with support for page numbers, subpages and fastext (coloured button links), and is tightly coupled to the provided HTML UI.

## Default user interface

Run `npm run preview` locally which will serve up the default user-interface, provided in [`dist/index.html`](https://github.com/techandsoftware/teletext-service/tree/master/dist/index.html).  You can use this as-is, or fork it. It's tightly coupled to the `TeletextServiceViewer` class.

[See the demo of the default UI](./teletext-service-demo).

## TeletextService class

This is the minimum code needed to use the `TeletextService` class. It instantiates the class, and loads page 100. With the default page loader, this fetches 1.json, with matches a specific schema and contains multiple pages.

```html
<div id="teletextscreen"></div>

<script type="module">
import { TeletextService } from './dist/teletext-service.min.js';

const service = new TeletextService({
    DOMSelector: '#teletextscreen'
});

service.showPage("100");
// Will fetch 1.json and get page 100 from that,
// and display in the HTML <div>
</script>
```

To handle multiple pages, you will need to implement your own page number entry method.  `TeletextServiceViewer` handles this for you.

The required JSON structure for the page data is described below.

See:
* [TeletextService API](./teletext-service-api#teletextservice-constructor)
* [Default page fetcher](./teletext-service-page-fetcher)


## TeletextServiceViewer class

`TeletextServiceViewer` is a web app wrapper around `TeletextService`.  It handles page number entry, subpage nav, fastext button state changes and entry, reveal and mix, with control using the webapp UI or keyboard shortcuts. It's tightly-coupled to the HTML so it's not really an API but it does support some options.  It's most likely you'll use the code as it is or fork it. The class also incorporates [teletext-caster](https://www.npmjs.com/package/@techandsoftware/teletext-caster) so that pages can be viewed on a Chromecast in supporting browsers.

The Javascript code is invoked with:

```html
<div id="teletextscreen"></div>
<script type="module">
  import { TeletextServiceViewer } from './dist/teletext-service.min.js';
  new TeletextServiceViewer();
</script>
```

For the rest of the HTML that's needed, see [`dist/index.html`](https://github.com/techandsoftware/teletext-service/tree/master/dist/index.html) in the repo.

To run locally, clone the project then run `npm install` and `npm run dev` .

Use `scripts/tti2json.js` to generate the JSON files needed as the page data source, or create your own.  The JSON structure needed is documented below in the 'Default page data source' section.

See:
* [TeletextServiceViewer API](./teletext-service-api#teletextserviceviewer-constructor)

## tti2json script

`scripts/tti2json.js` is a utility script written for Node.js, which reads a directory containing multiple `.tti` files and converts to the JSON files and structure used by the default page fetcher.

Requirements: It needs node v16 as it uses ECMAScript modules.

Usage: 
```
node scripts/tti2json.js sourceDirectory targetDirectory
```

`sourceDirectory` is the directory containing the `.tti` files

`targetDirectory` is where to write the generated JSON files. They're named `1.json` to `8.json`, and will overwrite any existing files with the same name.  It defaults to the current directory.

You might need to modify the script to change the regex used for getting the list of `.tti` files. It's in the `go()` function near the bottom.

If you get the error `Error [ERR_REQUIRE_ESM]: Must use import to load ES Module` when you run, then check the node version, as you need v16.

If you're looking where to get the .tti files, then see https://zxnet.co.uk/teletext/emulators/ for some sources from various repositories, such as Teefax.

# Licensing

The project is licensed under GNU Affero General Public License 3 ([AGPL-3.0-only](https://www.gnu.org/licenses/agpl-3.0.en.html)). For commercial support and integration enquiries, contact <techandsoftwareltd@outlook.com>.

Dependencies:
* The fonts in @techandsoftware/teletext-fonts are public domain
* @techandsoftware/teletext-plugin-smooth-mosaic is loaded via cdn.jsdelivr.net, and uses [LGPL-2.1-or-later](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
  * js-hqx uses [LGPL-2.1-or-later](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)

# Credits

* The tokens used by the header were taken from vbit2's header config - https://github.com/peterkvt80/vbit2/
  * Some example headers can be seen in https://github.com/peterkvt80/vbit2/blob/master/example-vbit.conf
* The attribute character encoding used for the header and the page data is taken from the Output Line format in MRG's .tti file spec - https://zxnet.co.uk/teletext/documents/ttiformat.pdf
* The packed page data format is taken from the hash format used by Simon Rawles' online teletext editor - https://github.com/rawles/edit.tf
* Engineering test page in the example 1.json from Ceefax via https://teletextarchive.com/
