<script setup>
const { locale, locales } = useI18n();
const localePath = useLocalePath();

let permissions = ref([]);
onMounted(async () => {
  const { data } = await $fetch(`${baseURL()}/dashboard/user/permissions`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  let all_permissions = data.permissions;
  for (let permission of all_permissions) {
    permissions.value.push(permission.name);
  }
});
const hasPermission = (permission) => {
  return permissions.value.includes(permission);
};
</script>

<template>
  <v-card>
    <v-list class="nav-bar-section" :dir="locale == 'ar' ? 'rtl' : 'ltr'">
      <img src="~/assets/images/logo.png" alt="" width="100%" height="200" />

      <v-list-item
        :to="localePath('/')"
        prepend-icon="mdi-home"
        v-if="
          user().super_user == 1 ||
          hasPermission('dashboard.index') ||
          hasPermission('statistic.index')
        "
      >
        <v-list-item-title>{{ $t("Dashboard") }}</v-list-item-title>
      </v-list-item>

      <v-list-item
        :to="localePath('/roles')"
        prepend-icon="mdi-lock-check"
        v-if="user().super_user == 1 || hasPermission('role.index')"
      >
        <v-list-item-title>{{ $t("roles") }}</v-list-item-title>
      </v-list-item>

      <v-list-item
        :to="localePath('/users')"
        prepend-icon="mdi-account-group"
        v-if="user().super_user == 1 || hasPermission('user.index')"
      >
        <v-list-item-title>{{ $t("users") }}</v-list-item-title>
      </v-list-item>

      <v-list-item 
        :to="localePath('/customer-invoices')" 
        prepend-icon="mdi-file-account"
        v-if="user().super_user == 1 || hasPermission('invoice.index') || hasPermission('customer.index')"
      >
        <v-list-item-title>{{ $t("Customer invoices") }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>
