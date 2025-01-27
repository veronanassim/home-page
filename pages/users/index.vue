<template>
  <div>
    <v-card>
      <v-row class="mt-5">
        <v-col cols="12" md="10">
          <FilterComponent
            :searchTypes="searchTypes"
            @search_value="search_value"
            @type_value="type_value"
          />
        </v-col>
      </v-row>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="users"
          item-value="id"
          show-select
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-row class="d-flex justify-end">
              <nuxt-link
                :to="localePath(`/users/assign-role/${item.selectable.id}`)"
              >
                <v-icon class="table-icons">mdi-account-plus</v-icon>
              </nuxt-link>

              <nuxt-link :to="localePath(`/users/${item.selectable.id}`)">
                <v-icon class="table-icons">mdi-pencil</v-icon>
              </nuxt-link>

              <nuxt-link
                :to="localePath(`/users/password/${item.selectable.id}`)"
              >
                <v-icon class="table-icons">mdi-key-change</v-icon>
              </nuxt-link>

                <ViewComponent
                  :user="item.selectable"
                />

              <DeleteItemComponent
                url="dashboard/user"
                :id="item.selectable.id"
                @delete-function="initialize"
                :name="item.selectable.username"
                :text="$t('this user')"
              />
            </v-row>
          </template>
        </v-data-table>


        <Pagination
          :initialize="initialize"
          :links="url"
          :next_url="next_url"
          :prev_url="prev_url"
        />
      </v-card-text>
    </v-card>
    
  </div>
</template>

<script setup>
const { t } = useI18n({
  useScope: "local",
});
const { locale, locales } = useI18n();
const localePath = useLocalePath();

const searchTypes = ref([
  t("username"),
  t("Phone Number"),
  "Super User",
  t("email"),
]);

const type_select = ref("");
const search_input = ref("");

async function type_value(v) {
  type_select.value = v;
}
async function search_value(v) {
  console.log("v.value", v )
  search_input.value = v;
  initialize();
}


const users = ref([]);
let url = ref([]);
let next_url = ref("");
let prev_url = ref("");
const currentPage = ref("");

const headers = ref([
  {
    title: "username",
    lign: "center",
    key: "username",
  },
  { title: "email", align: "center", key: "email" },
  { title: "action", align: "end", key: "actions" },
]);

async function initialize(page = 1) {
  const { data, links, meta } = await $fetch(
    `${baseURL()}/dashboard/user?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        lang: locale.value,
      },
      params: {
        name: type_select.value == t("username") ? search_input.value : "",
        phone_number:
          type_select.value == t("Phone Number") ? search_input.value : "",
        email: type_select.value == t("email") ? search_input.value : "",
        super_user: type_select.value == "Super User" ? search_input.value : "",
      },
    }
  );
  users.value = data;
  url.value = meta.links.slice(1, -1);
  next_url.value = links.next?.split("=")[1];
  prev_url.value = links.prev?.split("=")[1];

  currentPage.value = meta.current_page;
  return data;
}

let permissions = ref([]);
onMounted(async () => {
  initialize();
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
</script>

<style lang="scss" scoped>
.mdi-delete {
  color: $error-color;
}
</style>
