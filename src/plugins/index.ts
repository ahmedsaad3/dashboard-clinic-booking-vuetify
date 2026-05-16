import router from './router'
import i18n from './i18n'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'

// Plugins
import vuetify from './vuetify'

export function registerPlugins (app: App) {
  app.use(vuetify)
  app.use(createPinia())
  app.use(i18n)
  app.use(router)
  app.use(VueApexCharts)
}