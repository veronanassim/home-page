<template>
  <div>
    <v-card-text class="w-75 mx-auto">
      <div>
        <v-form>
          <h1 class="my-5">{{ $t("role data") }}</h1>
          <v-row>
            <v-col cols="12" md="12">
              <label class="text-right"> {{ $t("role name") }} </label>
              <v-text-field
                v-model="role"
                type="text"
                variant="solo"
                density="compact"
              />
              <label class="text-right"> {{ $t("permissions") }} </label>
            </v-col>
            <div
              v-for="permission in translatedPermissions"
              :key="permission.id"
              class="permissions-checkbox"
            >
              <v-checkbox
                v-model="permissionValues"
                :label="permission.model + ' : ' + permission.value"
                :value="permission.id"
              />
            </div>
          </v-row>
        </v-form>
      </div>
      <v-btn @click="update">
        {{ $t("Update Role") }}
      </v-btn>
    </v-card-text>
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

const role = ref('')
const permissions = ref('')
const permissionValues = ref([])
defineExpose({
  role,
  permissionValues
});

const translatedPermissions = ref('')
async function getPermissionFunction() {
    const { data } = await $fetch(`${baseURL()}/dashboard/permission?paginate=500`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        lang: locale.value
      },
      method: "GET",
    }
);
permissions.value = data;

translatedPermissions.value = data.map( permission => ({
    ...permission,
    model: t(`models.${permission.model}`),
    value: t(`permissionName.${permission.value}`)
  }))
}

async function getDataFunction() {
    const { data } = await $fetch(`${baseURL()}/dashboard/role/${itemId.value}`,
    {
    headers: {
        Authorization: `Bearer ${token()}`,
        lang: locale.value
},
    method: "GET",
    }
);
allData.value = data;
role.value = data.name;
permissionValues.value = data.permissions.map((item) => item.id);
}

const update = async () => {
  try{
    const response = await $fetch(`${baseURL()}/dashboard/role/${itemId.value}`,
  {
    headers : {
      Authorization : `Bearer ${token()}`,
      lang : locale.value,
    },
    method: "PUT",
    body :
    {
      role : {
        name: role.value,
        guard_name: "admin",
      },
      permissions: permissionValues.value,
    },
  }
  );
  if (response.error == false) {
    snackbar.add({
      type: "success",
      text: response.message,
      duration: 2000,
    });
    setTimeout(() => {
      $router.push(localePath("/roles"));
    }, 2001);
  }}
  catch (e) {
    let errors = e.response._data.errors;
    role_errorMessage.value = errors["name"];
    permissions_errorMessage.value = errors["permissions"];
    snackbar.add({
      type: "error",
      text: e.response._data.errors
        ? e.response._data.errors
        : e.response._data.message,
    });
  }
};


onMounted(async () => {
  getDataFunction()
  getPermissionFunction()
})
</script>
