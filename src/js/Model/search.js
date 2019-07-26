import axios from 'axios'
window.axios = axios;
export default class Search{
    constructor(query){
        this.query = query;
    }

    async getSearchResult(){
       
        let key = 'c91c51ac267d0b8413dba35491bc1e98';
        let result = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
        // console.log(result)
        this.results = result.data.recipes     
  
       
    }


}

