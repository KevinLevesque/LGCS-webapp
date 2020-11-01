import store from "../store";

export default {


    winRate(stats) {
        if (stats.wins + stats.losses === 0)
            return 0;

        return stats.wins / stats.picks;
    },

    lossRate(stats) {
        if (stats.wins + stats.losses === 0)
            return 0;

        return stats.losses / stats.picks;
    },

    pickRate(stats) {
        return stats.picks / store.state.matchesAmount;
    },

    banRate(stats) {
        return stats.bans / store.state.matchesAmount;
    },


}