<script setup>
const {links , initialize , next_url , prev_url} = defineProps([
    "links",
    "initialize",
    "next_url",
    "prev_url",
]);
</script>

<template>
    <div class="ul-parent" >
      <ul class="paginator-bar">
       <li>
          <a @click="initialize(prev_url)"> {{ $t('previous') }}  </a>
        </li>
        <div v-for="(link, index) in links" :key="index">
          <li :class="{ 'active-link': link.active == true }"  @click="initialize(link.label)">
            <a>
              {{ link.label }}
            </a>
          </li>
        </div>
        <li>
          <a @click="initialize(next_url)"> {{ $t('next') }}  </a>
        </li>
       
      </ul>
    </div>
  </template>

<style lang="scss" scoped>
.ul-parent {
  justify-content: flex-start !important;
  grid-gap: 5px;
  gap: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.paginator-bar {
  margin-top: 15px;
  background: #fff;
  display: flex;
  li {
    border: 1px solid #eee !important;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 45px;
    flex-grow: 1;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: all 0.1s;
    cursor: pointer;
  }
  li:hover {
    background: #e8f0fe;
    color: black;
  }

  .active-link {
    background-color: $second-color;
    color: white;
  }
}

.paginator-bar:first-child div {
  font-weight: bold;
}

.paginator-bar > :first-child ,.paginator-bar > :last-child {
 padding:1rem
}
</style>