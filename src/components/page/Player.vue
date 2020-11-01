<template>


    <div class="player" v-if="username">

        <h1>{{ username }}</h1>

        <div v-if="matches" style="justify-self: flex-end">

            <PlayerMatchesTable :matches="matches" :player-username="username"/>

        </div>


    </div>


</template>

<script>

    import ChampionStatsHelper from "../../Helpers/ChampionStatsHelper";
    import PlayerMatchesTable from "../PlayerMatchesTable";
    import Players from "../../api/Players";

    export default {
        name: 'Champion',
        components: {PlayerMatchesTable},
        data() {
            return {
                username: null,
                matches: [],
                stats: null,
                winRate: null,
            }
        },

        computed: {



        },


        async created() {


            this.stats = await Players.getStats(this.$route.params.username);
            this.matches = await Players.getMatches(this.$route.params.username);

            this.username = this.stats.player.username;

            this.winRate = ChampionStatsHelper.winRate(this.stats);

        }
    }
</script>

<style>

    .champion .flex.stats {

        align-items: center;
        justify-content: center;
        font-size: 1.6em;

    }

    .champion .most-frequent-player{
        font-size: 1.6em;
    }

    .champion .flex.stats img {
        margin-right: 1em;
    }

</style>
