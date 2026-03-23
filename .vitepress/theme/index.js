import DefaultTheme from 'vitepress/theme'
import DemoLink from '../../components/DemoLink.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DemoLink', DemoLink)
  }
}
