# Full service demo: Geefax

**[Geefax](https://geefax.robdev.org.uk/)**

This is a web application which uses [@techandsoftware/teletext-service](https://www.npmjs.com/package/@techandsoftware/teletext-service) and includes page numbers and fastext (colour button) navigation. Content is from the Guardian using their public API. Pages are received over HTTPS in JSON structures. The underlying pages are byte-compatible with teletext, rendered using [@techandsoftware/teletext](/teletext-features) to SVG for a scalable and high-res display.

From Chrome and compatible browsers, pages can also be _cast_ to Chromecast devices and compatible TVs, which uses [@techandsoftware/teletext-caster](https://www.npmjs.com/package/@techandsoftware/teletext-caster).

* [Front-end source](https://bitbucket.org/rahardy/geefaxfrontend/src/main/)
* [Back-end source](https://bitbucket.org/rahardy/geefax/src/master/)
