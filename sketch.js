//Create variables here

var dog,happyDog,starvingDog,foodS,foodStock;
var addMilkButton,feedButton,foodObj;

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

   foodStock = database.ref("food");
   foodStock.on("value",readStock);

}


function draw() {  

   background(46, 139, 87);

   if(keyWentDown("UP_ARROW")){
      dog.addImage(happyDog);
      writeStock(foodS);
   }

   if(keyWentUp("UP_ARROW")){
      dog.addImage(starvingDog);
   }
   
   drawSprites();

   //add styles here
  text("Note: PRESS UP arrow to feed milk to the dog",150,375);
  textSize(5);
  fill(white);
  stroke();

}

function readStock(data){
   foodS = data.val();
}

function writeStock(x){
   if(x<=0){
      x = 0;
   } 
   else{
      x = x-1;
   }

   database.ref('/').update({
      food:x  
   })
}
