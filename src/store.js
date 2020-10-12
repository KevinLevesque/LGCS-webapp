import Vue from 'vue'
import Vuex from "vuex"
import Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({

    state: {

        isAdmin : Cookies.get('token') !== undefined,
        adminMode : false,

        championsData : []

    },

    mutations: {
        setAdminMode(state, payload){
            state.adminMode = payload
        },
        setIsAdmin(state, payload){
            state.isAdmin = payload
            state.adminMode = payload
        },

        setChampionsData(state, payload){
            state.championsData =payload
        }
    }

});