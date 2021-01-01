
//Create variables here
var dog,happyDog,starvingDog,foodS,foodStock,milk;
var addMilkButton,feedButton,foodObj,fedTimeRef,lastFed,nextFeedTime;

function preload(){

   //load images here
   starvingDog = loadImage("Stravingdog.png");
   happyDog = loadImage("Happydog.png"); 

}

function setup() {

   createCanvas(500, 500);

   foodObj = new Food();

   dog = createSprite(400,250,20,20);
   dog.addImage(starvingDog);
   dog.scale = 0.15;

   database = firebase.database();

   feedButton = createButton("Feed the dog");
   feedButton.position(675,95);
   
   addMilkButton = createButton("Add Milk");
   addMilkButton.position(775,95);

   foodStock = database.ref("food");
   foodStock.on("value",readStock);

}


function draw() {  

   background(46, 139, 87);

   if(foodStock !== undefined){

      feedButton.mousePressed(function(){
         dog.addImage(happyDog);
         lastFed = hour();
         writeFoodStock(foodS);
         foodObj.updateLastFed(lastFed);
      })

      foodObj.display();

      feedButton.mouseReleased(function(){
         dog.addImage(starvingDog)
      })

      addMilkButton.mousePressed(function(){
         if(foodS === 0){
            foodObj.updateFoodStock(20);
         }
      })

   }

   fedTimeRef = database.ref('FeedTime');
   fedTimeRef.on("value",function(data){
      lastFed = data.val();
   });

   drawSprites();


   //add styles here
   textSize(15);
   fill(255,255,254);
   text("Note: PRESS Feed Button to feed milk to the dog,",100,375);
   text("PRESS Add Milk Button to add more milk",130,395);
   
   nextFeedTime = lastFed + 4;

   if(lastFed>=12){
      text("Last Feed : " + lastFed%12 + "PM",375,30);
   }else if(lastFed === 0){
      text("Last Feed : 12 AM",375,30);
   }else{
      text("Last Feed : " + lastFed + "AM",375,30);
   }

   text("Food: " + foodS,305,30);

   if(nextFeedTime>12){
      nextFeedTime = nextFeedTime - 12;
   }

   text("Next Feeding Time: " + nextFeedTime,145,30);

}

function readStock(data){
   foodS = data.val();
}

function writeFoodStock(num){

   if(num<=0){
      num = 0;
   }else{
      num = num -1;
   }

   database.ref('/').update({
      food : num
   })

}
