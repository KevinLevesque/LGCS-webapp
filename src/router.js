import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "./components/page/Index";
import Match from "./components/page/Match";
import MatchesRawTable from "./components/MatchesRawTable";
import Champion from "./components/page/Champion";
import Player from "./components/page/Player";

Vue.use(VueRouter);




const router = new VueRouter({
    mode: 'history',
    routes : [
        { path: '/', component: Index, name : 'index', },
        { path: '/match/:matchId', component: Match, name : 'match', },
        { path: '/champion/:name', component: Champion, name : 'champion', },
        { path: '/player/:username', component: Player, name : 'player', },
        { path: '/raw-data', component: MatchesRawTable, name : 'raw-data', },

        { path: '*', redirect: '/' }
    ]
});


export default router;