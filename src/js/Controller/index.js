

import Search from '../Model/search'
import {elements} from  '.././base'
import * as searchView from '.././View/SearchView'
import * as recipeView from '.././View/RecipeView'
import Recipe from '.././Model/Recipe'
import LikeList from '.././Model/LikeList'
import * as likedListView from '.././View/LikeList'
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
  
    //remove unwanted word and parenthesis and shorten units in each ingredient
    data.recipe.transformIngredients();
    //separate amount,unit and ingrdient string for ingredients
    data.recipe.manipulateIngredients();
   
    // display recipe result into user interface    
    recipeView.displayRecipe(data.recipe);    
  }

      // get like list array from local storage and store it back to like list model
      // if there is like list in local storage then get it if nothen dont get it
    
    if(JSON.parse(localStorage.getItem('likes')).length){
    
      data.likedList.likeList =  JSON.parse(localStorage.getItem('likes')) ;
      //put liked recipes back to likelist panel
      //bug right here cause it display  same item from like list every time  the hash changes
    
        likedListView.displayLikedList(data.likedList.likeList);
        //check if current hash matching any id in like list and toggle like heart button for liked list
        let likedRecipe = data.likedList.likeList.findIndex((item)=>{
            return item.id === window.location.hash.replace('#','');
        })
        if (likedRecipe > -1)likedListView.toggleHeartBtn(true);     
      

    }
 

}


// hash change event and load event
window.addEventListener('load', recipe)
window.addEventListener('hashchange', recipe)

// ======================  btn increase, decrease,  and like heart Controller

data.likedList = new LikeList();
elements.recipeContainer.addEventListener('click',(evt)=>{
  // ============btn increase, decrease, controller
  if (evt.target.matches('.serving-btn, .serving-btn *') ){
    let servingButton = evt.target.closest('.serving-btn');
   
    // update serving ; defualt serving is 4;
    data.recipe.servings = data.recipe.getServings(servingButton.dataset.type, data.recipe.servings)
   
    // update amount based on  updated servings and display uppdated serving and updated amount on user interface
      recipeView.updateAmountForServings(data.recipe.ingredients, data.recipe.servings);
}

//========== like heart btn controller

  if(evt.target.matches('.like-heart-btn, .like-heart-btn *')){
     
    // should have afunction to check if there is existing liked recipe
    // if yes we dont add ; if no we add
   let existingLikedRecipe = data.likedList.checkExistingLikedRecipe(window.location.hash.replace('#',''))
    
     if(!existingLikedRecipe) {
       // add liked recipe into model 
        data.likedList.setLikedRecipe(data.recipe.id, data.recipe.img, data.recipe.title, data.recipe.author)
        //display liked recipe to user interface
        
      likedListView.displayLikedList (data.likedList.likeList);
        // toggle the heart of liked  recipe
      likedListView.toggleHeartBtn(!existingLikedRecipe);
     }else{
       //remove liked recipe from liked recipe model
      data.likedList.removeLikeRecipe(window.location.hash.replace('#',''));
      //remove liked recipe from user interface
      likedListView.removeLikedRecipe(window.location.hash);
      //toggle the heart of liked recipe
      likedListView.toggleHeartBtn(!existingLikedRecipe);
     }
    
      
     
    

    
  }


})