<template>
    <div>
      <v-card>
        <v-card-text class="w-75 mx-auto">
        <div>
          <v-form>
            <h1 class="my-5">{{ $t("user data") }}</h1>
            <v-row>
              <v-col cols="12" md="12">
                <label class="text-right"> {{ $t("username") }}</label>
                <v-text-field
                  v-model="username"
                  type="text"
                  variant="solo"
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
                  variant="solo"
                  density="compact"
                  :rules="[(v) => !!v || $t('Email is required')]"
                  :error-messages="email_errorMessage"
                />
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-card-text>
      <v-btn @click="updateFuncation">{{ $t("update") }}</v-btn>
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

const allData = ref();
const itemId = computed(() => route.params.id);
const username = ref();
const email = ref();
const username_errorMessage = ref("");
const email_errorMessage = ref("");

defineExpose({
  itemId,
  username,
  email,
});


async function getDataFunction() {
  const {data} = await $fetch(`${baseURL()}/dashboard/user/${itemId.value}`,
  {
    headers: {
      Authorization: `Bearer ${token()}`,
      lang: locale.value,
    },
    method: "GET",
  });
  allData.value = data;
  username.value = data.username;
  email.value = data.email;
}

const updateFuncation = async () => {
  try {
    const response = await $fetch(`${baseURL()}/dashboard/user/${itemId.value}`,
  {
    headers: {
      Authorization: `Bearer ${token()}`,
      lang: locale.value
    },
    method: "PUT",
    body: {
      username: username.value,
      email: email.value,
    },
  });
  if (response.error == false) {
    snackbar.add({
      type: "success",
      text: response.message,
    });
    $router.push(localePath("/users"));
  }
  }
  catch (e) {
    let errors = e.response._data.errors;
    username_errorMessage.value = errors["username"];
    email_errorMessage.value = errors["email"];
    snackbar.add({
      type: "error",
      text: e.response._data.errors ? e.response._data.errors : e.response._data.message,
    });
  }
};

watch([username], () => {
  username_errorMessage.value = "";
});
watch([email], () => {
  email_errorMessage.value = "";
});


onMounted(async () => {
  getDataFunction();
})
</script>