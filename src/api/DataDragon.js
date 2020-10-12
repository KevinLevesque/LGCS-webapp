import store from "../store";

export default {


    async getChampionsData(){
        const response = await fetch("https://ddragon.leagueoflegends.com/cdn/10.20.1/data/en_US/champion.json");
        const data = await response.json();
        return data.data;
    },


    async getChampionSquareAsset(name) {

        const championKey = Object.keys(store.state.championsData).find(key => store.state.championsData[key].name === name);
        const champion = store.state.championsData[championKey];
        return 'https://ddragon.leagueoflegends.com/cdn/10.20.1/img/champion/' + champion.image.full;
    },

}