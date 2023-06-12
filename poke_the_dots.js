/* Poke the dots is a game where two coloured dots bounce around the 
screen. The aim is to go as long as possible without them colliding.
Left clicking will randomise the dot locations.
Game can be restarted on game over with left click*/

let bigDot
let smallDot
let continueGame
let restartGame
let dots = []

function setup(){
  createCanvas(500, 400);
  frameRate(90);
  textFont('Arial')
  bigDot = new Dots('blue', 40, 2, 1)
  dots.push(bigDot)
  smallDot = new Dots('red', 30, 1, 2)
  dots.push(smallDot)
  for(const dot of dots){
    dot.checkPositions()
  }
  savedTime = millis()
  continueGame = true
  restartGame = false
  game = new Game()
}

function draw(){
  background('black');
  game.play()
  
}


class Game{
  constructor(){
    this.score = 0
  
  }
  
  play(){
    for(const dot of dots){
      dot.update()
      dot.checkCollision()
      dot.move()
    }
    
    this.updateScore()
    this.checkContinue()
  }
  
  updateScore(){
    push()
    fill('white')
    textSize(30)
    this.scoreIncrement()
    text('Score: ' + this.score, 25, 40)
    pop()
  }
  
  scoreIncrement(){
    let passedTime = millis() - savedTime
    this.score = floor(passedTime/ 1000)
    return this.score
  }
  
  checkContinue(){
    if(continueGame == false){
      this.gameOver()
      noLoop()
    }
    if(restartGame == true){
      continueGame = true
      restartGame = false
      savedTime = millis()
      this.score = 0
      bigDot.xspeed = 2
      bigDot.yspeed = 1
      smallDot.xspeed = 1
      smallDot.yspeed = 2
      loop()
    }
  }
  
  gameOver(){
    push()
    fill(bigDot.colour)
    rect(0, 330, 275)
    pop()
    push()
    fill(smallDot.colour)
    textSize(42)
    strokeWeight(5)
    text('GAME OVER', 10, 380)
  }
  

}


class Dots{
  //construct dot objects from new statement
  constructor(colour, size, xspeed, yspeed){
    this.colour = colour
    this.randomise()
    this.size = size
    this.xspeed = xspeed
    this.yspeed = yspeed
  
  }
  //assign new positions to dots for next frame
  move(){
    this.xpos = this.xpos + this.xspeed
    this.ypos = this.ypos + this.yspeed
    
  }
  //draw new dot locations
  update(){
    push()
    strokeWeight(this.size *2)
    stroke(this.colour)
    point(this.xpos, this.ypos)
    pop()
  
  }
  //check dot collision
    //check dot canvas collision, if true, reverse velocity on axis
  checkCollision(){
    if (this.xpos < this.size || this.xpos > width - this.size){
      this.xspeed = - this.xspeed
      if(this.xspeed > 0){
        this.xspeed += 0.1
      }
      if(this.xspeed < 0){
        this.xspeed -= 0.1
      }
    }
    
    if (this.ypos < this.size ||this.ypos > height - this.size){
      this.yspeed = - this.yspeed
      if(this.yspeed > 0){
        this.yspeed += 0.1
      }
      if(this.yspeed < 0){
        this.yspeed -= 0.1
      }
    }
    //check dots collision with each other, if true end loop
    let distance = this.calcDistance()
    if(distance <= bigDot.size + smallDot.size){
      continueGame = false
    }

  }
  
  calcDistance(){
    let distance = sqrt(sq(bigDot.xpos - smallDot.xpos) + sq(bigDot.ypos - smallDot.ypos))
    return distance
  }
  
  randomise(){
    this.xpos = random(50, 450)
    this.ypos = random(50, 350)
    return this.xpos
    return this.ypos
  }
  
  checkPositions(){
    let distance = this.calcDistance()
    if(distance <= bigDot.size + smallDot.size){
      this.randomise()
    } 
    
  }
}

function mouseClicked(){
  for(const dot of dots){
    dot.randomise()
    dot.checkPositions()
  }
  if(continueGame == false){
    restartGame = true
    game.checkContinue()
  }
  
}


 
