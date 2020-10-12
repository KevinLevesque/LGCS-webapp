<template>


    <nav>
        <ul>
            <li><router-link :to="{name : 'index'}">Index</router-link></li>
            <li><router-link :to="{name : 'raw-data'}">Données brutes</router-link></li>
            <li><span class="link" @click="addMatch" v-if="$store.state.adminMode">+ Ajouter une partie</span></li>
            <li><input type="checkbox" v-if="$store.state.isAdmin" v-model="$store.state.adminMode"><span class="link" @click="login">Accès administrateur</span></li>
        </ul>
    </nav>


</template>

<script>


    import Matches from "../api/Matches";
    import Auth from "../api/Auth";

    export default {
        name: 'Menu',

        data() {
            return {}
        },


        methods: {
            async addMatch() {
                let matchId = prompt("Id du match :");

                if(matchId){
                    await Matches.syncMatch(matchId);
                    await this.$router.push({name : 'match', params : {matchId : matchId}});
                }
            },

            async login() {

                if(this.$store.state.isAdmin){
                    this.$store.commit('setAdminMode', !this.$store.state.adminMode)
                    return;
                }
                const password = prompt('Mot de passe');
                if(password){
                    await Auth.login(password);
                }


            }
        },


        computed: {},


        async created() {
        }
    }
</script>

<style lang="scss">

    nav{
        ul {
            list-style: none;
            display: flex;
            justify-content: flex-end;

            li {
                &:not(:first-child){
                    margin-left: 1em;
                }
            }
        }
    }

</style>
