<script setup>
import { useRoute, useRouter } from "vue-router";
const localePath = useLocalePath()
const { locale, locales } = useI18n();

const $router = useRouter();
const { t } = useI18n({
  useScope: "local",
});
const snackbar = useSnackbar();
const valid = ref(false)

const username = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref("");

const username_errorMessage = ref("");
const email_errorMessage = ref("");
const password_errorMessage = ref("");
const passwordConfirmation_errorMessage = ref("")


const create = async () => {
  try {
    const response = await  $fetch(`${baseURL()}/dashboard/user`,
      {
        headers:{
          Authorization: `Bearer ${token()}`,
          lang: locale.value
        },
        method: "POST",
        body: {
            username: username.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        },
      }
    );
    if (response.error == false) {
      snackbar.add({
        type: "success",
        text: response.message,
      });
      $router.push(localePath("/users"));

    }
  } catch (e) {
     let errors = e.response._data.errors;
        username_errorMessage.value = errors["username"];
        email_errorMessage.value = errors["email"];
        password_errorMessage.value = errors["password"];
        passwordConfirmation_errorMessage.value = errors["password_confirmation"]
        snackbar.add({
          type: 'error',
          text: e.response._data.errors ? e.response._data.errors : e.response._data.message
        }) 
  }
};

watch([username], () => {
  username_errorMessage.value = '';
});
watch([email], () => {
  email_errorMessage.value = '';
});
watch([password,password_confirmation], () => {
  password_errorMessage.value = '';
  passwordConfirmation_errorMessage.value = '';
});

onMounted(async () => {  });
</script>

<template>
  <div>
    <v-card>
      <v-card-text class="w-75 mx-auto">
        <div>
          <v-form v-model="valid">
            <h1 class="my-5">{{ $t("user data") }}</h1>
            <v-row>
              <v-col cols="12" md="12">
                <label class="text-right">
                  {{
                    $t("username")
                  }}</label
                >
                <v-text-field
                  v-model="username"
                  type="text"
                  density="compact"
                  :rules="[(v) => !!v || $t('username is required')]"
                  :error-messages="username_errorMessage"
                />
              </v-col>
              <v-col cols="12" md="12">
                <label> {{ $t("E-mail") }} </label>
                <v-text-field
                  v-model="email"
                  type="email"
                  density="compact"
                  :rules="[(v) => !!v || $t('Email is required')]"
                  :error-messages="email_errorMessage"
                />
              </v-col>
              <v-col cols="12" md="12">
                <label> {{ $t("password") }} </label>
                <v-text-field
                  v-model="password"
                  type="password"
                  density="compact"
                  :rules="[(v) => !!v || $t('password is required')]"
                  :error-messages="password_errorMessage"
                />
              </v-col>
              <v-col cols="12" md="12">
                <label> {{ $t("password confirmation") }} </label>
                <v-text-field
                  v-model="password_confirmation"
                  type="password"
                  density="compact"
                  :rules="[(v) => !!v || $t('password is required')]"
                  :error-messages="password_errorMessage"
                />
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-card-text>
        <v-btn
          @click="create"
          :disabled="!valid"
          >{{ $t("create user") }}</v-btn
        >
    </v-card>
     <NuxtSnackbar />
  </div>
</template>

<style lang="scss">
.v-menu > .v-overlay__content > .v-card,
.v-menu > .v-overlay__content > .v-sheet,
.v-menu > .v-overlay__content > .v-list {
  border: 2px solid;
  border-image-source: linear-gradient(
    180deg,
    #aebe48 0%,
    #7eb04e 51.35%,
    #41a358 100%
  );
  border-image-slice: 1;
}
</style>
