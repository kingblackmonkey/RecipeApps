
import {elements} from '../base'






let makeTheToggling = (likedList, selector)=>{
    let str = '';

 likedList? str= 'heart': str= 'heart-empty';

let html =`
    <ion-icon name="${str}"></ion-icon> 
`
    document.querySelector(`${selector}`).innerHTML = '';
    document.querySelector(`${selector}`).insertAdjacentHTML('beforeend', html)
}



export let  displayLikedList = (likedRecipes)=>{
    elements.likedListContainer.innerHTML="";
    likedRecipes.forEach(item => {
          let html = `
    <li>
        <a href="#${item.id}" class="like-list-item">
        <div class="like-list-item-img">
            <img src="${item.img}" alt="like list image">
        </div>
        <div class="like-list-info">
            <h3 class="like-list-item-title">${item.title}</h3>
            <p class="like-list-item-author">${item.author}</p> 
        </div>                            
        </a>
    </li>    
    `
   
    elements.likedListContainer.insertAdjacentHTML('beforeend', html);
    });

  
//    toggle heart icon in like list panel since there is liked recipe in
//like list panel
    makeTheToggling(true,'.icon-like-list');
  
}

export let removeLikedRecipe= (hashNum)=>{
    
    let listItem = document.querySelector(`.like-list [href="${hashNum}"]`).parentElement;    
    let listItemContainer = listItem.parentElement;
    listItemContainer.removeChild(listItem);
    //  toggle heart icon in like list panel
    //if there is at least one  liked recipe in panel like list we keep full heart
    //if not we show empty heart
    if(!listItemContainer.childElementCount){
        makeTheToggling(false,'.icon-like-list');
    }
}


export let toggleHeartBtn = (likedList)=>{
    makeTheToggling(likedList, ".like-heart-btn")

}