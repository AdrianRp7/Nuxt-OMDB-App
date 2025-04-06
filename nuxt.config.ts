// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  css: ["~/assets/scss/main.scss"],
  runtimeConfig: {
    api_key: "",
    api_base_url: "",
  },
})