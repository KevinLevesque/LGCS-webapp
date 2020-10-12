<template>

    <vue-good-table style-class="champions vgt-table bordered" :columns="columns" :rows="rows"
                    :sort-options="{enabled : true, initialSortBy: {field: 'wins', type: 'desc'}}"
                    v-if="loaded">

    </vue-good-table>


</template>

<script>

    import Players from "../api/Players";

    export default {
        name: 'PlayersStatsTable',

        data() {
            return {
                columns: [
                    {label: 'Joueur', field: 'username'},
                    {label: 'Victoires', field: 'wins', type: 'number'},
                    {label: 'Victoires %', field: 'winRate', type: 'percentage'},
                    {label: 'Parties', field: 'games', type: 'number'},
                ],
                rows: [],
                loaded: false
            }
        },


        props: {
            totalMatchAmount: {
                type: Number
            }
        }
        ,


        methods: {

            winRate(stats) {
                if (stats.games === 0)
                    return 0;

                return stats.wins / stats.games;
            }
        },


        computed: {},


        async created() {
            const playersStats = await Players.getAllStats();


            for (const stats of playersStats) {
                this.rows.push({
                    username: stats.player.username,
                    wins: stats.wins,
                    winRate: this.winRate(stats),
                    games: stats.games
                });
            }

            this.loaded = true;
        }
    }
</script>

<style lang="scss">

    table.champions {

        width: 100%;

        tr {
            td {

                vertical-align: middle;

                img {
                    max-width: 75px;
                }

                text-align: center;

                &.blue {
                    background-color: #f5fafe;
                    border: 2px solid #2747e8;
                }

                &.red {
                    background-color: #fff3f3;
                    border: 2px solid #cb2124;
                }
            }
        }

    }

</style>
