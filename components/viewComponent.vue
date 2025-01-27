<template>
  <div>
    <v-dialog v-model="dialog" width="auto" class="delete-diloge">
        <template v-slot:activator="{ props: activatorProps }">
            <v-icon v-bind="activatorProps" class="table-icons">mdi-eye-check-outline</v-icon>
        </template>
      <v-card>
        <v-container class="pa-4 d-flex justify-center">
    <v-card class="pa-4"  max-width="500">
      <v-card-title>User Information</v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><strong>ID : </strong> {{ user.id }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <hr>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><strong>Username : </strong> {{ user.username }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><strong>Email : </strong> {{ user.email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
        <v-card-actions class="d-flex justify-space-between w-100 mt-3">
          <v-btn class="mx-2 cancel-btn w-30" @click="dialog = false">
            {{ $t("close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>



<script setup>

const { t } = useI18n({
  useScope: "local",
});
const { locale, locales } = useI18n();

const dialog = ref(false);

const props = defineProps({
    user:{
        required: true
    }
});

</script>
