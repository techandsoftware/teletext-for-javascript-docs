# @techandsoftware/teletext-service API

## TeletextService class

### TeletextService constructor

```javascript
new TeletextService(options)
```

Creates a teletext service instance. `options` is required, and has the following properties:

```
{
    DOMSelector: string,
    defaultG0Charset?: string,
    caster?: object,
    header?: string,
    fetcher?: object,
    baseURL?: string
}
```

* `DOMSelector` is required, and is a selector string for the teletext screen container, e.g. `#teletextscreen`
* `defaultG0Charset` sets the default G0 character set on the teletext instance. If not passed in, the default character set is `g0_latin`. See [`setDefaultG0Charset()`](../teletext-screen-api#setdefaultg0charset-charset-withupdate) in [@techandsoftware/teletext](../teletext-usage) for the available values
* `caster` - pass in a `ttxcaster` from [@techandsoftware/teletext-caster](./teletext-caster) and this will be used to show pages on the connected Chromecast
* `header` is the string to use as the header row. If not passed in, a default header row is used. See below for tokens that can be used in the header.
* `fetcher` - pass in an object used to fetch teletext pages. If this is not passed in, then pages are expected to be in JSON and retrieved from same directory of the web page containing the teletext instance.  See the 'Default page data source' section on the expected data format for the default fetcher. See the 'fetcher object' section below for details on passing in your own fetcher.
* `baseURL` - if you use the default fetcher, then you can pass in a URL to use as the base URL for getting JSON content. The default base URL is the current directory of the URL running the javascript code.  The URL should include a trailing `/`

#### `header` format

The `header` string is 32 characters and can contain the following tokens:

| Token | Used for    | Length                      |
|-------| ------------|-----------------------------|
| `%%#` | Page number | 3 characters                |
| `%%a` | Day         | 3 characters                |
| `%%b` | Month       | 3 characters                |
| `%d`  | Date        | 2 digits with leading 0     |
| `%e`  | Date        | 2 digits with leading space |
| `%m`  | Month       | 2 digits with leading space |
| `%y`  | Year        | 2 digits                    |
| `%H`  | Hour        | 2 digits with leading 0     |
| `%M`  | Minutes     | 2 digits with leading 0     |
| `%S`  | Seconds     | 2 digits with leading 0     |

Teletext character attributes (control codes) can also be used. They can be represented in three ways:  1) As they are with no translation, or 2) They have 0x80 added to translate them to characters with codes 128-159, or 3) they are replaced by escape (character 0x1b) then the character with 0x40 added.  This is taken from MRG's .tti Output Line format.

#### `fetcher` object

You can supply your own object which fetches pages to override the default fetcher.  The interface it needs to implement is:

```javascript
{
    async function fetchPage(pageNumber)
    // pageNumber is a 3 character string, values 100 to 8FF
}
```

`fetchPage` returns a promise. The promise resolves to a `page` object or `null` if the page couldn't be fetched for any reason.  The `page` object is described below in the 'Default page data source' section.

### service.showPage(pageNumber)

Shows the page with the number. The page number must be three characters, from 100 to 8FF.

If using the default fetcher, this will get the magazine JSON containing the page, and get the page data from that. The magazine filenames are derived from the page number, and named `1.json` to `8.json`. For example, page 100 will cause `1.json` to be fetched and page 100 used from that. The first non-null subpage in the page data is displayed.

Response is a promise. When resolved, the value is:
* `null` - if the page couldn't be retrieved for any reason. This could be because the page number is invalid, or the magazine JSON couldn't be retrieved, or the page isn't in the JSON, or the page has no subpages.
* `meta`: object with the following properties:

  * `pageNumber`: string - the current page number (100 to 8FF)
  * `subPage`: number - the current subpage number
  * `numSubPages`: number - how many subpages in total for the page
  * `fastext`: object - if the current page has fastext (coloured) links, the object will have corresponding properties. The property names are `red`, `green`, `yellow`, `blue` and `index`. The values for each are the linked page numbers
  * `webUrl`: string - the `webUrl` property from the current page JSON if any. It's not part of teletext, but could be used to link to the original content source if there is one
  * `image`: string - the `image` property from the current page JSON if any. It's not part of teletext, but could be used for meta tags or semantic markup

### service.nextSubPage()

Shows the next subpage for the current page. If there's only one subpage there's no change.

The response is the `meta` object - see the `showPage()` response.

### service.previousSubPage()

Shows the previous subpage for the current page. If there's only one subpage there's no change.

The response is the `meta` object - see the `showPage()` response.

### service.showLink(link)

Shows the page with the link on the current page. These are used for the colour buttons on a remote, or fastext buttons. The link is a string with the value `red`, `green`, `yellow`, `blue` or `index`. (The teletext spec calls this editorial linking, using packet X/27).

Response is a promise, and is the same as for `showPage()`.

If the page doesn't have the link, the promise resolves to `null`.

### service.teletextInstance property

Returns the teletext instance object (an instance of `@techandsoftware/teletext`), so you can call methods on this directly, for example to change the font, draw pages or any other API calls you need direct access to.  [View the teletext instance API](../teletext-screen-api).


## TeletextServiceViewer class

### TeletextServiceViewer constructor

```javascript
new TeletextServiceViewer(options)
```

Creates a teletext service viewer instance. `options` is optional and has the following properties:
```
{
    DOMSelector?: string,
    defaultG0Charset?: string,
    header?: string
    frontPage?: string | null,
    smoothMosaics?: boolean,
    baseURL?: string,
    fontList? : array
    serviceName? : string
}
```

* `DOMSelector` is a selector string for the teletext screen container. Default is `#teletextscreen`
* `defaultG0Charset` sets the default G0 character set on the teletext instance. Defaults to `g0_latin__english`. See [`setDefaultG0Charset()`](../teletext-screen-api#setdefaultg0charset-charset-withupdate) in [@techandsoftware/teletext](../teletext-usage) for the available values
* `header` is the header row to replace the default header row. See the "`header` format" section above for the format
* `frontPage` is the front page number, which will be shown automatically. Defaults to page 100.  Pass in null to not show the front page automatically
* `smoothMosaics` - if true will use a pixel-art scaling algorithm to generate smoother mosaic graphics when the service starts. Default is false
* `baseURL` - URL to use as the base URL for getting JSON content. The default base URL is the current directory of the URL running the javascript code.  The URL should include a trailing `/`
* `fontList` - an array of CSS font families. The teletext screen will used the first one automatically. The others are selected if 'f' is pressed. If not specified the default list is used - see FONTS in `ServiceView.js` in the repo
* `serviceName` - the teletext service name, used in the page title and meta tags. Default is 'FAXFAX'

