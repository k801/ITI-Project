
let allRecipes = [];
let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');
let recipesRow1 = document.getElementById('recipesRow1');
let recipeDetailsDiv = document.getElementById('recipeDetails');
let recipesRow2 = document.getElementById('recipesRow2');
let recipesRow3 = document.getElementById('recipesRow3');
let recipesRow4 = document.getElementById('recipesRow4');

$(document).ready(function(){

   $("#home-tab").click(getRecipe('pasta',1));
   $("#contact-tab").click(getRecipe('pizza',2));
   $("#myTabContent").click(getRecipe('pumpkin',3));
   $("#suger").click(getRecipe('leek',4));

// $(".spinner").remove();
// $('#loading').hide().empty();

  
   $(".spinner").fadeOut(1000,function(){
      $("#loading").fadeOut(1000,function(){
         $("body").css("overflow","auto");
      });
   })
   
});


async function getRecipe(term,id=1)
{
let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);//Async
      apiResponse = await  apiResponse.json();
      allRecipes = apiResponse.recipes;
      displayAllRecipes(id);


}


function  displayAllRecipes(id=1) { 

   let cartoona = ``;
   for (let i = 0; i < allRecipes.length; i++) {
     
      let myId = "'"+allRecipes[i].recipe_id+"'";


         cartoona +=` <div  class="col-md-3   py-2 my-1  card ">
        
         <div class="recipe">
        
         <div class="position-relative img-container">
         <img src="${allRecipes[i].image_url}" class="w-100 rounded img-item" alt="">
         </div>
             <h6 class="color-min font-weight-bolder py-2 text-secondary">${allRecipes[i].title}</h6>
             <p>${allRecipes[i].publisher}</p>
             <button class="details margin-auto" onclick="getRecipeDetails(${myId})" > Details</button>
             <button class="cart "><i class="fas fa-shopping-cart" ></i></button>
           </div>
       </div>`;
   }


if(id==1)
{
   recipesRow1.innerHTML = cartoona;

}
else if(id ==2)
{
   recipesRow2.innerHTML = cartoona;

}
else if(id==3){

   recipesRow3.innerHTML = cartoona;

}else if(id=4)
{

   recipesRow4.innerHTML = cartoona;

}


}

async function getRecipeDetails(id)  
{
   let recipeDetails ; 

   let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
      apiResponse = await apiResponse.json();
      recipeDetails = apiResponse.recipe;

      
      showRecipeDetails(recipeDetails)
   }


   var closeIcon = document.getElementById("close");



      function showRecipeDetails(recipeDetails)
      {
         let cartoona = ` <h4 class="text-center font-weight-bolder">${recipeDetails.title}</h4>
         <i id="close"  onclick="closeLightBox()" class="far fa-times-circle fa-10x"></i>

         <img src="${recipeDetails.image_url}" class="w-40 m-auto">
         <ul>`;
            for (let i = 0; i < recipeDetails.ingredients.length; i++) 
            {
               cartoona +=`<li class='font-weight-bolder pt-1'>${recipeDetails.ingredients[i]}</li>`;
            }
                    cartoona += `</ul>
               `;
               
       
               lightboxcontainer.style.display="flex";
               lightboxitem.innerHTML=cartoona;

}


function closeLightBox()
{
    lightboxcontainer.style.display ="none";
}

   var lightboxcontainer = document.getElementById("lightboxcontainer");
   var lightboxitem = document.getElementById("lightboxitem");
   var closeIcon = document.getElementById("close");
   var prevIcon = document.getElementById("prev");
   var nextIcon = document.getElementById("next");
   var currentIndex = 0;
   

function openLightBox()
{    

    lightboxcontainer.style.display ="flex";

  lightboxitem.innerHTML='imgSrc';
}

function slide( x ) {
    currentIndex += x;
    if(currentIndex == imgs.length)
    {
        currentIndex = 0;
    }
    else if(currentIndex < 0)
    {
        currentIndex = imgs.length-1;
    }
    var imgSrc = imgs[currentIndex].src;
    lightboxitem.style.backgroundImage = `url(${imgSrc})`;
  }

 
  var closeIcon = document.getElementById("close");


function nextSlide()
{
   
    currentIndex++;//1
    if(currentIndex == imgs.length)////6
    {
        currentIndex=0;
    }
    var imgSrc =  imgs[currentIndex].src;
    var imgSrc=`url('${imgSrc}')`;

    lightboxitem.style.backgroundImage=imgSrc;
}


function prevSlide()
{
    currentIndex--;//-1
    if(currentIndex < 0)
    {
        currentIndex = imgs.length - 1;
    }
    var imgSrc =  imgs[currentIndex].src;
    var imgSrc=`url('${imgSrc}')`;

    lightboxitem.style.backgroundImage=imgSrc;
}



document.addEventListener("keydown",function(e){

   if (e.key === 'ArrowLeft') {
      
   nextSlide();
}
else if (e.key === 'ArrowRight') {
   {
   prevSlide();
   }
}
}
);
