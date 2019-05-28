import Fraction from 'fraction.js'
import {elements} from '../base'




export let getId = ()=>{

    let id  = window.location.hash.replace('#','');
    return id;

}


let fractionalize = (amount)=>{
    if(amount){
        //    amount  = Math.round( amount * 10 ) / 10;  

    
        amount = (Math.round(amount * 10) / 10).toFixed(1);
    amount = new Fraction(amount);
    // console.log(amount)
     return amount.toFraction(true)
    }else{
        return '';
    }



}

let makeIngredientList = (ingredients)=>{
   ingredients =  ingredients.map((ingredient)=>{
        return `
        <li>
            <span class="recipe-ingredient-num">${ingredient.amount}</span>
            <span class="recipe-ingredient-unit">${ingredient.unit}</span>
            <span class="recipe-ingredient-string">${ingredient.stringIngredient}</span>
        </li>    
        
        `
       
    })


    return ingredients.join(' ');
}


// you need to format the recipe string too

export let  displayRecipe= (recipe)=>{
    // fractionalize the amount
    recipe.ingredients.forEach(ingredient => {
        ingredient.amount = fractionalize(ingredient.amount);

    });
    let html = `
    

    <div class="recipe-visual">
        <div class="recipe-visual-image">
            <img src="${recipe.img}" alt="recipe image">
        </div>
        <h2 class="recipe-visual-title">${recipe.title}</h2>
    </div> 
    
    <!-- recipe data -->
    <div class="recipe-data">
       
            <div class="recipe-time">
                <span class="icon-time">
                        <ion-icon name="alarm"></ion-icon>
                </span>
                <div class="recipe-time-info">
                    <span class="recipe-time-num">${recipe.cookTime}</span>
                    <span class="recipe-time-min">Mins</span>
                </div>
            </div>
    
            
            <div class="recipe-serving">
                <span class="icon-serving">
                        <ion-icon name="man"></ion-icon>
                </span>
                <div class="recipe-serving-info">
                    <span class="recipe-serving-num">${recipe.servings}</span>
                    <span class="recipe-serving-people">People</span>
                </div>
                <div class="recipe-serving-btn">
                    <button class="serving-btn serving-btn-increase" data-type="inc"><ion-icon name="add"></ion-icon></button>
                    <button class="serving-btn serving-btn-descrease" data-type="des"><ion-icon name="remove"></ion-icon></button>
                </div>
            </div>
            
            <div class="like-heart">
            <button class="like-heart-btn">
                <ion-icon name="heart-empty"></ion-icon>
            </button>
                    
            </div>
        </div>
    
    <!-- recipe ingredients -->
    <ul class="recipe-ingredient-list">
        ${makeIngredientList(recipe.ingredients)}       
    </ul>
    
    <!-- recipe direction -->
    <div class="recipe-direction">
        <h2 class="recipe-direction-heading">How To Cook It</h2>
        <p class="recipe-direction-text">
            This recipe is made by <span class="direction-author">${recipe.author}</span>
        </p>
        <a href="${recipe.author_url}" class="btn-direction" target="_blank">
            <span class="btn-direction-text">Direction</span>
            <span class="btn-direction-icon">
                    <ion-icon name="arrow-dropright"></ion-icon>
            </span>
        </a>               
    </div> 
    
    
    `
    elements.recipeResult.innerHTML ='';
    elements.recipeResult.insertAdjacentHTML('beforeend', html);
   
   
}



 // update amount based on servings and display on user interface 
 export let updateAmountForServings = (ingredients, servings)=>{
    let ratio = servings / 4;
    let amount = '';
    let ingredientNumContainer ='';
    //update amount and fractionalize it
    ingredients = ingredients.map((ingredient)=>{
        if(ingredient.amount){
        
           amount = eval(ingredient.amount) * ratio;
            //    console.log(amount)
           amount = fractionalize(amount);
        }
        return amount;
        
    });
    // display servings and amount on user interface
    

    console.log(ingredients);
    document.querySelector('.recipe-serving-num').innerHTML = servings;
    ingredientNumContainer =  Array.from(document.querySelectorAll('.recipe-ingredient-num')) ;
    ingredientNumContainer.forEach((item,index)=>{
        item.innerHTML = ingredients[index];
    })
}

