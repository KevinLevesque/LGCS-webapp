<template>
  <div id="app">
    <div class="container-wrapper">
      <div class="container">

        <div class="flex header">
          <h1>League Custom Group Stats</h1>
          <Menu></Menu>
        </div>



        <router-view></router-view>
      </div>

    </div>

  </div>
</template>

<script>

import Menu from "./components/Menu";
import DataDragon from "./api/DataDragon";
import Matches from "./api/Matches";
export default {
  name: 'App',
  components: {Menu},

  async created() {

    this.$store.commit('setChampionsData', await DataDragon.getChampionsData())
    this.$store.commit('setMatchesAmount', await Matches.getMatchesAmount())

  }
}
</script>

<style lang="scss">

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;

  }

  h1 {
    margin: 0;
  }


  .header {
    border-bottom: 2px solid #eee;
    margin-bottom: 2em;
  }


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

  .mt-1{
    margin-top: 1em;
  }

</style>
