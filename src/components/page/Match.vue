<template>

    <div v-if="match">
        <router-link :to="{name : 'index'}"> &lt; Retour à l'index</router-link>


        <div>
            Match du {{match.date | shortDate}} à {{match.date | shortTime}}
        </div>


        <MatchTable :match="match" :editable="$store.state.adminMode"></MatchTable>

    </div>


</template>

<script>

    import Matches from "../../api/Matches";
    import MatchTable from "../MatchTable";

    export default {
        name: 'Match',
        components: {MatchTable},
        data() {
            return {
                match: undefined,
            }
        },

        methods: {

        },


        async created() {
            this.match = await Matches.getMatch(this.$route.params.matchId);

        }
    }
</script>

<style>

</style>
