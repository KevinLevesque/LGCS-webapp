import axios from  'axios';

export default {

    champions : [],

    async loadChampions(){
        const response = await axios.get("https://ddragon.leagueoflegends.com/cdn/10.20.1/data/en_US/champion.json");
        this.champions = response.data.data;
    },


    async getChampionSquareAsset(name) {

        if(this.champions.length === 0){
            await this.loadChampions();
            console.log(this.champions);
        }
        const championKey = Object.keys(this.champions).find(key => this.champions[key].name === name);
        const champion = this.champions[championKey];

        return 'https://ddragon.leagueoflegends.com/cdn/10.20.1/img/champion/' + champion.image.full;
    },

}