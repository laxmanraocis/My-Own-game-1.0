var bg, bgImage;
var player, playerImage;
var ground;
var start,startImage;
var playButton, playButtonImg;
var obstacles, obGroup;

var gameState = "start";

function preload(){
  bgImage = loadImage("road4.jpg");
  startImage = loadImage("bg1.png");
  playButtonImg = loadImage("playButton.png");
}

function setup(){
  createCanvas(1400,700);

  obGroup = new Group();

  start = createSprite(700,400,1400,700);
  start.addImage("b1",startImage);
  start.scale = 1.2;

  bg = createSprite(700,400,1400,700);
  bg.addImage("b2",bgImage);
  bg.velocityX = -7;
  bg.scale = 2;

  bg.visible = false;

  player = createSprite(200,380,20,50);
  player.scale = 1;
  player.shapeColor = "red";

  player.visible = false;

  ground = createSprite(700,410,1400,10);
  ground.visible = false;

  playButton = createSprite(700,400);
  playButton.addImage("play",playButtonImg);
  playButton.scale = 0.6;
  

}

function draw(){
  background(0);
  drawSprites();

  if(gameState === "start"){
    if(mousePressedOver(playButton)){
      gameState = "play";

    }

  }

  else if(gameState === "play"){
    start.visible = false;
    playButton.visible = false;
    bg.visible = true;
    player.visible = true;
    ground.visible = true;

    if(bg.x < 0){
      bg.x = 600;

    }

    if(keyDown("space")){
      player.velocityY = -10;

    }

    player.velocityY = player.velocityY + 0.5;

    player.collide(ground);

    spawnObstacles();

    if(player.isTouching(obGroup)){
      gameState = "end";

    }
}
 

else if(gameState === "end"){
  bg.velocityX = 0;
  obGroup.destroyEach();
  textSize(100);
  fill("red");
  text("GAME OVER",400,250);

}

}

function spawnObstacles(){
  if(frameCount % 150 === 0){
    obstacles = createSprite(1400,380,20,50);
    obstacles.velocityX = -7;
    obstacles.lifetime = 300;
    obstacles.shapeColor = "blue";
    obGroup.add(obstacles);

  }
}

