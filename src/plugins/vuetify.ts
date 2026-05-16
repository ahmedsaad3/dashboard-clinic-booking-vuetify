// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import '../styles/layers.css'
import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: 'ar',
    fallback: 'ar',
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#4CAF50', // Fallback
          secondary: '#2196F3', // Fallback
          accent: '#FF9800', // Fallback
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
        variables: {
          'theme-primary': 'var(--color-primary-500)',
          'theme-secondary': 'var(--color-secondary-500)',
          'theme-accent': 'var(--color-accent-500)',
          'theme-background': 'var(--color-prim-bg)',
          'theme-surface': 'var(--color-prim-bg-surface)',
        },
      },
    },
  },
})


