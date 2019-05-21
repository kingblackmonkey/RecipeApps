

import Search from '../Model/search'
import {elements} from  '.././base'
import * as SearchView from '.././View/SearchView'

// data storage
let data = {};
window.data = data;



// ============== Search Controller=============================
//event handler for search button
let  search = async ()=>{
     //get query from user 
  let query = SearchView.getQuery();
 
  if(query){
      //go get result based on provided query
       data.searchResult = new Search(query)
       await data.searchResult.getSearchResult();
       //display resultof search query
       SearchView.displayResult(data.searchResult.results)


       
  }
  
}


elements.searchBtn.addEventListener('click', search)





