// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import '../styles/layers.css'
import 'vuetify/styles'

// Deep Teal Medical Palette — WCAG AA compliant
export default createVuetify({
  locale: {
    locale: 'ar',
    fallback: 'ar',
  },
  defaults: {
    // Global component defaults for consistency
    VBtn: {
      rounded: 'lg',
      elevation: 0,
    },
    VCard: {
      rounded: 'xl',
      elevation: 0,
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },
    VTextarea: {
      variant: 'outlined',
      color: 'primary',
    },
    VChip: {
      rounded: 'lg',
    },
    VAlert: {
      rounded: 'xl',
    },
    VSnackbar: {
      rounded: 'lg',
      location: 'bottom end',
      timeout: 3000,
    },
  },
  theme: {
    defaultTheme: 'clinicLight',
    themes: {
      clinicLight: {
        dark: false,
        colors: {
          // Primary: Deep Teal (oklch(0.52 0.130 195) → #007B8A approx)
          primary:    '#0D7E8F',
          'primary-lighten-1': '#2A9BAD',
          'primary-darken-1': '#086573',

          // Secondary: Warm Slate (oklch(0.52 0.048 250) → #5A6A82 approx)
          secondary:  '#546E7A',
          'secondary-lighten-1': '#78909C',
          'secondary-darken-1': '#37474F',

          // Accent: Amber Gold (oklch(0.68 0.165 80) → #B8860B approx)
          accent:     '#C07D00',
          'accent-lighten-1': '#D4A017',
          'accent-darken-1': '#9A6400',

          // Status
          error:    '#C62828',
          warning:  '#E65100',
          success:  '#2E7D32',
          info:     '#1565C0',

          // Surface
          background: '#F5F7F8',
          surface:    '#FFFFFF',
          'surface-variant': '#EEF2F4',
          'on-surface-variant': '#455A64',

          // On-colors (text on colored backgrounds)
          'on-primary':   '#FFFFFF',
          'on-secondary': '#FFFFFF',
          'on-accent':    '#1A0F00',
          'on-error':     '#FFFFFF',
          'on-warning':   '#FFFFFF',
          'on-success':   '#FFFFFF',
          'on-info':      '#FFFFFF',
        },
        variables: {
          // Map CSS vars to Vuetify theme system
          'border-color': '#D0D8DD',
          'border-opacity': 1,
          'medium-emphasis-opacity': 0.72,
          'high-emphasis-opacity': 0.87,
          'disabled-opacity': 0.38,
          'hover-opacity': 0.06,
          'focus-opacity': 0.12,
          'selected-opacity': 0.10,
          'activated-opacity': 0.10,
          'pressed-opacity': 0.14,
          'dragged-opacity': 0.08,

          // Elevation — use CSS var shadows
          'shadow-key-umbra-opacity': 0.06,
          'shadow-key-penumbra-opacity': 0.04,
          'shadow-ambient-shadow-opacity': 0.03,
        },
      },
    },
  },
})
