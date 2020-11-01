export default {


    getPlayerParticipation(match, playerUsername) {
        for(const team of match.teams){
            for(const participant of team.participants){
                if(participant.player && participant.player.username === playerUsername){
                    return {
                        matchId : match.id,
                        matchDate: match.date,
                        participant : participant,
                        victory : (team.color === match.winnerTeamColor)
                    }
                }
            }
        }

        return null;
    },

    getChampionParticipation(match, championName) {
        for (const team of match.teams) {
            for (const participant of team.participants) {
                if (participant.champion.name === championName) {

                    return {
                        matchId: match.id,
                        matchDate: match.date,
                        participant: participant,
                        victory: (team.color === match.winnerTeamColor)
                    }
                }
            }

        }

        return null;
    }


}