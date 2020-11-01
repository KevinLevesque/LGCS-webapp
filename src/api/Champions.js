import axios from "axios";

export default {


    async getAllStats() {
        const response = await axios.get('/champions/stats');
        return response.data;
    },

    async getStats(name) {
        const response = await axios.get('/champions/' + name + '/stats');
        return response.data;
    },

    async getMatches(name) {
        const response = await axios.get('/champions/' + name + '/matches');
        return response.data;
    }

}