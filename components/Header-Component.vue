<script setup>
const { status,signOut } = useAuth()
const IsLoggedIn = computed(() => status.value === 'authenticated')

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const userCard = ref(false)

const handlSingOut = async () => {
  await signOut()
}

function toggleUserCard() {
  userCard.value = !userCard.value
}
function onClickOutside() {
  userCard.value = false;
}
</script>

<template>
  <div>
    <div class="header">
      <v-col cols="6" md="10" class="mt-2">
        <Nuxt-link
          v-for="{ code, name } in locales"
          :key="code"
          :to="switchLocalePath(code)"
          class="mr-4 lang-switcher"
        >
          <span v-if="name == 'Arabic'"> {{ $t("Arabic") }} </span> 
          <span v-else-if="name == 'English'"> {{ $t("English") }} </span>
        </Nuxt-link>
      </v-col>

      <v-col cols="12" md="2">
        <div class="user-controller">
          <div @click="toggleUserCard()" class="d-flex">
            <div class="mt-2 ml-2"> 
                <v-icon>mdi-arrow-down</v-icon>
                <span class="username font-weight-bold" v-if="user()"> {{ user().username }} </span>
            </div>         
            <div class="user-img"></div>
          </div>
          <div
            class="user-card"
            v-if="userCard"
            v-click-outside="onClickOutside"
          >
            <div class="d-flex">
              <p>
                <nuxt-link @click="handlSingOut" v-if="IsLoggedIn" style="cursor:pointer"> 
                  {{ $t("Logout") }} 
                </nuxt-link>
              </p>
            </div>
          </div>
        </div>

      </v-col>
    </div>
  </div>
</template>

<style lang="scss">
.lang-switcher{
  color: $page-header-color;
  text-decoration: none;
}

.header {
  display: flex;
  justify-content: flex-end;
  .router-link-exact-active{
    color: $second-color;
    text-decoration: underline;
  }
}
.user-controller{
    .username{
        color: $main-color;
        cursor: pointer;
    }
    .v-icon{
        font-size: 12px;
        cursor: pointer;
    }
    .user-img{
        border-radius: 50%;
        background: white;
        width: 43px;
        height: 41px;
    }
    .user-card {
        position: absolute;
        background-color: white;
        text-align: center;
        border: $input-border;
        z-index: 9999;
        min-width: 225px;
        top: 47px;
        left: 40px;
        border-radius: 5px;
        font-size: 14px;
        .d-flex {
            flex-direction: column;
        }
        p {
            width: 50%;
            margin: auto;
            padding: 0.5rem 0rem;
        }
    }
}

</style>
