<script setup>
const snackbar = useSnackbar();

const { t } = useI18n({
  useScope: "local",
});
const { locale, locales } = useI18n();

const dialog = ref(false);
const delete_response = ref();
const emit = defineEmits(["delete-function"]);

const props = defineProps({
  id: {
    type: Number,
    required: true,
    default: "0",
  },
  url: {
    type: String,
    required: true,
    default: "/",
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
  text: {
    type: String,
    required: true,
    default: "",
  },
});

function emitDelete() {
  emit("delete-function");
}

async function deleteItem() {
  try {
    const { error, message } = await $fetch(
      `${baseURL()}/${props.url}/${props.id}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
          lang: locale.value,
        },
        method: "DELETE",
      }
    );
    emitDelete();
    dialog.value = false;
    snackbar.add({
      type: "success",
      text: message,
    });
  } catch (e) {
    snackbar.add({
      type: "error",
      text: e.response._data.message,
    });
  }
}
</script>

<template>
  <div>
    <v-dialog v-model="dialog" width="auto" class="delete-diloge">
      <template v-slot:activator="{ props }">
        <v-icon class="mx-2" color="red" v-bind="props">mdi-delete</v-icon>
      </template>

      <v-card>
        <v-card-title>
          <h3 class="mt-4">{{ $t("Delete Confirmation") }}</h3>
        </v-card-title>

        <v-card-text>
          <p>
            {{ $t("Are You Sure You Need To Delete") }} {{ props.text }} :
            <strong> {{ props.name }} </strong>
          </p>
        </v-card-text>

        <v-card-actions class="d-flex justify-space-between w-100 mt-3">
          <v-btn
            class="mx-2 block-btn w-50"
            v-bind="props"
            @click="deleteItem(props.id, props.url)"
          >
            {{ $t("Confirm Delete") }}
          </v-btn>
          <v-btn class="mx-2 cancel-btn w-30" @click="dialog = false">
            {{ $t("close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <NuxtSnackbar />
  </div>
</template>

<style lang="scss">
.delete-diloge {
  .v-card .v-card-text {
    box-shadow: unset !important;
    background: unset !important;
    margin-top: 0px;
  }
}
.v-dialog {
  .v-card {
    width: 500px;
    direction: rtl;
  }
}

[dir="ltr"] {
  .v-dialog {
    .v-card {
      direction: ltr;
    }
  }
}
</style>
