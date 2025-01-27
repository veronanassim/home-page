import locale_ar from "../locales/ar.json" assert { type: "json" };
import locale_en from "../locales/en.json" assert { type: "json" };
export const localeCodes = ["ar","en"]

export const localeMessages = {
  "ar": [{ key: "../locales/ar.json", load: () => Promise.resolve(locale_ar) }],
  "en": [{ key: "../locales/en.json", load: () => Promise.resolve(locale_en) }],
}

export const resolveNuxtI18nOptions = async (context) => {
  const nuxtI18nOptions = Object({})
  nuxtI18nOptions.experimental = Object({"jsTsFormatResource":false})
  nuxtI18nOptions.compilation = Object({"jit":true,"strictMessage":true,"escapeHtml":false})
 const vueI18nConfigLoader = async (loader) => {
            const config = await loader().then(r => r.default || r)
            return typeof config === 'object'
              ? config
              : typeof config === 'function'
                ? await config()
                : {}
          }
  nuxtI18nOptions.vueI18n = Object({})
  nuxtI18nOptions.vueI18n.messages ??= {}
  nuxtI18nOptions.locales = [Object({"code":"ar","name":"Arabic","file":"ar.json","hash":"4d9419fb","type":"static"}),Object({"code":"en","name":"English","file":"en.json","hash":"abc352f6","type":"static"})]
  nuxtI18nOptions.defaultLocale = "ar"
  nuxtI18nOptions.defaultDirection = "ltr"
  nuxtI18nOptions.routesNameSeparator = "___"
  nuxtI18nOptions.trailingSlash = false
  nuxtI18nOptions.defaultLocaleRouteNameSuffix = "default"
  nuxtI18nOptions.strategy = "prefix_except_default"
  nuxtI18nOptions.lazy = false
  nuxtI18nOptions.langDir = "locales"
  nuxtI18nOptions.rootRedirect = null
  nuxtI18nOptions.detectBrowserLanguage = false
  nuxtI18nOptions.differentDomains = false
  nuxtI18nOptions.baseUrl = ""
  nuxtI18nOptions.dynamicRouteParams = false
  nuxtI18nOptions.customRoutes = "page"
  nuxtI18nOptions.pages = Object({})
  nuxtI18nOptions.skipSettingLocaleOnNavigate = false
  nuxtI18nOptions.types = "composition"
  nuxtI18nOptions.debug = false
  return nuxtI18nOptions
}

export const nuxtI18nOptionsDefault = Object({experimental: Object({"jsTsFormatResource":false}),compilation: Object({"jit":true,"strictMessage":true,"escapeHtml":false}),vueI18n: "",locales: [],defaultLocale: "",defaultDirection: "ltr",routesNameSeparator: "___",trailingSlash: false,defaultLocaleRouteNameSuffix: "default",strategy: "prefix_except_default",lazy: false,langDir: null,rootRedirect: null,detectBrowserLanguage: Object({"alwaysRedirect":false,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"","redirectOn":"root","useCookie":true}),differentDomains: false,baseUrl: "",dynamicRouteParams: false,customRoutes: "page",pages: Object({}),skipSettingLocaleOnNavigate: false,types: "composition",debug: false})

export const nuxtI18nInternalOptions = Object({__normalizedLocales: [Object({"code":"ar","name":"Arabic","file":"ar.json","hash":"4d9419fb","type":"static"}),Object({"code":"en","name":"English","file":"en.json","hash":"abc352f6","type":"static"})]})
export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const isSSG = false
