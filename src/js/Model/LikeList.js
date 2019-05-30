


export default class LikeList{
    constructor(){
        this.likeList = [];
    }


   setLikedRecipe(id,img,title,author){
     
       let likedRecipe = {
        id,
        img,
        title,
        author
       };
       this.likeList.push(likedRecipe);
       //copy like list array to local storage 
       //so when refrshing the page we get back like ist array
       //we want to keep the liked recipes for user
       localStorage.setItem('likes',JSON.stringify(this.likeList));
       
   } 

   removeLikeRecipe(id){
  
      let   index  = this.likeList.findIndex((item)=>{
                        return item.id === id
                });
        
       
    this.likeList.splice(index,1);
     //update like list araycopy like list array to local storage 
       //so when refrshing the page we get back like list array
       //we want to keep the liked recipes for user
       localStorage.setItem('likes',JSON.stringify(this.likeList));
   }



   checkExistingLikedRecipe(hashNum){
     let index = -1;
    if(this.likeList.length > 0 ){
        index = this.likeList.findIndex((item)=>{
        return item.id === hashNum
});
       }

    if(index > -1){
        return true
    }else{
        return false
    }

    }  
}