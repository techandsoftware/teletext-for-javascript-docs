import { h } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DemoLink from '../../components/DemoLink.vue'
import SimpleAnalyticsBadge from './SimpleAnalyticsBadge.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    const { frontmatter } = useData()
    return h(DefaultTheme.Layout, null, {
      // doc pages: after the prev/next links (moved across under the aside by CSS when shown)
      'doc-after': () => h(SimpleAnalyticsBadge, { variant: 'doc' }),
      // home page has no doc slots, so it goes at the bottom of the layout
      'layout-bottom': () =>
        frontmatter.value.layout === 'home' ? h(SimpleAnalyticsBadge, { variant: 'home' }) : null
    })
  },
  enhanceApp({ app }) {
    app.component('DemoLink', DemoLink)
  }
}
