<template>

    <div v-if="match">
        <div>
            <h2>Match du {{match.date | shortDate}} à {{match.date | shortTime}} (ID : {{match.id}})</h2>
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
