import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "./components/page/Index";
import Match from "./components/page/Match";
import MatchesRawTable from "./components/MatchesRawTable";

Vue.use(VueRouter);




const router = new VueRouter({
    mode: 'history',
    routes : [
        { path: '/', component: Index, name : 'index', },
        { path: '/match/:matchId', component: Match, name : 'match', },
        { path: '/raw-data', component: MatchesRawTable, name : 'raw-data', },

        { path: '*', redirect: '/' }
    ]
});


export default router;