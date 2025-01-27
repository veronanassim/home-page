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
        {{ $t("add user") }}
      </v-btn>

      <v-dialog v-model="createVehicle" >

        <v-card>
          <v-card-title >
            <div>
              <h3>{{ $t("add user") }}</h3>
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

            <v-card-actions>
              <v-row>
                <v-col cols="12" md="2">
                  <v-btn class="cancel-btn " @click="close">
                    {{ $t("cancel") }}
                  </v-btn>
                </v-col>
                <v-col cols="12" md="10">
                  <v-btn class="action-btn" @click="dialog=true">
                    {{ $t("save")}}
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
      :text="$t('user data has been added successfully')"
    />
  </div>
</template>

<style lang="scss" scoped>
.solid-btn{
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
  }
}

</style>