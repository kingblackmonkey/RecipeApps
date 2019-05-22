import {elements} from '../base'


export let getQuery = ()=>{
    let query = elements.query.value;
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


// ================Pagination ====================
export let displayResult = (results, page = 1, resPerPage= 10)=>{
    elements.resultList.innerHTML = '';
    let startNumber = (page - 1) * resPerPage;
    let endNum = page * resPerPage
    // extract result into 10 results per page
    results  = results.slice(startNumber, endNum);

   let html = '';
    results.forEach(result => {
       html =  makeHtmlString(result);
       elements.resultList.insertAdjacentHTML('beforeend',html)
    });
    
}

// render default pagination
export let renderPaginationButtons = ()=>{
    //remove exitsing pagination buttons before render the new one
    //if pagination buttons exist then remove
    let paginationContainer = document.querySelector('.cdp');

    if(paginationContainer) elements.resultContainer.removeChild(paginationContainer);
    

   let html = ` <div class="content_detail__pagination cdp" actpage="1">
                        <a data-page="#!-1" class="cdp_i">prev</a>
                        <a data-page="#!1" class="cdp_i">1</a>
                        <a data-page="#!2" class="cdp_i">2</a>
                        <a data-page="#!3" class="cdp_i">3</a>			
                        <a data-page="#!+1" class="cdp_i">next</a>
                </div>
              `
        elements.resultContainer.insertAdjacentHTML('beforeend', html)      

}



// to  navigate to pages
export let navigatePages = (button, resultLength)=>{
   let totalOfPages = Math.ceil(resultLength / 10) ;
    let actPage = parseInt($('.cdp').attr('actpage'), 10);
    let dataPage = button.attr('data-page').replace('#!', '');
            if (dataPage === '+1' && actPage < totalOfPages ) {
              actPage++;
            } else if (dataPage === '-1' && actPage > 1 ) {
              actPage--;
             
            }       
            else{
               if(button.html() !== 'next' && button.html() !== 'prev' )
              actPage = parseInt(dataPage, 10);
            }
      
            
              $('.cdp').attr('actpage', actPage);    
              return actPage;     
          
}

