<template>

    <table class="match" cellspacing="0" cellpadding="0">
        <tr>
            <th colspan="3" class="blue">Équipe 1 <span v-if="match.winnerTeamColor == 'blue'">(Victoire)</span> </th>
            <th colspan="3" class="red">Équipe 2 <span v-if="match.winnerTeamColor == 'red'">(Victoire)</span></th>
        </tr>
        <tr v-for="index in teamMaxPlayers" :key="index">
            <td class="blue"><img :src="match.teams[0].participants[index-1].champion.imageUrl"/></td>
            <td class="blue">
                <select @change="setPlayer($event,0, index-1)" v-model="match.teams[0].participants[index-1].player" v-if="editable">
                    <option :value="match.teams[0].participants[index-1].player" >{{match.teams[0].participants[index-1].player ? match.teams[0].participants[index-1].player.username : ""}}</option>
                    <option v-for="player in playersNotSelected" :value="player" :key="player.id">{{player.username}}</option>
                    <option :value="{'id' : 'add'}">+ Ajouter un nouveau joueur</option>
                </select>
                <span v-else>{{ match.teams[0].participants[index-1].player ? match.teams[0].participants[index-1].player.username : match.teams[0].participants[index-1].champion.name }}</span>
            </td>
            <td class="blue">
                {{getKDA(match.teams[0].participants[index-1])}}
            </td>
            <td class="red">
                {{getKDA(match.teams[1].participants[index-1])}}
            </td>
            <td class="red">
                <select @change="setPlayer($event,1, index-1)" v-model="match.teams[1].participants[index-1].player" v-if="editable">
                    <option :value="match.teams[1].participants[index-1].player">{{match.teams[1].participants[index-1].player ? match.teams[1].participants[index-1].player.username : ""}}</option>
                    <option v-for="player in playersNotSelected" :value="player" :key="player.id">{{player.username}}</option>
                    <option :value="{'id' : 'add'}">+ Ajouter un nouveau joueur</option>
                </select>
                <span v-else>{{ match.teams[1].participants[index-1].player ? match.teams[1].participants[index-1].player.username : match.teams[1].participants[index-1].champion.name }}</span>
            </td>
            <td class="red"><img :src="match.teams[1].participants[index-1].champion.imageUrl"/></td>
        </tr>
    </table>


</template>

<script>

    import Matches from "../api/Matches";
    import DataDragon from "../api/DataDragon";
    import Players from "../api/Players";

    export default {
        name: 'MatchTable',

        data() {
            return {
                players : []
            }
        },

        props: {
            match : {
                type : Object,
                required : true
            },
            editable : {
                type : Boolean,
                default : false
            }
        },

        methods: {
            async getChampionImageUrl(name) {
                return await DataDragon.getChampionSquareAsset(name)
            },

            getKDA(participant) {
                return participant.kills + "/" + participant.deaths + "/" + participant.assists;
            },

            async setPlayer(e, teamIdx, participantIdx) {
                let player = this.match.teams[teamIdx].participants[participantIdx].player;
                if (player.id === "add") {
                    const username = prompt("Summoner's name du joueur :");
                    this.match.teams[teamIdx].participants[participantIdx].player = await Players.addPlayer(username);
                    player = this.match.teams[teamIdx].participants[participantIdx].player;
                    this.players.push(player);
                }

                await Matches.setParticipantPlayer(this.match.id, this.match.teams[teamIdx].participants[participantIdx].id, player.username);
            }
        },



        computed: {
            teamMaxPlayers() {
                return Math.max(this.match.teams[0].participants.length, this.match.teams[1].participants.length);
            },

            playersNotSelected(){
                return this.players.filter(player => {
                    for(const team of this.match.teams){
                        for(const participant of team.participants){
                            if(participant.player && participant.player.id === player.id){
                                return false;
                            }
                        }
                    }

                    return true;
                });
            }

        },


        async created() {
            this.players = await Players.getAll();


            for(const team of this.match.teams){
                for (const participant of team.participants){
                    this.$set(participant.champion, 'imageUrl', await this.getChampionImageUrl(participant.champion.name));
                }
            }
        }
    }
</script>

<style lang="scss">

    table.match {

        width: 100%;

        tr{
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
