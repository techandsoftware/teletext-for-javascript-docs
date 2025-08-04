import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Teletext for JS",
  description: "@techandsoftware/teletext and related packages",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Usage', link: '/teletext-usage' },
      { text: 'API', link: '/teletext-screen-api' },
      { text: 'Demos', link: '/demos/' }
    ],

    sidebar: [
      {
        text: '@techandsoftware/teletext',
        items: [
          { text: 'Features', link: '/teletext-features' },
          { text: 'Usage', link: '/teletext-usage' },
          { text: 'Attributes', link: '/teletext-attributes' },
          { text: 'Character sets', link: '/character-sets' },
          { text: 'Screen API', link: '/teletext-screen-api' },
          { text: 'Event API', link: '/teletext-event-api' }
        ],
      },
      {
        text: 'Demos',
        items: [
          { text: 'Overview', link: '/demos/' },
          { text: 'Base page', link: '/demos/2-base-page' },
          { text: 'Graphics', link: '/demos/3-graphics' },
          { text: 'Character sets', link: '/demos/4-character-sets' },
          { text: 'Full service', link: '/demos/full-service-geefax' },
        ]
      }
    ],


  }
})
