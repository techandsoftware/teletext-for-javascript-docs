# TeletextService default page fetcher

The default page fetcher used by the TeletextService class looks for files named `1.json` to `8.json` in the same location as the HTML page running your app.  Each file is a magazine, containing all the pages for that magazine. The magazine corresponds to the hundreds digit of the page number.

An example JSON structure follows for magazine 1. This has two pages. Page 100 has three subpages, but the first one is empty. Page 101 has two subpages with fastext links.

The subpages either supply `outputLines` or `packed` for the teletext data, described below.

```json
{
    "pages": {
        "100": {
            "subpages": [
                null,
                {
                    "outputLines": "....",
                    "encoding": "g0_latin__english"
                },
                {
                    "outputLines": "....",
                    "encoding": "g0_latin__english"
                }
            ]
        },
        "101": {
            "subpages": [
                {
                    "outputLines": "....",
                    "encoding": "g0_latin__english",
                    "fastext": {
                        "red": "199",
                        "green": "150",
                        "yellow": "800",
                        "blue": "200",
                        "index": "100"
                    }
                },
                {
                    "packed": "....",
                    "encoding": "g0_latin__english",
                    "fastext": {
                        "red": "199",
                        "green": "150",
                        "yellow": "800",
                        "blue": "200",
                        "index": "100"
                    }
                }
            ]
        }
    }
}
```

## Top level and `pages` object

The outermost object has a `pages` key.
* `pages` is required. Its value is an object, in which the keys are the page numbers and the values are a `page` object

## `page` object

Has up to two keys:
* `webUrl` key is  optional. A URL corresponding to the page. The `TeletextServiceViewer` uses this in the UI to link to
* `subpages` key is required. Its value is an array of 1 or more `subpage` objects.  Any of the subpages can be `null`

## `subpage` object

Has the following keys:
* `encoding` is the default G0 character set for the subpage.  It's optional. If not present, the character set passed in by `defaultG0Charset` in the `new TeletextService()` call is used.
* `fastext` is optional. If present it can contain keys for `red`, `green`, `yellow`, `blue` and `index`. The values are the page numbers to link to. The numbers are actually strings to allow for 100 to 8FF.
* `outputLines` or `packed` strings are the teletext data. You can supply either of these. One is required.

### `outputLines` format

String. The contents is in the Output Line format used in MRG's .tti files. Each line has the format:

`OL,rowNum,line\n`

In this:

* `rowNum` is between 0 and 24
* `line` is the string to display. Attribute characters (character codes less than 0x20) are represented in three ways: 1) As they are with no translation, or 2) They have 0x80 added to translate them to characters with codes 128-159, or 3) they are replaced by escape (character 0x1b) then the character with 0x40 added.

### `packed` format

String. The contents is a base64-encoded string of 7-bit characters for the 25 rows x 40 characters concatenated together. The encoded string uses the character repertoire defined in the [base64url encoding](https://tools.ietf.org/html/rfc4648#section-5). This format is taken from the edit.tf editor URL hash fragment - see further details here: https://github.com/rawles/edit.tf

An example is in `public/1.json`, or see the URL hash at https://edit.tf (the part after the colon)
