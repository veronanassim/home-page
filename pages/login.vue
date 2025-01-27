<script setup lang="ts">
import { useReCaptcha } from 'vue-recaptcha-v3';
const recaptchaInstance = useReCaptcha();

const gettoken = async () => {
  await recaptchaInstance.recaptchaLoaded()
  const captchaToken = await recaptchaInstance.executeRecaptcha('submit')
  return captchaToken   
}

const { locale, locales } = useI18n();

definePageMeta({
  layout: "login",
  auth: {        
    unauthenticatedOnly: true,   
    navigateAuthenticatedTo: '/',     
  }
})
const { signIn } = useAuth() 

const snackbar = useSnackbar();

const { t } = useI18n({
    useScope: "local",
})

// login
const username = ref()
const password = ref()

const submit = async () => {
  const token = await gettoken();
    const { error, url } = await signIn('credentials', {
      username: username.value,
      password: password.value,
      redirect: false,
      g_recaptcha_response: token,
      lang: locale.value
    }) 

    if (error) {   
      snackbar.add({
        type: 'error',
        text: t('wrong credentials')
      })
    } else {  
      //console.log(url,'url login')
      return navigateTo(url, { external: true })  
    }
  }



// switch bewteen login/register forms
let layout = ref("login-layout animate__fadeInLeft")
let direction = ref("rtl");




</script>

<template>
  <div :dir="direction">
    <div class="d-flex sign-up">

      <div :class="layout" class="text-center animate__animated" >
        <img src="~/assets/images/logo.png" alt="" class="login-logo">
       
      </div>
      
      <div class="login-form"  >
        <div class="form-centered">
          <h1 class="text-center my-10">{{ $t("Login") }}</h1>
          <v-form @submit.prevent="signIn('credentials')">
            <label>{{ $t("username") }}</label>
            <v-text-field
              v-model="username"
              class="mb-4"
              type="text"
              variant="solo"
              density="compact"
              :rules="[ v => !!v || $t('username is required') ]"
            />
             <label>{{ $t("password") }}</label>
            <v-text-field
              v-model="password"
              type="password"
              variant="solo"
              density="compact"
              :rules="[ v => !!v || $t('password is required') ]"
              @keyup.enter="submit()"
            />
            <p class="text-center">
              <v-btn class="login-btn w-75 my-5 animate__animated animate__fadeInBottomRight" @click="submit()">{{ $t("Login") }}</v-btn>
            </p>
          </v-form>
        </div>
      </div>

    </div>

    <NuxtSnackbar />
  </div>
</template>