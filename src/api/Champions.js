import axios from "axios";

export default {


    async getAllStats() {
        const response = await axios.get('/champions/stats');
        return response.data;
    },

}