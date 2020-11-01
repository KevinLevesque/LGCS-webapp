export default {


    winRate(stats) {
        if (stats.wins + stats.losses === 0)
            return 0;

        return stats.wins / stats.picks;
    },


}