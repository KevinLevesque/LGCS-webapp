<template>

  <div>
    <h2>Données brutes</h2>
    <MatchesRawTable></MatchesRawTable>
  </div>



</template>

<script>

  import Matches from "../../api/Matches";
  import DataDragon from "../../api/DataDragon";
  import ChampionsStatsTable from "../ChampionsStatsTable";
  import MatchesList from "../MatchesList";
  import PlayersStatsTable from "../PlayersStatsTable";
  import MatchesRawTable from "../MatchesRawTable";

export default {
  name: 'Index',
  components: {MatchesRawTable, PlayersStatsTable, MatchesList, ChampionsStatsTable},
  data() {
    return{
      matches : [],
      championsStats : []
    }
  },

  methods : {

  },

  async created() {

  }
}
</script>

<style lang="scss">


</style>
