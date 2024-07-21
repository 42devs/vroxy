import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  devtools: { enabled: true },

  build: {
    transpile: ['trpc-nuxt'],
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/google-fonts',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
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
