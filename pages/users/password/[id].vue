<template>
    <div>
      <v-card>
        <v-card-text class="w-75 mx-auto">
        <div>
          <v-form>
            <h1 class="my-5">{{ $t("update user password") }}</h1>
            <v-row>
              <v-col cols="12" md="12">
                <label> {{ $t("new password") }} </label>
                {{ password }}
                <v-text-field
                  v-model="password"
                  type="password"
                  variant="solo"
                  density="compact"
                  :rules="[(v) => !!v || $t('password is required')]"
                  :error-messages="password_errorMessage"
                />
              </v-col>
              <v-col cols="12" md="12">
                <label> {{ $t("password confirmation") }} </label>
                {{password_confirmation  }}
                <v-text-field
                  v-model="password_confirmation"
                  type="password"
                  variant="solo"
                  density="compact"
                  :rules="[(v) => !!v || $t('password is required')]"
                  :error-messages="passwordConfirmation_errorMessage"
                />
              </v-col>
            </v-row>

          </v-form>
        </div>
      </v-card-text>
      <v-btn :disabled="password !== password_confirmation || !password || !password_confirmation"
      @click="updateFuncation">{{ $t("update password") }}</v-btn>
      </v-card>
    </div>
</template>


<script setup>
import { useRoute, useRouter } from "vue-router";
const { locale, locales } = useI18n();
const localePath = useLocalePath()
const route = useRoute();
const $router = useRouter();
const { t } = useI18n({
  useScope: "local",
});
const snackbar = useSnackbar();

const itemId = computed(() => route.params.id);
const password = ref()
const password_confirmation = ref()
const password_errorMessage = ref("");
const passwordConfirmation_errorMessage = ref("")


const updateFuncation = async () => {
  try {
    const response = await $fetch(`${baseURL()}/dashboard/user/update-password/${itemId.value}`,
  {
    headers: {
      Authorization: `Bearer ${token()}`,
      lang: locale.value,
    },
    method: "PUT",
    body: {
      password: password.value,
      password_confirmation: password_confirmation.value,
    },
  });
  if (response.error == false) {
    snackbar.add({
      type: "success",
      text: response.message,
    });
    $router.push(localePath("/users"))
  }
  }
  catch (e) {
    let errors = e.response._data.errors;
    password_errorMessage.value = errors["password"];
    passwordConfirmation_errorMessage.value = errors["password_confirmation"];
    snackbar.add({
      type: "error",
      text: e.response._data.errors ? e.response._data.errors : e.response._data.message
    });
  }
};


watch([password, password_confirmation], () => {
  password_errorMessage.value = "";
  passwordConfirmation_errorMessage.value = "";
});
</script>