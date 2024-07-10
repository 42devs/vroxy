import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@primevue/nuxt-module',
  ],

  primevue: {
    /* Configuration */
    options: {
      theme: {
        preset: Aura
      }
    }
  },

  compatibilityDate: '2024-07-10'
})