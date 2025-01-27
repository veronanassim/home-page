<template>
    <div>
        <v-card>
      <v-card-text class="w-75 mx-auto">
        <div>
          <v-form v-model="valid">
            <h1 class="my-5">{{ $t("role data") }}</h1>
            <v-row>
              <v-col cols="12" md="12">
                <label class="text-right"> {{ $t("role name") }} </label>
                <v-text-field
                  v-model="role"
                  type="text"
                  variant="solo"
                  density="compact"
                  :rules="[(v) => !!v || $t('role name is required')]"
                  :error-messages="role_errorMessage"
                />
                <label class="text-right"> {{ $t("permissions") }} </label>
              </v-col>
              <div
                v-for="(permission, index) in translatedPermissions"
                :key="index"
                class="permissions-checkbox"
              >
                <v-checkbox
                  v-model="permissionVal[index]"
                  :label="permission.model + ' : ' + permission.value"
                  :value="permission.id"
                />
              </div>
            </v-row>
          </v-form>
        </div>
      </v-card-text>
      <div class="text-center my-4">
        <v-btn
          @click="create"
          :disabled="!valid"
          >{{ $t("Create New role") }}</v-btn
        >
      </div>
    </v-card>
    <NuxtSnackbar />
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const localePath = useLocalePath();
const { locale, locales } = useI18n();

const $router = useRouter();
const { t } = useI18n({
  useScope: "local",
});
const snackbar = useSnackbar();

const role = ref("");
const permissions = ref("");
const permissionVal = ref([]);
const translatedPermissions = ref("");

const role_errorMessage = ref("");
const valid = ref(false);

async function getPermissionFunction() {
    const { data } = await $fetch(`${baseURL()}/dashboard/permission?paginate=500`,
    {
        headers: {
            Authorization: `Bearer ${token()}`,
            lang: locale.value,
        },
        method: "GET",
    }
);
permissions.value = data;

translatedPermissions.value = data.map( permission => ({
    ...permission,
    model: t(`models.${permission.model}`),
    value: t(`permissionName.${permission.value}`),
}));
}

const create = async () => {
    try{
        const response = await $fetch(`${baseURL()}/dashboard/role`,
    {
        headers: {
            Authorization: `Bearer ${token()}`,
            lang: locale.value
        },
        method: "POST",
        body: {
            role: {
                name: role.value,
                guard_name: "admin",
            },
            permissions: permissionVal.value,
        },
    });
    if (response.error == false) {
        snackbar.add({
            type: "success",
            text: response.message,
            duration: 2000,
        });
        setTimeout(() => {
            $router.push(localePath("/roles"));
        },2000);
    }}
    catch (e) {
        let errores = e.response._data.errores;
        role_errorMessage.value = errores["role.name"];
        snackbar.add({
            type: "error",
            text: e.response._data.errores ? e.response._data.errores : e.response._data.message,
        });
    }
};

watch([role], () => {
    role_errorMessage.value = "";
});

onMounted(async () => {
    getPermissionFunction();
});
</script>
