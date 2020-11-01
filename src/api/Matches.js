import axios from "axios";

export default {


    async getMatches() {
        const response = await axios.get('/matches');
        return response.data;
    },


    async getMatch(matchId) {
        const response = await axios.get('/matches/' + matchId);
        return response.data;
    },

    async getMatchesAmount() {
        const response = await axios.get('/matches/count');
        return response.data.count;
    },

    async setParticipantPlayer(matchId, participantId, playerUsername){
      await axios.post("/matches/" + matchId + "/participants/" + participantId + "/setPlayer", {
          username : playerUsername
      });
    },

    async syncMatch(matchId){
        await axios.post('/matches/sync', {
            matchId : matchId
        })
    }
}