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

}