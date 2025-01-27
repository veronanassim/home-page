<script setup>
const snackbar = useSnackbar();
const { locale } = useI18n();

// Compute the direction based on the locale
const direction = computed(() => (locale.value === 'en' ? 'ltr' : 'rtl'))

// Update the body direction when the locale changes
watch(locale, () => {
  if (typeof document !== 'undefined') {
    document.documentElement.dir = direction.value
  }
})

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.dir = direction.value
  }
})
</script>

<template>
  <div :dir="direction">
    <div>
      <v-row>
        <v-col cols="12" sm="3" md="2" class="nav-bar-menu" >
          <sidebar />
        </v-col>
        <v-col cols="12" sm="9" md="10">
          <div class="p-2">
            <Header-Component />
            <slot />
            <NuxtSnackbar />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style lang="scss">
.nav-bar-menu{
  background: $main-color;
  min-height: 100vh;
  border-radius: 37px 0px 0px 0px;
}
body{
  direction: rtl;
}
</style>
