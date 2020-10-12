<template>

    <vue-good-table :columns="columns" :rows="rows"></vue-good-table>


</template>

<script>

    import Matches from "../api/Matches";

    export default {
        name: 'MatchesRawTable',

        data() {
            return {
                columns: [
                    {label: 'Match ID', 'field': 'matchId', filterOptions: {enabled: true}},
                    {label: 'Joueur', 'field': 'username', filterOptions: {enabled: true, filterDropdownItems : this.players}},
                    {label: 'Victoire', 'field': 'win', filterOptions: {enabled: true, filterDropdownItems : ['true', 'false']}},
                    {label: 'Champion', 'field': 'champion', filterOptions: {enabled: true}},
                    {label: 'Kills', 'field': 'kills',  type : 'number'},
                    {label: 'Deaths', 'field': 'deaths',  type : 'number'},
                    {label: 'Assists', 'field': 'assists',  type : 'number'},
                    {label: 'Damage delt to champions', 'field': 'totalDamageDealtToChampions',  type : 'number'},
                    {label: 'Role', 'field': 'role', filterOptions: {enabled: true,filterDropdownItems : ['NONE', 'DUO_SUPPORT', 'DUO_CARRY', 'SOLO', 'DUO']}},
                    {label: 'Lane', 'field': 'lane', filterOptions: {enabled: true,filterDropdownItems : ['JUNGLE', 'BOTTOM', 'TOP', 'MIDDLE']}},

                ],
                rows: [],
            }
        },

        props: {},

        methods: {},


        computed: {},


        async created() {
            const matches = await Matches.getMatches();

            this.rows = [];


            for (const match of matches) {



                for (const team of match.teams) {



                    for (const participant of team.participants) {

                        let data = {}
                        data.matchId = match.id;
                        data.win = (match.winnerTeamColor === team.color);
                        data.username = participant.player ? participant.player.username : '???';
                        data.champion = participant.champion.name;
                        data.kills = participant.kills;
                        data.deaths = participant.deaths;
                        data.assists = participant.assists;
                        data.totalDamageDealtToChampions = participant.totalDamageDealtToChampions;
                        data.role = participant.role;
                        data.lane = participant.lane;

                        this.rows.push(data);


                    }

                }

            }
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
