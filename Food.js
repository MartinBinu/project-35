class Food{

   constructor(){
      this.foodStock = null;
      this.lastFed = null;
      this.milk = loadImage("Milk.png");
   }

   updateFoodStock(x){
      database.ref("/").update({
         food:x
      })
   }

   updateLastFed(lastFed){
      database.ref("/").update({
         FeedTime:lastFed
      })
   }

   deductFood(){
      this.foodStock-=1; 
   }

   getFoodStock(){
      var databaseRef=database.ref("food");
      databaseRef.on("value", function(data){
          this.foodStock = data.val();
      })
   }

   display(){
console.log(foodStock)
      var x=30,y=80;

      for(var i=0;i<foodS;i++){

         if(i%10===0){

            x=30;
            y=y+45;

         }

         image(this.milk,x,y,50,50)
         x=x+30;

      }

   }

}
