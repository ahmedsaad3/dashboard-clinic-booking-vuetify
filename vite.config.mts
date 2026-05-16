import UnoCSS from 'unocss/vite';
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import Fonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: 'src/pages',
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),
    Vue({
      template: { transformAssetUrls },
    }), // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Components({
      dirs: ['src/components'],
      dts: true,
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        'pinia',
        VueRouterAutoImports,
        {
          // add any other imports here
        },
      ],
      dts: true,
      vueTemplate: true,
    }),
    Fonts({
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
    }),
    UnoCSS()
  ],

  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '@core': fileURLToPath(new URL('src/@core', import.meta.url)),
      '@layouts': fileURLToPath(new URL('src/@layouts', import.meta.url)),
      '@images': fileURLToPath(new URL('src/assets/images', import.meta.url)),
      '@styles': fileURLToPath(new URL('src/styles', import.meta.url)),
      '@configured-variables': fileURLToPath(new URL('src/styles/variables/_vuetify.scss', import.meta.url)),
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