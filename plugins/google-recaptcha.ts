import { VueReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', async () => {
    const { data } = await $fetch(`${baseURL()}/setting`);
    const siteKey = data.find((element) => element.key === 'site_key')?.value;

    nuxtApp.vueApp.use(VueReCaptcha, {
      siteKey,
      loaderOptions: {
        explicitRenderParameters: {
          badge: 'bottomleft',
        },
      },
    });
  });
});