import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Teletext for JS",
  description: "@techandsoftware/teletext and related packages",
  head: [
    [ // fonts are used in the demos
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cousine:wght@700&display=swap'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:wght@700&display=swap'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bitcount+Single&display=swap'
      }
    ],
    ['script', { src: 'https://scripts.simpleanalyticscdn.com/latest.js', async: '' }]
  ],
  cleanUrls: true,
  sitemap: {
    hostname: 'https://teletext-for-javascript-docs.robdev.org.uk'
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'google-cast-launcher'
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Usage', link: '/teletext-usage' },
      { text: 'API', link: '/teletext-screen-api' },
      { text: 'Demos', link: '/demos/' }
    ],
    search: {
      provider: 'algolia',
      options: {
        appId: '4CTDMOKL14',
        // search key is public
        apiKey: '0d35bd6d99b5c4a5c3931d504682c4e8',
        indexName: 'Teletext for Javascript'
      }
    },
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
          { text: 'API playground', link: '/demos/api-playground' },
          { text: 'Animation', link: '/demos/animation' },
          { text: 'Game of Life', link: '/demos/life' }
        ]
      }, {
        text: "More modules",
        items: [
          {
            text: "teletext-service",
            items: [
              { text: 'Overview', link: '/modules/teletext-service' },
              { text: 'API', link: '/modules/teletext-service-api' },
              { text: 'Page fetcher', link: '/modules/teletext-service-page-fetcher' },
              { text: 'Demo - minimal', link: '/modules/teletext-service-demo' },
              { text: 'Demo - full service', link: '/modules/teletext-service-demo-full-service' }
            ]
          },
          { text: 'teletext-caster', link: '/modules/teletext-caster' }
        ]
      }
    ],


  }
})
