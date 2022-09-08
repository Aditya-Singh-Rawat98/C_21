var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}


function draw() {
  background(255);
 if(tower.y > 400){
      tower.y = 300
    } 
  
  if (gameState === "play") {

    if(keyDown("left_arrow")){
        ghost.x = ghost.x - 3;
    }
    if(keyDown("up_arrow")){
         ghost.x = ghost.x + 3;
    }
    if(keyDown("space")){
         ghost.velocityY = -10;
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  

    
    
      spawnDoors();

  
//write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
     if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy()
      gameState = "end"
    }
    
  
  drawSprites();
}
  if (gameState === "end"){
    background("black");
    stroke("red");
    fill("red");
    textSize(30);
    text("Game Over", 230,250)
    ghost.destroy();
  }
}

function spawnDoors()
 {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    x = Math.round(120,400)
    var door = createSprite(x, -50);
    var climber = createSprite(x,10);
    var invisibleBlock = createSprite(x,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //add the random function
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
     
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;


    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
     
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

