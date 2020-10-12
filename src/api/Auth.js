import axios from "axios";
import Cookies from 'js-cookie'
import store from "../store";

export default {

    setAuthorizationHeader(token){
        axios.defaults.headers.common['Authorization'] = token;
    },


    async login(password) {
        const response = await axios.post('/auth', {password : password});
        if(response.status === 200){
            const token = response.data.token;
            Cookies.set('token', token);
            this.setAuthorizationHeader(token);
            store.commit('setIsAdmin', true);
        }

    },

}