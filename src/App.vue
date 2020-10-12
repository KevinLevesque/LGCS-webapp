<template>
  <div id="app">
    <div class="container-wrapper">
      <div class="container">
        <Menu></Menu>
        <h1>League Custom Group Stats</h1>
        <router-view></router-view>
      </div>

    </div>

  </div>
</template>

<script>

import Menu from "./components/Menu";
import DataDragon from "./api/DataDragon";
export default {
  name: 'App',
  components: {Menu},

  async created() {

    this.$store.commit('setChampionsData', await DataDragon.getChampionsData())

  }
}
</script>

<style lang="scss">

  .container-wrapper {
    display: flex;
    justify-content: center;
    background-color: #eee;
    padding: 1em;
    .container {
      background-color: #fff;
      padding: 1em;
      width: 1200px;
      box-shadow: 0px 0px 4px 0px #000;
    }

  }

  a, .link {
    text-decoration: none;
    color : #0f6674;

     &:hover {
       cursor: pointer;
       text-decoration: underline;
       color : #0c5460;
     }
  }

</style>
