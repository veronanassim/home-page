<template>
  <div>
    <div class="page-title">
      <h1>{{ $t("customer invoices") }}</h1>
    </div>
    <v-card-text class="top-border-card">
      <v-form class="mt-10">
        <v-row>
          <v-col cols="12" md="4">
            <label> {{ $t("customer name") }}</label>
            <v-autocomplete
              :items="customers"
              item-title="name"
              item-value="id"
              v-model="customer_id"
              variant="solo"
              density="compact"
            />
          </v-col>
          <v-col cols="12" md="4">
            <label> {{ $t("account number") }} </label>
            <v-text-field
              v-model="uniqueid"
              type="text"
              variant="solo"
              density="compact"
            />
          </v-col>
          <v-col cols="12" md="4">
            <label> {{ $t("date") }} </label>
            <v-text-field
              type="date"
              v-model="date_of_issuance"
              variant="solo"
              density="compact"
            />
          </v-col>
        </v-row>
        <v-btn @click="initialize">{{ $t("search") }}</v-btn>
      </v-form>
    </v-card-text>

    <v-card>
      <v-card-text class="w-75 mx-auto">
        <v-data-table
          :headers="headers"
          :items="tableCustomers"
          item-value="id"
          show-select
        >
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <nuxt-link
                :to="`/customer-invoices/customers/${item.selectable.id}`"
              >
                <v-btn>{{ $t("view invoice") }}</v-btn>
              </nuxt-link>
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
  </div>
</template>

<script setup>
const { t } = useI18n({
  useScope: "local",
});
const { locale, locales } = useI18n();
const localePath = useLocalePath();

let url = ref([]);
let next_url = ref("");
let prev_url = ref("");
const currentPage = ref("");

const customers = ref([]);
const tableCustomers = ref([]);
const customer_id = ref();
const uniqueid = ref();

const headers = [
  { title: t("Name"), key: "name", sortable: false, align: "center" },
  {
    title: t("account number"),
    key: "uniqueid",
    sortable: false,
    align: "center",
  },
  {
    title: t("Phone Number"),
    key: "phone_number",
    sortable: false,
    align: "center",
  },
  { title: t("actions"), key: "actions", sortable: false, align: "center" },
];

async function getCustomers() {
  const { data } = await $fetch(`${baseURL()}/dashboard/customer`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      lang: locale.value,
    },
    params: {
      paginate: 500,
      type: "parent",
    },
  });
  customers.value = data;
  console.log("customers data", customers.value);
}

async function initialize(page = 1) {
  const { data, links, meta } = await $fetch(
    `${baseURL()}/dashboard/customer?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        lang: locale.value,
      },
      params: {
        customer_id: customer_id.value,
        uniqueid: uniqueid.value,
      },
    }
  );
  tableCustomers.value = data;
  console.log("tableCustomers", data);
  url.value = meta.links.slice(1, -1);
  next_url.value = links.next?.split("=")[1];
  prev_url.value = links.prev?.split("=")[1];
  currentPage.value = meta.current_page;
  return data;
}

onMounted(async () => {
  initialize();
  getCustomers();
});
</script>
