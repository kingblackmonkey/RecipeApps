
import axios from 'axios'






export default class Recipe{
    constructor(id){
        this.id = id;
    }

//get recipe 
async getRecipe(){

   
          let key = 'c91c51ac267d0b8413dba35491bc1e98';

    let recipe = axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id} `);
        recipe = await recipe;
        // console.log(recipe.data)
        this.title  =  recipe.data.recipe.title;
        this.author  =  recipe.data.recipe.publisher;
        this.author_url  =  recipe.data.recipe.publisher_url;
        this.source_url  =  recipe.data.recipe.source_url;
        this.ingredients  =  recipe.data.recipe.ingredients;
       this.img = recipe.data.recipe.image_url;
        this.servings = this.getServings();
        this.cookTime = this.getCookingTime();


}
//get servings 
getServings( type='', people = 4){
    
    if (type === 'inc') {
      people++  
    }else if(type === 'des'){
        people--
    }else{
        people = people
    }
    return people
}

//get cooking time
getCookingTime(){
    let cookTime =   Math.ceil(this.ingredients.length * (.5 + 1.8)) ;
    return cookTime;

}

//remove dash and unwated word and parenthesis and shorten units
transformIngredients() {
    let longUnits = ['ounces','ounce','teaspoon','teaspoons','Tablespoons','tablespoon','tablespoons','Tbsp'];
    let shortUnits = ['oz','oz','tspn', 'tspns','tbsps', 'tbsp','tbsp','tbsp'];

    this.ingredients = this.ingredients.map((ingredient)=>{
    //  remove dash in case of =>  "1 28-oz can crushed red tomatoes"

        ingredient=  ingredient.replace('-', ' ');        
        
        ingredient = ingredient.split(' ');
        // remove unwanted word after splash
        let index =  ingredient.indexOf('/');
        if(index > 0){
            ingredient.splice(index,3)
        }

        ingredient = ingredient.join(' ');
        // remove parenthesis
        ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
        // shorten units for each ingredient
        longUnits.forEach((unit,index)=>{
           ingredient = ingredient.replace(unit, shortUnits[index]);
        });
        return ingredient;
    })
    
    
    }

   //separate number,unit and ingredient
    manipulateIngredients(){
      let amount = '';
      let unit = '';
      let units = ['oz','tspn', 'tspns','tbsps', 'tbsp','pound', 'pounds', 'cup','cups'];
      let index = '';
      
        this.ingredients = this.ingredients.map((ingredient)=>{
            ingredient = ingredient.split(' ');
            // check if there is amount in the ingredient
            //filter returns an array of qualified elements
            //amount will hold array of qualified elements
         amount  = ingredient.filter((item)=>{
                if(parseInt(item)){return true}
                else{return false}
            });
            // if amount(amount or amounts are put in the array) is found then we splice it out
            //from original array then  we join amount array with plus sign and evaluate to a number; if not then amount is empty string
           // cases are 1 1/2 ; 1-1/2; 1
            if(amount.length > 0){
                amount.forEach((item)=>{
                    ingredient.splice(ingredient.indexOf(item),1);
                    
                })
              amount = amount.join('+');
                // console.log(amount)
                amount = eval(amount);
               
            }else{
                
                amount = '';
            }           
            
            // check if there is a unit in ingredient
                index = ingredient.findIndex((item)=>{
                return units.includes(item);
            })

            if(index > -1 ){
                [unit] = ingredient.splice(index,1)
                
            }else{
                unit = '';
            }
           
            return {
                amount,
                unit,
                stringIngredient:ingredient.join(' ')

            }


        });



    }

   


}