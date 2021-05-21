
var travellerImg,traveller,traveller_collided;
var ground, invisiGround, groundImg,backgroundImg;
var  obstacle, obstacleImage,gameOverImg,restartImg;
var obstacleGroup;
var score = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  stoneImg=loadImage("Images/obstacle.png")
  backgroundImg=loadImage("Images/Jungle.png")
  travellerImg=loadAnimation("Images/Traveller1.png","Images/Traveller2.png","Images/Traveller3.png","Images/Traveller5.png","Images/Traveller6.png","Images/Traveller7.png","Images/Traveller8.png")
  gameOverImg=loadImage("Images/Game Over.png")
  restartImg=loadImage("Images/restart.png")
  traveller_collided=loadImage("Images/Traveller2.png")
  monkeyImg=loadAnimation("Images/Monkey_01.png","Images/Monkey_02.png","Images/Monkey_03.png","Images/Monkey_04.png","Images/Monkey_05.png","Images/Monkey_06.png","Images/Monkey_07.png","Images/Monkey_08.png","Images/Monkey_09.png","Images/Monkey_10.png")
  obstacleImage = loadImage("Images/obstacle.png");
 monkey_won=loadImage("Images/Monkey_Won.png")
power1Img=loadImage("Images/Power1.png")

}


function setup(){
 createCanvas(2048,1005);
  obstacleGroup = createGroup();

  gameOver=createSprite(600,502.5,2048,1005)
  gameOver.addImage(gameOverImg)
  gameOver.visible=false;
  gameOver.scale=1.5


  power1 = createSprite(2000,730,50,50);
  power1.scale=0.08
  power1.velocityX=-13
  power1.addImage(power1Img)

 
  traveller = createSprite(400,500,10,10);
  traveller.scale=0.9;
  traveller.addAnimation("explorer", travellerImg);
  traveller.addAnimation("collide", traveller_collided);

  monkey = createSprite(200,700,10,10)
  monkey.scale=0.4;
  monkey.addAnimation("apes",monkeyImg)
  monkey.addAnimation("win",monkey_won)
  
    
  ground = createSprite(300,500,2000,7);
  ground.visible=false;
  
  invisiGround = createSprite(300,800,600,7);
  invisiGround.visible = false;
  
  spawnPower1()

}

function draw(){
  background(backgroundImg);
  background.setVelocityXEach=-10

  fill("white");
  textSize(50)
  text("SURVIVAL TIME: "+score, 500, 50);
  text("The Rockets are High Jump Power Boosters", 500, 100);
  text("They help you Jump high ", 500, 150);

  camera.position.x=traveller.x+200;

   
  if (gameState === PLAY){
    obstacles();
    spawnPower1();
 
    score = score + Math.round(getFrameRate()/50);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("up") && traveller.y >= 150) {
      traveller.velocityY = -15; 
    }

    
    traveller.velocityY = traveller.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    

    
    if (traveller.isTouching(obstacleGroup)){
      gameState = END;
    }

    if (traveller.isTouching(power1)){
      traveller.velocityY = -40; 
      traveller.collide(ground);

    }

    
  }
  
  else if (gameState === END){
    score=0;
    background(gameOverImg)
    traveller.visible=false;
    monkey.changeAnimation("win",monkey_won)
    monkey.scale=2.9
obstacleGroup.visible=false;
   
    fill("red")
    stroke("black")
    textSize(70);
    text("GAMEOVER!!! The King Of Apes has eaten you!!", 5, 55);
    fill("yellow");
    textSize(50);
    text("Press 'R' to play again", 500, 200);
    
    if (keyDown('R')){
      score = 0;
      obstacleGroup.destroyEach();
      traveller.changeAnimation("explorer", travellerImg);
      traveller.visible=true;
      monkey.changeAnimation("apes",monkeyImg)
      monkey.scale=0.5
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
  traveller.collide(invisiGround);
  spawnPower1();
}

  


function obstacles(){
  if (frameCount%150 === 0){
    
    obstacle = createSprite(2600,800,50,50);
    obstacle.addImage(stoneImg);
    obstacle.scale = 0.10 ;
    obstacle.velocityX = -15;
    obstacle.lifetime = 600;
    obstacleGroup.add(obstacle);
    
  }
  
  
}


function spawnPower1(){
  if (frameCount % 5000 === 0) {
    power1.addImage(power1Img);
    power1.scale = 0.10 ;
    power1.velocityX = -15;
    power1.lifetime = 600;
    }

}




