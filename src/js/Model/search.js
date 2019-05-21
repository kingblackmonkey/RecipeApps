import axios from 'axios'

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getSearchResult(){
        let key = 'c91c51ac267d0b8413dba35491bc1e98';
        let result = await axios(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
        
        this.results = result.data.recipes

    }


}

