// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    baseURL: "https://bapi.go-pallet.com/",
    public: {
      baseURL: process.env.BASE_URL || 'https://bapi.go-pallet.com/api',
    }
  },
  app:{
    head: {
      title: 'Bayank Test',
      link: [
        { rel: 'icon',type: 'image/x-icon', href: '/bayank_logo.ico', sizes: '32x32' },
      ]
    },
    
  },
  devtools: { enabled: false },
  css: [
    "@/assets/css/main.scss",
    '@mdi/font/css/materialdesignicons.min.css',
    'vuetify/lib/styles/main.sass',
    'animate.css/animate.min.css'
  ],
  build: {
    transpile: ['vuetify'],
  },
  modules: [      
    'nuxt-snackbar',
    '@nuxtjs/i18n',
    '@sidebase/nuxt-auth'
  ],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/variables.scss";',
        },
      },
    },
  },
  auth:{
    enableGlobalAppMiddleware: true,
    basePath:'/api/auth'
  },
  snackbar: {
    bottom: true,
    duration: 5000
  },
  i18n:{
    defaultLocale: 'ar',
    strategy: 'prefix_except_default',
    langDir: "locales",
    locales: [
      {
        code: 'ar',
        name: 'Arabic',
        file: 'ar.json',
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      }
    ],
    detectBrowserLanguage: false,
  }
})
