import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Teletext modules for Javascript",
  description: "Docs and demos for @techandsoftware/teletext and related modules",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '@techandsoftware/teletext',
        items: [
          { text: 'Features', link: '/teletext-features' },
          { text: 'Usage', link: '/teletext-usage ' },
          { text: 'Attributes', link: '/teletext-attributes' },
          { text: 'Character sets', link: '/character-sets' },
          { text: 'Screen API', link: '/teletext-screen-api' },
          { text: 'Event API', link: '/teletext-event-api' }
        ],
      },
      {
        text: 'Demos',
        items: [
          { text: 'Demo 1', link: '/teletext-demos' },
          { text: 'Demo 2', link: '/TODO' },
          { text: 'Demo 3', link: '/TODO' },
        ]
      }
    ],


  }
})
