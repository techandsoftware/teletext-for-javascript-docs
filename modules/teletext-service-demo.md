# teletext-service demo

<ClientSideOnly>
  <button onclick="window.open('https://teletext-service.netlify.app', '_blank', 'noopener')"
    style="padding-bottom: 0.5em"
  >
    View in new tab ↗
  </button>
    <div id="screenembed">
        <iframe
           src="https://teletext-service.netlify.app"
           onload="this.focus()"
        ></iframe>
    </div>
</ClientSideOnly>

<style>
#screenembed {
  width: 100%;
  aspect-ratio: 4 / 3;
}

/* landscape view */
@media (max-width: 695px) {
  #screenembed {
    aspect-ratio: 3 / 5;
  }
}

#screenembed iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>

This is a minimal demo of the provided web app using [TeletextServiceViewer](./teletext-service#teletextserviceviewer-class) and the [default page fetcher](teletext-service-page-fetcher), which loads page 100.
