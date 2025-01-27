<script setup>
const dialog = ref(false);

const props = defineProps({
  id: {
    type: Number,
    required: true,
    default: "0",
  },
});
</script>

<template>
  <div>
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="cancel-btn"> {{ $t("edit") }} </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <div class="d-flex justify-between mt-4">
            <h3>{{ $t("Manager data") }}</h3>
          </div>
        </v-card-title>

        <v-form>
          <v-card-text>
            <label>{{ $t("Manager Name") }}</label>
            <v-text-field variant="solo" density="compact" />

            <label>{{ $t("Manager phone") }}</label>
            <v-text-field variant="solo" density="compact" />

            <label>{{ $t("ID") }}</label>
            <v-text-field variant="solo" density="compact" />

            <label>{{ $t("Manager's date of birth") }}</label>
            <v-radio-group inline>
              <v-radio :label="$t('Hijri')" value="Hijri"></v-radio>
              <v-radio :label="$t('A.D.')" value="A.D."></v-radio>
            </v-radio-group>
            <v-text-field type="date" variant="solo" density="compact" />
          </v-card-text>

          <v-card-actions class="d-flex justify-between">
            <v-btn class="action-btn" @click="dialog = false">
              {{ $t("save") }}
            </v-btn>
            <v-btn class="cancel-btn" @click="dialog = false">
              {{ $t("close") }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.mdi-pencil {
  color: $edit-color;
}
.v-card-text {
  box-shadow: unset;
}
.v-form,
.v-card-title {
  background: white;
}
.v-dialog {
  .v-card {
    width: 619px;
    direction: rtl;
  }
}
</style>
