import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'in-out',
    },
  },
  devtools: { enabled: true },

  build: {
    transpile: ['trpc-nuxt'],
  },

  css: ['~/assets/css/main.scss'],

  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/google-fonts',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],

  googleFonts: {
    families: {
      Roboto: true,
    },
  },

  primevue: {
    /* Configuration */
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

  eslint: {
    config: {
      stylistic: {
        // Improves readability on multi line nested functions such as TRPC
        semi: true,
      },
    },
  },

  compatibilityDate: '2024-07-10',
});
