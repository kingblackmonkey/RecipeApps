

import Search from '../Model/search'
import {elements} from  '.././base'
import * as searchView from '.././View/SearchView'
import * as recipeView from '.././View/RecipeView'
import Recipe from '.././Model/Recipe'
// data storage
let data = {};
window.data = data;



// ============== Search Controller=============================
//event handler for search button
let  search = async (evt)=>{
// prevent button default from submitting and reloading the page in the form
event.preventDefault();
 try{
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
 }catch(err){
   console.log('no result back')
 }

 

 

  
}
elements.searchBtn.addEventListener('click', search)


//=========================== Recipe Controller ========================


// get recipe and display recipe
let recipe = async()=>{

  let id  = recipeView.getId();

  if(id){
     data.recipe = new Recipe(id)
     await data.recipe.getRecipe();
    //  console.log(data.recipe)
    //remove unwanted word and parenthesis and shorten units in each ingredient
    data.recipe.transformIngredients();
    //separate amount,unit and ingrdient string for ingredients
    data.recipe.manipulateIngredients();
   
    // display result into user interface    
    recipeView.displayRecipe(data.recipe);
    // console.log( data.recipe.ingredients)
  }


 

}


// hash change event and load event
window.addEventListener('load', recipe)
window.addEventListener('hashchange', recipe)

// ======================  btn increase, decrease,  and like heart Controller
elements.recipeContainer.addEventListener('click',(evt)=>{
if (evt.target.matches('.serving-btn, .serving-btn *') ){
    let servingButton = evt.target.closest('.serving-btn');
    console.dir(servingButton.dataset.type);
    // update serving ; defualt serving is 4;
    data.recipe.servings = data.recipe.getServings(servingButton.dataset.type, data.recipe.servings)
   
    // update amount based on  updated servings and display uppdated serving and updated amount on user interface
      recipeView.updateAmountForServings(data.recipe.ingredients, data.recipe.servings);
}
})