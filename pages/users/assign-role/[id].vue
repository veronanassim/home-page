<template>
    <div>
      <v-card>
      <v-card-text class="w-75 mx-auto">
        <div>
          <v-form >
            <h1 class="">{{ $t("assign role") }}</h1>
            <v-row>
              <v-col cols="12" md="12">
                <label> {{ $t("roles") }} </label>
                <v-autocomplete
                    v-model="role"
                    :items="roles"
                    :placeholder="$t('roles')"
                    item-value="name" 
                    item-title="name"
                  />
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-card-text>
      <v-btn @click="updateFunction">{{ $t("update") }}</v-btn>
    </v-card>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
const localePath = useLocalePath()
const { locale, locales } = useI18n();
const $router = useRouter();
const { t } = useI18n({
  useScope: "local",
});
const snackbar = useSnackbar();
const route = useRoute();
const itemId = computed(() => route.params.id);

const role = ref([])
const roles = ref([])

async function allRoles() {
  const {data} = await $fetch(`${baseURL()}/dashboard/role`,
  {
    headers: {
      Authorization: `Bearer ${token()}`,
      lang: locale.value
    },
  });
  roles.value = data;
  console.log(roles.value);
}


const updateFunction = async () => {
  try {
    const response = await $fetch(`${baseURL()}/dashboard/role/assign-user`,
  {
    headers: {
      Authorization: `Bearer ${token()}`,
      lang: locale.value,
    },
    method: "PUT",
    body: {
      user_id : itemId.value,
      role: role.value,
    },
  });
  if (response.error == false) {
    snackbar.add({
      type: "success",
      text: response.message,
      duration: 2000,
    });
    setTimeout(() => {
      $router.puch(localePath("/users"))
    },2000);
  }
  }
  catch (e) {
    snackbar.add({
      type: "error",
      text: e.response._data.errors ? e.response._data.errors : e.response._data.message
    });
  }
};
onMounted( async() => {
  allRoles();
})
</script>