<template>

  <div>
    <h2>Liste des matchs</h2>
    <MatchesList></MatchesList>


    <h2>Statistiques des champions</h2>
    <champions-stats-table :total-match-amount="matches.length"></champions-stats-table>

    <h2>Statistiques des joueurs</h2>
    <PlayersStatsTable class="mt-1" :total-match-amount="matches.length"></PlayersStatsTable>




  </div>



</template>

<script>

  import Matches from "../../api/Matches";
  import DataDragon from "../../api/DataDragon";
  import ChampionsStatsTable from "../ChampionsStatsTable";
  import MatchesList from "../MatchesList";
  import PlayersStatsTable from "../PlayersStatsTable";

export default {
  name: 'Index',
  components: {PlayersStatsTable, MatchesList, ChampionsStatsTable},
  data() {
    return{
      matches : [],
      championsStats : []
    }
  },

  methods : {



    async addMatch() {
      let matchId = prompt("Id du match :");

      if(matchId){
        await Matches.syncMatch(matchId);
        await this.$router.push({name : 'match', params : {matchId : matchId}});
      }
    },

    async getChampionImageUrl(name) {
      return await DataDragon.getChampionSquareAsset(name)
    },
  },

  async created() {
    this.matches = await Matches.getMatches();

  }
}
</script>

<style lang="scss">


</style>
