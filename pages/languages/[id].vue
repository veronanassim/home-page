<script setup>
import { useRoute, useRouter } from "vue-router";
const localePath = useLocalePath()
const route = useRoute();
const { locale, locales } = useI18n();

const $router = useRouter();
const { t } = useI18n({
  useScope: "local",
});
const snackbar = useSnackbar();
const itemId = computed(() => route.params.id);



const languag_code = ref('')
const name  = ref('')
const is_default = ref('')

defineExpose({
languag_code,
name,
is_default,
});

// Validation error Messages
const valid = ref(false)
const name_errorMessage = ref("");
const languag_code_errorMessage = ref("");

// Get Data Function
async function getDataFunction() {
  const { data } = await $fetch(
    `${baseURL()}/dashboard/language/${itemId.value}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        lang: locale.value
      },
      method: "GET",
    }
  );
    languag_code.value = data.language_code;
    name.value = data.name;
    is_default.value = data.is_default.toString()
}

const update = async () => {
  try {
    const response = await  $fetch(`${baseURL()}/dashboard/language/${itemId.value}`,
      {
        headers:{
          Authorization: `Bearer ${token()}`,
          lang: locale.value
        },
        method: "PUT",
        body: {
          language_code: languag_code.value,
          name: name.value,
          is_default: is_default.value,
        },
      }
    );
    if (response.error == false) {
      snackbar.add({
        type: "success",
        text: response.message,
      });
      $router.push(localePath("/languages"));

    }
  } catch (e) {
     let errors = e.response._data.errors;
        name_errorMessage.value = errors["name"];
        languag_code_errorMessage.value = errors["language_code"];
        snackbar.add({
            type: 'error',
            text: e.response._data.errors ? e.response._data.errors : e.response._data.message
          })
  }
};

watch([languag_code], () => {
  languag_code_errorMessage.value = '';
});
watch([name], () => {
  name_errorMessage.value = '';
});

onMounted(async () => { 
  getDataFunction()
 });
</script>

<template>
  <div>
    <v-card>
      <div class="page-title">
        <span>
          <nuxt-link to="/">
            {{ $t("Dashboard") }}
          </nuxt-link>
        </span> / 
        <span>
          <nuxt-link to="/languages">
            {{ $t("languages") }}
          </nuxt-link>
        </span> / 
        <span class="active-page">{{ $t("update language") }}</span> 

        <h1>{{ $t("languages") }}</h1>
      </div>

      <v-card-text class="w-75 mx-auto">
        <div>
          <v-form v-model="valid">
            <h1 class="my-5">{{ $t("update language") }}</h1>
            <v-row>
              <v-col cols="12" md="6">
                <label class="text-right">
                  {{
                    $t("language name")
                  }}</label
                >
                <v-text-field
                  v-model="name"
                  type="text"
                  variant="solo"
                  density="compact"
                  :rules="[(v) => !!v || $t('Name is required')]"
                  :error-messages="name_errorMessage"
                />
              </v-col>
              <v-col cols="12" md="6">
                <label class="text-right">
                  {{
                    $t("language code")
                  }}</label
                >
                <v-text-field
                  v-model="languag_code"
                  type="text"
                  variant="solo"
                  density="compact"
                  :rules="[(v) => !!v || $t('language code is require')]"
                  :error-messages="languag_code_errorMessage"
                />
              </v-col>
              <v-col cols="12" md="12">
              <label> {{ $t("is default") }} </label>
                  <v-row class="mt-3">
                    <v-radio-group
                      inline
                      v-model="is_default"
                      :rules="[ (v) => !!v || $t('is default is required')]"
                    >
                      <v-radio
                        :label="$t('yes')"
                        value="1"
                        class="mx-5"
                      ></v-radio>
                      <v-radio :label="$t('no')" value="0"></v-radio>
                    </v-radio-group>
                  </v-row>
              </v-col>
            </v-row>

          </v-form>
        </div>
      </v-card-text>
      <div class="text-center my-4">
        <v-btn
          class="solid-btn w-75 animate__animated animate__fadeInTopLeft"
          @click="update"
          :disabled="!valid"
          >{{ $t("update language") }}</v-btn
        >
      </div>
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
