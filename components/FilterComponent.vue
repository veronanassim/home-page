<template>
    <div>
        <v-row class="mt-5">
          <v-col cols="12" md="4">
          <label class="mr-3"> {{ $t("search with") }} </label>
          <v-autocomplete
            v-model="type"
            :items="searchTypes"
            variant="solo"
            density="compact"
            class="mx-2"
            @update:modelValue="emitTypeValue"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <label class="mr-3"> {{ $t("value") }} </label>
          <v-text-field
            v-model="search_value"
            variant="solo"
            density="compact"
            class="mx-2"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <div class="pt-2">
            <v-btn class="mt-5" @click="emitSearchValue">
              {{ $t("search") }}
            </v-btn>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="2"
          class="mt-7"
          v-if="user().super_user == 1 || hasPermission('role.index')"
        >
          <nuxt-link :to="localePath('/users/create')">
            <v-btn>{{ $t("add user") }}</v-btn>
          </nuxt-link>
        </v-col>
        </v-row>
    </div>
</template>



<script setup>
const { locale, locales } = useI18n();

const { t } = useI18n({
  useScope: "local",
});

const type = ref('');
const search_value = ref('')
const emit = defineEmits(["type_value" , "search_value"]);

const props = defineProps({
  searchTypes: {
    type: Array,
    required: true,
    default: [],
  },
});
async function emitTypeValue() {
    emit("type_value", type.value)
};
async function emitSearchValue() {
  emit("search_value", search_value.value );
  console.log("search_value.value", search_value.value)
}
</script>