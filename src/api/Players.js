import axios from "axios";

export default {


    async addPlayer(username) {
        const response = await axios.post('/players', {
            username : username
        });
        return response.data;
    },

    async getAll() {
        const response = await axios.get('/players');
        return response.data;
    },

    async getMatches(username) {
        const response = await axios.get('/players/' + username + '/matches');
        return response.data;
    },

    async getAllStats() {
        const response = await axios.get('/players/stats');
        return response.data;
    },

    async getStats(username) {
        const response = await axios.get('/players/' + username + '/stats');
        return response.data;
    },

}