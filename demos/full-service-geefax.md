# Full service demo: Geefax

See: [Geefax](https://geefax.robdev.org.uk/)

This is a web application which uses @techandsoftware/teletext-service and includes page numbers and fastext (colour button) navigation. Content is from the Guardian using their public API. Pages are received over HTTPS in JSON structures. The underlying pages are byte-compatible with teletext, rendered using @techandsoftware/teletext to SVG for a scalable and high-res display.

From Chrome and compatible browsers, pages can also be _cast_ to Chromecast devices and compatible TVs, which uses @techandsoftware/teletext-caster.
