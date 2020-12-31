class Food{
    constructor(){
        this.foodStock=null;
        this.lastFed=null;
        this.milkBottle=loadImage("Milk.png");
    }
    getFoodStock(){
        var databaseRef=database.ref("food");
        databaseRef.on("value", function(data){
            this.foodStock=data.val();
        })
    }

    updateFoodStock(num){
        database.ref("/").update({
            food:num
        })
    }

    deductFood(){
        this.foodStock-=1;
    }
    updateLastFed(lastFed){
        database.ref("/").update({
            FeedTime:lastFed
        })
        
    }

    display(){
        var x=30,y=80;
        for(var i=0;i<foodStock;i++){
        if(i%10===0){
            x=30;
            y=y+45;
        }
        image(this.milkBottle,x,y,50,50)
        x=x+30;
        
        }
       

    }
}