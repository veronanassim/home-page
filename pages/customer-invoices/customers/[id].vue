<template>
  <div>
    <v-card>
      <v-card-text class="w-85 mx-auto">
        <v-data-table
          :headers="headers"
          :items="invoices"
          item-value="id"
          show-select
        >
        <template v-slot:[`item.status`]="{ item }">
          <p v-if="item.selectable.status == 0"> 
            <pay-Customer-invoice-component :id="item.selectable.id" @initialize="initialize" />
          </p>
          <p v-if="item.selectable.status == 1" class="active-item paid-text"> {{ $t("paid") }} </p>
        </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const localePath = useLocalePath();
const { locale, locales } = useI18n();
const route = useRoute();
const { t } = useI18n({
  useScope: "local",
});

const itemId = computed(() => route.params.id);
const invoices = ref([]);

const headers = [
  {
    title: t("invoice number"),
    key: "invoice_number",
    sortable: false,
    align: "center",
  },
  { title: t("year"), key: "year", sortable: false, align: "center" },
  { title: t("month"), key: "month", sortable: false, align: "center" },
  {
    title: t("documents count"),
    key: "documents_count",
    sortable: false,
    align: "center",
  },
  {
    title: t("total price"),
    key: "total_price",
    sortable: false,
    align: "center",
  },
  {
    title: t("status"),
    key: "status",
    sortable: false,
    align: "center",
    width: "101",
  },
];

async function initialize() {
  const { data } = await $fetch(
    `${baseURL()}/dashboard/invoices/customer/${itemId.value}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        lang: locale.value,
      },
      method: "GET",
    }
  );
  invoices.value = data;
  console.log("invoices", invoices.value);
}

onMounted(async () => {
  initialize();
});
</script>
