<template>
    <v-col
          cols="12"
          md="2"
          class="mx-7"
        >
    <v-btn :to="localePath('/roles/create')">{{ $t("Add New Role") }}</v-btn>
    </v-col>
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
    :items="roles"
    item-value="id"
    select-strategy="single"
    show-select
>
<template v-slot:[`item.action`] = "{item}">
<div class="d-flex justify-end">
    <nuxt-link
                :to="localePath(`/roles/${item.selectable.id}`)"
              >
                <v-icon class="table-icons">mdi-pencil</v-icon>
              </nuxt-link>

        <DeleteItemComponent
            url="dashboard/role"
            :id="item.selectable.id"
            @delete-function="initialize"
            :name="item.selectable.name"
            :text="$t('this permission')"
                />
</div>
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

</template>


<script setup>
const route = useRoute();
const $router = useRouter();
const { t } = useI18n({
    useScope: "local",
});
let url = ref([]);
let next_url = ref("");
let prev_url = ref("");
const currentPage = ref("")
const snackbar = useSnackbar();
const { locale, locales } = useI18n();
const localePath = useLocalePath();
const headers = ref([{
            title: 'Name',
            align: 'center',
            key: 'name',
          },
          { title: 'Action', align: 'end', key: 'action' },]);
const roles = ref([]);

const searchTypes = ref([
  t("name"),
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


async function initialize(page = 1) {
    const { data, links , meta  } = await $fetch(`${baseURL()}/dashboard/role?page=${page}`, {
    headers: {
        Authorization: `Bearer ${token()}`,
        lang: locale.value,
    },
  params: {
    name: type_select.value == t("name") ? search_input.value : ""
  },
    });
    roles.value = data
    url.value = meta.links.slice(1, -1);
  next_url.value = links.next?.split("=")[1];
  prev_url.value = links.prev?.split("=")[1];

  currentPage.value = meta.current_page
    return data;
}
onMounted(async () => {
    initialize();
});
</script>
