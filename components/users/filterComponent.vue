<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          variant="solo"
          density="compact"
          :placeholder="$t('search')"
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field class="search-input" :placeholder="$t('filter by')"/>
      </v-col>
      <v-col cols="12" md="2">
        <v-autocomplete class="search-input" :placeholder="$t('sort by')"/>
      </v-col>
    </v-row>
  </div>
</template>
