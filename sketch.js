//Create variables here

var dog,happyDog,starvingDog,foodS,foodStock;
var addMilkButton,feedButton,foodObj,fedTime,lastFed;

function preload()
{
   //load images here
   starvingDog = loadImage("Stravingdog.png");
   happyDog = loadImage("Happydog.png"); 

}

function setup() {

   createCanvas(500, 500);
  
   dog = createSprite(250,250,20,20);
   dog.addImage(starvingDog);
   dog.scale = 0.1;

   database = firebase.database();

   feedButton = createButton("Feed the dog");
   feedButton.position(700,95);
   feedButton.mousePressed(feedDog);

   addMilkButton = createButton("Add Milk");
   addMilkButton.position(800,95);
   addMilkButton.mousePressed(addFoods);

   foodObj = new Food();

}


function draw() {  

   background(46, 139, 87);

   fedTime = database.ref('FeedTime');
   fedTime.on("value",function(data){
      lastFed = data.val();
   });
   
   foodObj.display();

   drawSprites();

   //add styles here

   textSize(15);
   fill(255,255,254);
   text("Note: PRESS UP arrow to feed milk to the dog",150,375);
   
  if(lastFed>=12){
     text("Last Feed : " + lastFed%12 + "PM",350,30)
  }else if(lastFed === 0){
     text("Last Feed : 12 AM",350,30)
  }else{
     text("Last Feed : " + lastFed + "AM",350,30)
  }


  stroke()

}

function readStock(data){
   foodS = data.val();
   foodObj.updateFoodStock(foodS);
}


function feedDog(){

   dog.addImage(happyDog);

   foodObj.updateFoodStock(getFoodStock() - 1);
   database.ref('/').update({
      food : foodObj.getFoodStock(),
      feedTime : hour()
   })

}

function addFoods(){

   foodS++;

   database.ref('/').update({
      food : foodS
   })

}
