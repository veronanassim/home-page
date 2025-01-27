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
            <h3>{{ $t("facility data") }}</h3>
          </div>
        </v-card-title>

        <v-form>
          <v-card-text>
            <label>{{
              $t("The origin number of the ministry of Interior")
            }}</label>
            <v-text-field variant="solo" density="compact" />

            <label>{{ $t("Commercial registration number") }}</label>
            <v-text-field variant="solo" density="compact" />

            <label>{{ $t("name in the commercial register") }}</label>
            <v-text-field variant="solo" density="compact" />

            <label>{{ $t("facility name in english") }}</label>
            <v-text-field variant="solo" density="compact" />

            <label>{{ $t("Record release date (A.D.)") }}</label>
            <v-text-field variant="solo" density="compact" />

            <label>{{ $t("Record release date (Hijri)") }}</label>
            <v-text-field variant="solo" density="compact" />

            <label> {{ $t("Technical connection type") }} </label>
            <v-row class="mt-3">
              <v-radio-group inline>
                <v-radio label="وسيط الشحن" value="1"></v-radio>
                <v-radio
                  label="منشأة نقل بضائع على الطرق البرية"
                  value="2"
                  class="mx-5"
                ></v-radio>
                <v-radio label="توجيه مركبات نقل البضائع" value="3"></v-radio>
              </v-radio-group>
            </v-row>

            <label>{{ $t("Trade Mark") }}</label>
            <v-text-field variant="solo" density="compact" />

            <label>{{ $t("Phone Number") }}</label>
            <v-text-field variant="solo" density="compact" />

            <label>{{ $t("facility Email") }}</label>
            <v-text-field variant="solo" density="compact" />

            <label>{{ $t("Address") }}</label>
            <v-text-field variant="solo" density="compact" />
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
