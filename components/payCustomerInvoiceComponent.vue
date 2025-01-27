<template>
  <div>
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ props }">
        <p v-bind="props" class="unpaid-text">
          {{ $t("unpaid") }}
        </p>
      </template>
      <v-card>
        <v-card-title>
          <div>
            <h3 class="mt-4">{{ $t("payment confirmation") }}</h3>
          </div>
        </v-card-title>
        <v-form>
          <v-card-text>
            <p class="confirmation-text">
              {{ $t("Are you sure that the payment has been made?") }}
            </p>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between w-100 mt-3">
            <v-btn
              class="mx-2 solid-btn w-75"
              v-bind="props"
              @click="payFunction"
            >
              {{ $t("yes") }}
            </v-btn>
            <v-btn class="mx-2 cancel-btn w-20" @click="dialog = false">
              {{ $t("close") }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <NuxtSnackbar />
  </div>
</template>

<script setup>
const { locale, locales } = useI18n();
const dialog = ref(false);
const snackbar = useSnackbar();
const emit = defineEmits(["initialize"]);

function emitFunction() {
  emit("initialize");
}

const props = defineProps({
  id: {
    type: Number,
    required: true,
    default: "0",
  },
});

async function payFunction() {
  try {
    const { message } = await $fetch(
      `${baseURL()}/dashboard/invoices/customer/change-status/${props.id}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
          lang: locale.value,
        },
        method: "PUT",
      }
    );
    snackbar.add({
      type: "success",
      text: message,
    });
    emitFunction();
    dialog.value = false;
  } catch (e) {
    snackbar.add({
      type: "error",
      text: e.response._data.message,
    });
  }
}
</script>

<style lang="scss" scoped>
[dir="ltr"] {
  .v-dialog {
    .v-card {
      direction: ltr;
    }
  }
}
.v-card-text {
  box-shadow: unset;
  margin-top: 10px !important;
}
.v-form,
.v-card-title {
  background: white;
}
.v-dialog {
  .v-card {
    width: 600px;
    direction: rtl;
  }
}
@media (max-width: 768px) {
  .v-dialog {
    .v-card {
      width: 100% !important;
    }
  }
}
</style>
