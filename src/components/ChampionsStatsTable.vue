<template>

    <vue-good-table style-class="champions vgt-table bordered" :columns="columns" :rows="rows"
                    :sort-options="{enabled : true, initialSortBy: {field: 'champion', type: 'asc'}}"
                    v-if="loaded"
                    :pagination-options="{enabled: true, mode: 'records',perPage: 10}">
        <template slot="table-row" slot-scope="props">
            <template v-if="props.column.field === 'championImage'">
                <img :src="props.row.imageUrl" />
            </template>
            <template v-else-if="props.column.field === 'champion'">
                <router-link :to="{name : 'champion', params : { name : props.row.champion }}">{{props.row.champion}}</router-link>
            </template>
        </template>
    </vue-good-table>


</template>

<script>

    import Champions from "../api/Champions";
    import DataDragon from "../api/DataDragon";
    import ChampionStatsHelper from "../Helpers/ChampionStatsHelper";

    export default {
        name: 'ChampionsStatsTable',

        data() {
            return {
                columns: [
                    {label: '', field: 'championImage', sortable: false},
                    {label: 'Champion', field: 'champion'},
                    {label: 'Victoires', field: 'wins', type: 'number'},
                    {label: 'Victoire %', field: 'winRate', type: 'percentage'},
                    {label: 'Défaites', field: 'losses', type: 'number'},
                    {label: 'Défaites %', field: 'lossRate', type: 'percentage'},
                    {label: 'Picks', field: 'picks', type: 'number'},
                    {label: 'Pick %', field: 'pickRate', type: 'percentage'},
                    {label: 'Bans', field: 'bans', type: 'number'},
                    {label: 'Ban %', field: 'banRate', type: 'percentage'},
                ],
                rows: [],
                loaded: false
            }
        },


        props: {
        },


        methods: {



        },


        computed: {
            totalMatches() {
                return this.$store.state.matchesAmount;
            }
        },


        async created() {
            this.championsStats = await Champions.getAllStats();


            for (const stats of this.championsStats) {
                const url = await DataDragon.getChampionSquareAsset(stats.champion.name);
                this.rows.push({
                    imageUrl: url,
                    champion: stats.champion.name,
                    wins: stats.wins,
                    winRate: ChampionStatsHelper.winRate(stats),
                    losses: stats.losses,
                    lossRate: ChampionStatsHelper.lossRate(stats),
                    picks: stats.picks,
                    pickRate: ChampionStatsHelper.pickRate(stats),
                    bans: stats.bans,
                    banRate: ChampionStatsHelper.banRate(stats)
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
                    max-width: 50px;
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
