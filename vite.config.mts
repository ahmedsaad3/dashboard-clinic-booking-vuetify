import UnoCSS from 'unocss/vite';
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import Fonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Vue({
    template: { transformAssetUrls },
  }), // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
  Vuetify({
    autoImport: true,
    styles: {
      configFile: 'src/styles/settings.scss',
    },
  }), Fonts({
    google: {
      families: [
        {
          name: 'DM Sans',
          styles: 'ital,wght@0,400;0,500;0,700;1,400',
        },
        {
          name: 'Alexandria',
          styles: 'wght@300;400;500;700',
        },
        {
          name: 'JetBrains Mono',
          styles: 'wght@400;700',
        },

      ],
    },
  }), UnoCSS()],

  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})