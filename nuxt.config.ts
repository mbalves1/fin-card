// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    // ...
    ['@pinia/nuxt',
      {
        autoImportsimport: ['defineStore']
      }
    ],
    '@nuxtjs/google-fonts',
    '@unocss/nuxt',
    '@vueuse/nuxt'
  ],
  imports: {
    dirs: [
      'store',
      'composables',
      'composables/*/index.{ts,js,mjs,mts}'
    ],
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  build: {
    transpile: ['vuetify', 'chart.js', '@vuepic/vue-datepicker'],
  },
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    'vuetify/dist/vuetify.css',
    'vuetify/lib/styles/main.sass',
    '@vuepic/vue-datepicker/dist/main.css',
    '~/assets/style.scss',
    '~/assets/table.scss',
    '~/assets/scrollbar.scss'
  ],
})
