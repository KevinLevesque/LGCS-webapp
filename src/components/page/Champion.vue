<template>


    <div class="champion">

        <h1>{{ name }}</h1>

        <div class="flex">
            <div class="flex stats">
                <div>
                    <img :src="image"/>
                </div>
                <div>
                    <template v-if="stats">
                        <div>
                            {{ stats.picks }} picks | {{ pickRate | percent }}
                        </div>
                        <div>
                            {{ stats.bans }} bans | {{ banRate | percent }}
                        </div>
                        <div>
                            {{ stats.wins }} victoires | {{ winRate | percent }}
                        </div>
                    </template>
                </div>


            </div>
        </div>


        <div v-if="matches" style="justify-self: flex-end">

            <ChampionMatchesTable :matches="matches" :champion-name="name"/>

        </div>


    </div>


</template>

<script>

    import Champions from "../../api/Champions";
    import ChampionMatchesTable from "../ChampionMatchesTable";
    import DataDragon from "../../api/DataDragon";
    import MatchesHelper from "../../Helpers/MatchesHelper";
    import ChampionStatsHelper from "../../Helpers/ChampionStatsHelper";

    export default {
        name: 'Champion',
        components: {ChampionMatchesTable},
        data() {
            return {
                name: null,
                matches: [],
                stats: null,
                image: null,
                winRate: null,
                pickRate: null,
                banRate: null,
            }
        },

        computed: {

            participations() {
                let participations = [];
                for (const match of this.matches) {
                    const participation = MatchesHelper.getChampionParticipation(match, this.name);
                    if (participation) {
                        participations.push(participation);
                    }
                }

                return participations;
            },
        },


        async created() {


            this.stats = await Champions.getStats(this.$route.params.name);
            this.matches = await Champions.getMatches(this.$route.params.name);

            this.name = this.stats.champion.name;
            this.image = await DataDragon.getChampionSquareAsset(this.name);

            this.winRate = ChampionStatsHelper.winRate(this.stats);
            this.banRate = ChampionStatsHelper.banRate(this.stats);
            this.pickRate = ChampionStatsHelper.pickRate(this.stats);

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
