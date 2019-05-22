

import Search from '../Model/search'
import {elements} from  '.././base'
import * as searchView from '.././View/SearchView'

// data storage
let data = {};
window.data = data;



// ============== Search Controller=============================
//event handler for search button
let  search = async (evt)=>{
// prevent button default from submitting and reloading the page in the form
event.preventDefault();

     //get query from user 
  let query = searchView.getQuery();
 
  if(query){
      //go get result based on provided query
       data.searchResult = new Search(query)
       await data.searchResult.getSearchResult();
       //display result of search query
       searchView.displayResult(data.searchResult.results)
      //display pagination button for default page 1
       searchView.renderPaginationButtons(); 
      
       // ======================= pagination buttons Controller using jquery because precoded code was written in jquery
     //event handler delegation for buttons
       $(elements.resultContainer).on('click','.cdp_i', function(){
          //navigate pages when user click on pagination buttons
          let actPage = searchView.navigatePages($(this),data.searchResult.results.length);
          //render results according to page
          searchView.displayResult(data.searchResult.results, actPage)

       })
  }
  
}
elements.searchBtn.addEventListener('click', search)



