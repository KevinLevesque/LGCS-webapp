<template>


    <vue-good-table :columns="columns" :rows="participationsRows">
        <template slot="table-row" slot-scope="props">
            <template v-if="props.column.field == 'match'">
                <router-link :to="{name : 'match', params : {matchId : props.row.matchId}}">{{props.row.matchDate |
                    shortDate}} à {{props.row.matchDate | shortTime}}
                </router-link>

            </template>
            <template v-else-if="props.column.field == 'champion'">
                <router-link :to="{name : 'champion', params : {name : props.row.champion}}">{{props.row.champion}}
                </router-link>
            </template>
        </template>
    </vue-good-table>


</template>

<script>

    import DataDragon from "../api/DataDragon";
    import MatchesHelper from "../Helpers/MatchesHelper";

    export default {
        name: 'PlayerMatchesTable',

        data() {
            return {
                columns: [
                    {label: 'Match', 'field': 'match'},
                    {label: 'Champion', 'field': 'champion'},
                    {label: 'KDA', 'field': 'kda'},
                ]
            }
        },

        props: {
            matches: {
                type: Array,
                required: true
            },
            playerUsername: {
                type: String,
                required: true
            },
        },

        methods: {
            async getChampionImageUrl(name) {
                return await DataDragon.getChampionSquareAsset(name)
            },

            getKDA(participant) {
                return participant.kills + "/" + participant.deaths + "/" + participant.assists;
            },


            getPlayerParticipations(name) {
                let participations = [];
                for (const match of this.matches) {
                    const participation = MatchesHelper.getPlayerParticipation(match, name);
                    if (participation) {
                        participations.push(participation);
                    }

                }

                return participations;
            }


        },


        computed: {

            participationsRows() {
                let participations = [];
                let rows = []
                participations = this.getPlayerParticipations(this.playerUsername);

                for (const participation of participations) {
                    rows.push({
                        matchId: participation.matchId,
                        matchDate: participation.matchDate,
                        champion: participation.participant.champion.name,
                        kda: this.getKDA(participation.participant),
                        victory: participation.victory
                    })
                }

                return rows;
            }

        },


        async created() {

        }
    }
</script>

<style lang="scss">

    table.match {

        width: 100%;

        tr {
            td, th {

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
