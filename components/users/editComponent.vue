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
        <v-icon v-bind="props">mdi-pencil</v-icon>
      </template>

      <v-card>
        <v-card-title>
          <div class="d-flex justify-between mt-4">
            <h3>{{ $t("edit user") }}</h3>
            <div>
                <v-btn class="block-btn mx-3">{{ $t("block") }}</v-btn>
                <v-btn class="delete-btn">{{ $t("delete user") }}</v-btn>
            </div>
          </div>
        </v-card-title>

        <v-form>
          <v-card-text >
              <div>
                <label>{{ $t("username") }}</label>
                <v-text-field 
                    variant="solo"
                    density="compact"
                />
                <label>{{ $t("email") }}</label>
                <v-text-field 
                    variant="solo"
                    density="compact"
                />
                <label>{{ $t("password") }}</label>
                <v-text-field 
                    variant="solo"
                    density="compact"
                />
              </div>
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
.mdi-pencil{
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