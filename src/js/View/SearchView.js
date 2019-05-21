import {elements} from '../base'


export let getQuery = ()=>{
    let query = 'pizza';
    return query;
}


let makeHtmlString = (result)=>{
    let html = `
    <li>
        <a href="#${result.recipe_id}" class="result-recipe-item" >
            <div class="result-recipe-item-img">
                <img src="${result.image_url}" alt="recipe item image">
            </div>                            
        <h4 class="result-recipe-item-title">${result.title}</h4>
        </a>
    </li>   
    
    `
    return html;
}

export let displayResult = (results)=>{
   let html = '';
    results.forEach(result => {
       html =  makeHtmlString(result);
       elements.resultList.insertAdjacentHTML('beforeend',html)
    });
    
}