import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  modules: ['@primevue/nuxt-module', "@nuxtjs/google-fonts"],

  googleFonts: {
    families: {
      Roboto: true,
    }
  },

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