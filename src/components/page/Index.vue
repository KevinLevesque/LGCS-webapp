<template>

  <div>
    <h2>Liste des matchs</h2>

    <table>
      <tr v-for="match in matches" :key="match.id">
        <td><router-link :to="{name : 'match', params : { matchId : match.id }}">{{match.date | shortDate}} à {{match.date | shortTime}}</router-link></td>
      </tr>
      <tr>
        <input type="button" value="+ Ajouter un match" @click="addMatch" />
      </tr>
    </table>


    <h2>Statistiques des champions</h2>

    <table rules="all" class="champions-stats">
      <tr>
        <th>Champion</th>
        <th>Wins</th>
        <th>Win %</th>
        <th>Losses</th>
        <th>Loss % </th>
        <th>Picks</th>
        <th>Pick %</th>
        <th>Bans</th>
        <th>Ban %</th>
      </tr>
      <tr v-for="stats in championsStats" :key="stats.champion.id">
        <td>
          <img :src="stats.champion.imageUrl" />
        </td>
        <td>
          {{ stats.wins }}
        </td>
        <td>{{ winRate(stats) | twoDecimals }}%</td>
        <td>
          {{ stats.losses }}
        </td>
        <td>{{ lossRate(stats) | twoDecimals }}%</td>
        <td>{{ stats.picks }}</td>
        <td>{{ pickRate(stats) | twoDecimals }}%</td>
        <td>{{ stats.bans }}</td>
        <td>{{ banRate(stats) | twoDecimals }}%</td>
      </tr>
    </table>


  </div>



</template>

<script>

  import Matches from "../../api/Matches";
  import Champions from "../../api/Champions";
  import DataDragon from "../../api/DataDragon";

export default {
  name: 'Index',

  data() {
    return{
      matches : [],
      championsStats : []
    }
  },

  methods : {

    winRate(stats){
      if(stats.wins + stats.losses === 0)
        return 0;

      let result = stats.wins / (stats.wins + stats.losses) * 100;
      return result;
    },

    lossRate(stats){
      if(stats.wins + stats.losses === 0)
        return 0;

      let result = stats.losses / (stats.wins + stats.losses) * 100;
      return result;
    },

    pickRate(stats){
      let result = stats.picks / this.matches.length * 100
      return result;
    },

    banRate(stats){
      let result = stats.bans / this.matches.length * 100
      return result;
    },

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
    this.championsStats = await Champions.getAllStats();

    for(const stats of this.championsStats){
      const url = await this.getChampionImageUrl(stats.champion.name);
      this.$set(stats.champion, 'imageUrl', url);
    }
  }
}
</script>

<style lang="scss">

  table.champions-stats {
    width: 100%;
    text-align: center;

    img {
    width: 75px;
    }


  }

</style>
