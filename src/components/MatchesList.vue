<template>

    <div class="matches">
        <vue-good-table :columns="columns" :rows="rows"
                        :sort-options="{enabled: true, initialSortBy: {field: 'date', type: 'desc'}}">
            <template slot="table-row" slot-scope="props">
                <template v-if="props.column.field === 'date'">
                    <router-link :to="{name : 'match', params : { matchId : props.row.matchId}}">{{props.row.date |
                        shortDate}} à {{props.row.date | shortTime}}
                    </router-link>

                </template>
                <template v-else-if="props.column.field === 'team1'">
                    <div class="players">
                        <div class="player" v-for="player in props.row.team1" :key="player.username">
                            <div>{{player.username}}</div>
                            <div><img :src="player.championImage"/></div>
                        </div>
                    </div>

                </template>
                <template v-else-if="props.column.field === 'team2'">
                    <div class="players">
                        <div class="player" v-for="player in props.row.team2" :key="player.username">
                            <div>{{player.username}}</div>
                            <div><img :src="player.championImage"/></div>
                        </div>
                    </div>
                </template>
            </template>
        </vue-good-table>
    </div>


</template>

<script>

    import Matches from "../api/Matches";
    import DataDragon from "../api/DataDragon";

    export default {
        name: 'MatchesList',

        data() {
            return {
                columns: [
                    {
                        label: 'Date',
                        field: 'date',
                        type: 'date',
                        dateInputFormat: "yyyy-MM-dd'T'HH:mm:ssXXXX",
                        dateOutputFormat: "yyyy-MM-dd 'à' HH:mm:ss"
                    },
                    {label: 'Équipe 1', field: 'team1', sortable: false, tdClass: 'bottom'},
                    {label: 'Équipe 2', field: 'team2', sortable: false, tdClass: 'bottom'}
                ],
                rows: []
            }
        },


        methods: {
            async getChampionImageUrl(name) {
                return await DataDragon.getChampionSquareAsset(name)
            },
        },

        computed: {},

        async created() {
            const matches = await Matches.getMatches();

            this.rows = await Promise.all(matches.map(async match => {
                return {
                    date: match.date,
                    matchId: match.id,
                    team1: await Promise.all(match.teams[0].participants.map(async participant => {
                        return {
                            username: participant.player ? participant.player.username : '???',
                            championImage: await this.getChampionImageUrl(participant.champion.name)
                        }
                    })),
                    team2: await Promise.all(match.teams[1].participants.map(async participant => {
                        return {
                            username: participant.player ? participant.player.username : '???',
                            championImage: await this.getChampionImageUrl(participant.champion.name)
                        }
                    }))
                }
            }));
        }
    }
</script>

<style lang="scss">

    .matches {

        table {

            width: 100%;

            tr {
                td {

                    vertical-align: middle;

                    &.bottom {
                        vertical-align: bottom;
                    }

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


            .players {
                display: flex;
                align-items: flex-end;

                .player {

                    flex-basis: 0;
                    flex-grow: 1;
                }

                img {
                    max-width: 50px;
                }
            }

        }
    }


</style>
