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
        <v-btn class="solid-btn" v-bind="props">{{ $t("view details") }}</v-btn>
      </template>

      <v-card>
        <v-card-title>
          <div>
            <h3 class="mt-4">{{ $t("vehicle data") }}</h3>
          </div>
        </v-card-title>

        <v-form>
          <v-card-text>

            <v-row>
              <v-col cols="12" md="4">
                <div class="list-dot"></div>
                <span class="mr-3"> {{ $t("plate number") }} </span>
              </v-col>
              <v-col cols="12" md="7">
                <span class="list-value"> 528 </span>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <div class="list-dot"></div> 
                <span class="mr-3"> {{ $t("plate type") }} </span>
              </v-col>
              <v-col cols="12" md="4">
                <span class="list-value"> نقل عام </span>
              </v-col>
            </v-row>
            
          </v-card-text>

          <v-card-actions>
            <v-btn class="w-100 cancel-btn" @click="dialog = false">
              {{ $t("close") }}
            </v-btn>
          </v-card-actions>

        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
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
