<script setup>
const createVehicle = ref(false)
const dialog = ref(false)

function onClickOutside() {
  createVehicle.value = false;
}
function close(){
  createVehicle.value = false;
}
</script>

<template>
  <div>
    <v-row>
      <v-btn class="solid-btn" @click.stop="createVehicle = true">
        <v-icon>mdi-plus</v-icon>
        {{ $t("create vehicle") }}
      </v-btn>

      <v-dialog v-model="createVehicle" >

        <v-card>
          <v-card-title >
            <div>
              <h3>{{ $t("vehicle data") }}</h3>
            </div>
          </v-card-title>

          <v-form>

            <v-card-text >
              <div>
                <label class="text-right">{{ $t("plate number") }}</label>
                <v-text-field 
                    variant="solo"
                    density="compact"
                />
                <label class="text-right">{{ $t("plate type") }}</label>
                <v-text-field 
                    variant="solo"
                    density="compact"
                />
                <label class="text-right">{{ $t("car type") }}</label>
                <v-text-field 
                    variant="solo"
                    density="compact"
                />
                <label class="text-right">{{ $t("vehicle model") }}</label>
                <v-text-field 
                    variant="solo"
                    density="compact"
                />
                <label class="text-right">{{ $t("color") }}</label>
                <v-text-field 
                    variant="solo"
                    density="compact"
                />
                <label class="text-right">{{ $t("weight") }}</label>
                <v-text-field 
                    variant="solo"
                    density="compact"
                />
              </div>
            </v-card-text>

            <v-card-actions>
              <v-row>
                <v-col cols="12" md="2">
                  <v-btn class="cancel-btn w-100" @click="close">
                    {{ $t("cancel") }}
                  </v-btn>
                </v-col>
                <v-col cols="12" md="10">
                  <v-btn class="action-btn w-100" @click="dialog=true">
                    {{ $t("create")}}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>

          </v-form>

        </v-card>
      </v-dialog>
    </v-row>

    <success-popup 
      :dialog="dialog"
      @dialog="dialog = $event"
      :text="$t('vehicle data has been added')"
    />
  </div>
</template>

<style lang="scss" scoped>
.solid-btn{
    margin-right: 15.5rem;
    margin-top: 0.8rem;
}
.v-card-text{
    box-shadow: unset;
}
.v-form , .v-card-title {
    background: white;
    text-align: right;
}
.v-dialog{
  .v-card{
    width: 619px;
    height: 710px;
  }
}

</style>

