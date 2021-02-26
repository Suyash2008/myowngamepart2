
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
//const Body = Matter.Body;

var player,playerIm1,playerIm2,playerIm3,playerIm4,playerCar;
var ghost,ghostCar;
var bg;
var bgS;
var coinIm;
var Coins
var score = 0;
var basketball;
var ground;
var gamestate = "playgame1"
var Camstatus = "playerCam"
var ball;
var engine,world
var robot,robotIm1,robotIm2,robotIm3;
var wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10,wall11,wall12,wall13,wall14
var orbM,orb2M,coin,coin2,coin3
var carspeed = 10
var instructionCloud,ICIm;

function preload(){
bg = loadImage("track.jpg")
coinIm = loadImage("coin.png")
playerIm1 = loadImage("playerback.PNG")
playerIm2 = loadImage("playerleft.PNG")
playerIm3 = loadImage("playerright.PNG")
playerIm4 = loadImage("playerfront.PNG")
robotIm1 = loadImage("robotfrontback.png")
robotIm2 = loadImage("robotleft.png")
robotIm3 = loadImage("robotright.png")
playerCar = loadImage("playerCar.png")
ghostCar = loadImage("ghostCar.png")
ICIm = loadImage("instructioncloud.png")
//basketball = loadImage("basketball.png")
}

function setup() {
  
  createCanvas(1200, 700);
  bgS = createSprite(400,-3500,800,2800)
  bgS.addImage(bg)
  player = createSprite(250,600);
  ghost = createSprite(500,600);
  robot = createSprite(550,600,50,50);
  robot.visible = false
  robot.shapeColor = "red"
  robot.addImage(robotIm1);
  robot.scale = 0.1
  //final orbs
  orbM2 = createSprite(-930,-230,10,10)
  orbM2.shapeColor = "red"
  orbM = createSprite(-930,-230,10,10)
  orbM.shapeColor = "yellow";
  //orbs
  orb1 = createSprite(random(250,700),random(-200,0),10,10)
  orb1.shapeColor = "blue"
  orb2 = createSprite(random(35,-145),random(275,120),10,10)
  orb2.shapeColor = "blue"
  orb3 = createSprite(random(-971,-321),random(-58,71),10,10)
  orb3.shapeColor = "red"
  orb4 = createSprite(random(-986,-296),random(-288,-201),10,10)
  orb4.shapeColor = "red"
  instructionCloud = createSprite(1105,216)
  instructionCloud.addImage(ICIm)
  instructionCloud.visible = false
  instructionCloud.scale = 0.5


  orbM.visible = false
  orbM2.visible = false
  orb1.visible = false
  wall1 = createSprite(-102,503,2000)
  wall2 = createSprite(808,63,100,1000)
  wall3 = createSprite(600,160,500,100)
  wall4 = createSprite(-1060,63,100,1000)
  wall5 = createSprite(-120,-380,2000)
  wall6 = createSprite(110,-80,100,500)
  wall7 = createSprite(-220,63,100,1000)
  wall8 = createSprite(-805,183,500,100)
  wall9 = createSprite(-425,-110,500,100)
  wall1.visible = false
  wall2.visible = false
  wall3.visible = false
  wall4.visible = false
  wall5.visible = false
  wall6.visible = false
  wall7.visible = false
  wall8.visible = false
  wall9.visible = false

  engine = Engine.create();
  world = engine.world;
  

  /*/ground = Bodies.rectangle(600,690,1200,5,{isStatic : true})
  World.add(world,ground)

  ball = Bodies.circle(100,600,25,{restitution : 0.04,density:1.0,friction:1.0})
  World.add(world,ball)*/
  
  Coins = new Group()
  ghost.velocityY = -15

  ground = new Ground(600,690,1200,5)
  ball = new Paper(100,600,25)




	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("white");
  Engine.update(engine)
  console.log(player.x)
  console.log(player.y)
  console.log("botX = "+robot.x)
  console.log("botY = "+robot.y)
  
  if(gamestate==="playgame1"){
    
    player.addImage(playerCar);
    ghost.addImage(ghostCar)
    if(Camstatus === "playerCam")
    camera.position.x = player.x
  camera.position.y = player.y
  if(keyDown("up")){
    player.y = player.y -carspeed
  }
  if(keyDown("right")){
    player.x = player.x +carspeed
  }
  if(keyDown("left")){
    player.x = player.x -carspeed
  }

  

  spawnPowerups()
  if(Coins.isTouching(player)){
    Coins.destroyEach()
    score = score + 1
    carspeed = carspeed + 3.5
  }
if(ghost.y < -7330){
  gamestate = "end"
}else
if(player.y < -7330){
  gamestate = "stage2"
  player.x = 645
  player.y = 390
  robot.x = -935
  robot.y = 362
  score = 0
}
}

if(gamestate === "stage2"){
  //console.log(ball)
  
  player.addImage(playerIm1)
  player.width = 50
  player.height = 50
  wall1.visible = true
  wall2.visible = true
  wall3.visible = true
  wall4.visible = true
  wall5.visible = true
  wall6.visible = true
  wall7.visible = true 
  wall8.visible = true
  wall9.visible = true
  instructionCloud.visible = true
  ghost.destroy()
  bgS.destroy()
  robot.visible=true
  
  orb1.visible = true
  if(camera.position.y === player.y&&camera.position.x === player.x){
  if(keyDown("up")){
    player.y = player.y -10
    player.addImage(playerIm1)
  }
  if(keyDown("right")){
    player.x = player.x +10
    player.addImage(playerIm3)
  }
  if(keyDown("left")){
    player.x = player.x -10
    player.addImage(playerIm2)
  }
  if(keyDown("down")){
    player.y = player.y+10
  }
}
if(camera.position.x === robot.x&&camera.position.y === robot.y){
  /*/if(keyDown("w")){
    robot.y = robot.y - 10
  }
  if(keyDown("s")){
    robot.y = robot.y + 10
  }
  if(keyDown("a")){
    robot.x = robot.x -10
  }
  if(keyDown("d")){
    robot.x = robot.x + 10
  }*/
  if(keyDown("up")){
    robot.y = robot.y -10
  }
  if(keyDown("right")){
    robot.x = robot.x +10
  }
  if(keyDown("left")){
    robot.x = robot.x -10
  }
  if(keyDown("down")){
    robot.y =robot.y+10
  }
}

  //drawSprites()
  background("lightblue")
  camera.position.x = player.x
  camera.position.y = player.y
  if(keyWentDown("space")){
    Camstatus="robotCam"
    //camera.position.x = robot.x
    //camera.position.y = robot.y
  }
  if(Camstatus === "robotCam"){
    camera.position.x = robot.x
    camera.position.y = robot.y
  }
  if(keyWentDown("x")){
    Camstatus = "playerCam"
    //camera.position.x = player.x
    //camera.position.y = player.y
  }
  if(gamestate === "playerCam"){
    camera.position.x = player.x
    camera.position.y = player.y
  }

  if(player.isTouching(orbM)&&robot.isTouching(orbM2)){
gamestate = "stage3"
  }
  if(player.isTouching(orb1)){
    score = score + 1
    orb1.destroy()

  }
  if(player.isTouching(orb2)){
    score = score + 1
    orb2.destroy()
  }
  if(score >= 2){
    orbM.visible = true
    orbM.x = 621
    orbM.y = -177
  }

  if(robot.isTouching(orb3)){
    score = score + 1
    orb3.destroy()
  }

  if(robot.isTouching(orb4)){
    score = score + 1
    orb4.destroy()
  }

  if(score === 4){
    orbM2.visible = true
  }
  player.collide(wall1)
  player.collide(wall2)
  player.collide(wall3)
  player.collide(wall4)
  player.collide(wall5)
  player.collide(wall6)
  player.collide(wall7)
  player.collide(wall8)
  player.collide(wall9)
  robot.collide(wall1)
  robot.collide(wall2)
  robot.collide(wall3)
  robot.collide(wall4)
  robot.collide(wall5)
  robot.collide(wall6)
  robot.collide(wall7)
  robot.collide(wall8)
  robot.collide(wall9)




  
  //score = 0
  //rectMode(CENTER)
  //ellipseMode(CENTER)
  //rect(ground.position.x,ground.position.y,1200,5)
  //imageMode(CENTER)
  //image(basketball,ball.position.x,ball.position.y,50,50)
  //ground.display()
  //ball.display()

}

if(gamestate === "stage3"){
  background("white")
  text("stage 3(not been added)",600,350)
  player.destroy()
  robot.destroy()
  camera.position.x = 600
  camera.position.y = 350
  instructionCloud.destroy()
  wall1.destroy()
  wall2.destroy()
  wall3.destroy()
  wall4.destroy()
  wall5.destroy()
  wall6.destroy()
  wall7.destroy()
  wall8.destroy()
  wall9.destroy()
  
}
  

  
  

  drawSprites();
 //console.log(gamestate)
 if(gamestate === "playgame1"){
  textSize(20)
  stroke("blue")
  text("speed - " + (score+1),player.x,player.y-100)
 }
 if(gamestate === "stage2"){
  textSize(20)
  stroke("blue")
  text("orbs collected - " + score,player.x,player.y-100)
 }

}



function spawnPowerups(){
  if(frameCount % 120 === 0){
    powerup = createSprite(random(80,350),player.y - 500)
    powerup.velocityY = 7
    powerup.lifetime = 200
    powerup.addImage(coinIm)
    powerup.scale = 0.3
    Coins.add(powerup)
  }
}



function keyPressed() {
  if (keyCode == 32) {
      var a = document.getElementsByTagName("input")[0].value;
      var b = document.getElementsByTagName("input")[1].value;
      Matter.Body.applyForce(ball.body, ball.body.position, { x: b, y: -a });
  }
}

