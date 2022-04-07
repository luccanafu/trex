var trex, trex_running, edges;
var groundImage;
var chao 
var obstaculo1, obstaculo2, obstaculo3,obstaculo4,obstaculo5,obstaculo6
var score=0
var PLAY=1
var END=0
var gameState=PLAY
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudimg=loadImage("cloud.png")
  obstaculo1=loadImage("obstacle1.png")
  obstaculo2=loadImage("obstacle2.png")
  obstaculo3=loadImage("obstacle3.png")
  obstaculo4=loadImage("obstacle4.png")
  obstaculo5=loadImage("obstacle5.png")
  obstaculo6=loadImage("obstacle6.png")
  terxmorto =loadAnimation("trex_collided.png")
  restart=loadImage("restart.png")
  gameover=loadImage("gameOver.png")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")  
  checkpoint=loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.setCollider("circle",0,-20,80)
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",terxmorto)
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  
  chao = createSprite(width/2,190,600,1)
  chao.scale=1.8
  chao.addImage(groundImage) 
  

  invisivel=createSprite(width/2,198,width,1)
  invisivel.visible=false
  
  cacto=createGroup()

  ceu=createGroup()

  restarts=createSprite(width/2,100,30,30)
  restarts.addImage(restart)
  restarts.scale=0.6
  restarts.visible=false
 
  gameOver=createSprite(width/2,50,30,30)
  gameOver.addImage(gameover)
  gameOver.visible=false
}


function draw(){ 
  background("white");
    trex.collide(invisivel)
      if(score>0&&score%100===0){
        checkpoint.play()
        checkpoint.setVolume(0.1)


      }

    drawSprites()

    if(gameState===PLAY){
      textSize(20)
      text("pontos: "+score,35,15)
      score+=Math.round(frameRate()/50)
      
      chao.velocityX=-(width*0.007+score/2000)
      
    if(keyDown("space")&&trex.y>=150){
     trex.velocityY = -9;
    jump.play()
    jump.setVolume(0.1)
  
    }
      
     trex.velocityY = trex.velocityY + 0.7;
     if(chao.x<0){
      chao.x=width/2
     }
     if (trex.isTouching(cacto)){
       
       gameState=END
      die.play()
      
     trex.velocityY=-9
     }
     obstacle()
     cloud()
              
    }
    else if (gameState===END){

      trex.changeAnimation("collided",terxmorto)

      cacto.setVelocityXEach(0)
      ceu.setVelocityXEach(0)
      chao.velocityX=0

      cacto.setLifetimeEach(-1)
      ceu.setLifetimeEach(-1)

      gameOver.visible=true
      restarts.visible=true
      trex.velocityY=0

      if (mousePressedOver(restarts)){
        gameReset()

      }
    }
}
function cloud(){
 if(frameCount%60===0){
  
  clouds=createSprite(width,80,80,10)
  clouds.velocityX=-5

  clouds.addImage(cloudimg)
  clouds.y=Math.round(random(20,100))
  clouds.scale=0.7  
  clouds.lifetime=width/clouds.velocityX

  ceu.add(clouds)
   
  
}


}
function obstacle(){
  if(frameCount%80===0){
    
    obst=createSprite(width,175,20,50)
    obst.velocity.x=-(width*0.007+score/1000)
    
    
  
    var escolha=Math.round(random(1,6))
    switch (escolha) {
      case 1:obst.addImage(obstaculo1);
        break;
        
        case 2:obst.addImage(obstaculo2);
        break;
        
        case 3:obst.addImage(obstaculo3);
        break;
        
        case 4:obst.addImage(obstaculo4);
        break;
       
        case 5:obst.addImage(obstaculo5);
        break;
        
        case 6:obst.addImage(obstaculo6);
        break;
    
      default:
        break;
       
    }

      obst.lifetime=width/obst.velocityX
      obst.scale=0.5
      cacto.add(obst)

  }
  }
  function gameReset(){
    gameState=PLAY
    trex.changeAnimation("running", trex_running);
    score=0
    cacto.destroyEach()
    ceu.destroyEach()
    gameOver.visible=false
    restarts.visible=false 


  }







