import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["snackbar"]?: typeof import("nuxt-snackbar").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["i18n"]?: typeof import("@nuxtjs/i18n").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["auth"]?: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["nuxt-snackbar", Exclude<NuxtConfig["snackbar"], boolean>] | ["@nuxtjs/i18n", Exclude<NuxtConfig["i18n"], boolean>] | ["@sidebase/nuxt-auth", Exclude<NuxtConfig["auth"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   baseURL: string,

   snackbar: {
      top: boolean,

      bottom: boolean,

      left: boolean,

      right: boolean,

      groups: boolean,

      success: string,

      error: string,

      warning: string,

      info: string,

      duration: number,

      messageClass: string,

      zIndex: number,

      dense: boolean,

      shadow: boolean,

      reverse: boolean,

      border: string,

      backgroundOpacity: number,

      backgroundColor: string,

      baseBackgroundColor: string,
   },

   auth: {
      isEnabled: boolean,

      origin: any,

      basePath: string,

      trustHost: boolean,

      enableSessionRefreshPeriodically: boolean,

      enableSessionRefreshOnWindowFocus: boolean,

      enableGlobalAppMiddleware: boolean,

      defaultProvider: any,

      addDefaultCallbackUrl: boolean,

      globalMiddlewareOptions: {
         allow404WithoutAuth: boolean,

         addDefaultCallbackUrl: boolean,
      },

      isOriginSet: boolean,
   },
  }
  interface PublicRuntimeConfig {
   baseURL: string,

   snackbar: {
      top: boolean,

      bottom: boolean,

      left: boolean,

      right: boolean,

      groups: boolean,

      success: string,

      error: string,

      warning: string,

      info: string,

      duration: number,

      messageClass: string,

      zIndex: number,

      dense: boolean,

      shadow: boolean,

      reverse: boolean,

      border: string,

      backgroundOpacity: number,

      backgroundColor: string,

      baseBackgroundColor: string,
   },

   i18n: {
      experimental: {
         jsTsFormatResource: boolean,
      },

      baseUrl: string,
   },

   auth: {
      isEnabled: boolean,

      origin: any,

      basePath: string,

      trustHost: boolean,

      enableSessionRefreshPeriodically: boolean,

      enableSessionRefreshOnWindowFocus: boolean,

      enableGlobalAppMiddleware: boolean,

      defaultProvider: any,

      addDefaultCallbackUrl: boolean,

      globalMiddlewareOptions: {
         allow404WithoutAuth: boolean,

         addDefaultCallbackUrl: boolean,
      },
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }