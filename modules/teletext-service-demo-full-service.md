# teletext-service demo: Geefax

<ClientSideOnly>
  <button
    onclick="window.open('https://geefax.robdev.org.uk/', '_blank', 'noopener')"
    style="padding-bottom: 0.5em"
  >
    View in new tab ↗
  </button>
    <div class="screen">
        <iframe
           src="https://geefax.robdev.org.uk/"
           onload="this.focus()"
        ></iframe>
    </div>
</ClientSideOnly>

<style>
.screen {
  width: 100%;
  aspect-ratio: 4 / 3;
}

.screen iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>

This is a web application which uses [@techandsoftware/teletext-service](../modules/teletext-service) and includes page numbers and fastext (colour button) navigation. Content is from the Guardian using their public API. Pages are received over HTTPS in JSON structures. The underlying pages are byte-compatible with teletext, rendered using [@techandsoftware/teletext](/teletext-features) to SVG for a scalable and high-res display.

From Chrome and compatible browsers, pages can also be _cast_ to Chromecast devices and TVs with built-in Chromecast functionality, which uses [@techandsoftware/teletext-caster](https://www.npmjs.com/package/@techandsoftware/teletext-caster).

* [Front-end source](https://bitbucket.org/rahardy/geefaxfrontend/src/main/)
* [Back-end source](https://bitbucket.org/rahardy/geefax/src/master/)
