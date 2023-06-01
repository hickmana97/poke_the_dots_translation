/* Poke the dots is a game where two coloured dots bounce around the 
screen. The aim is to go as long as possible without them colliding.
Left clicking will randomise the dot locations*/

let bigDot
let smallDot
let continueGame


function setup(){
  createCanvas(500, 400);
  frameRate(90);
  textFont('Arial')
  bigDot = new Dots('blue', 40, 2, 1)
  smallDot = new Dots('red', 30, 1, 2)
  continueGame = true
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
    bigDot.update()
    bigDot.checkCollision()
    bigDot.move()
    smallDot.update()
    smallDot.checkCollision()
    smallDot.move()
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
    this.score = floor(millis() / 1000)
    return this.score
  }
  
  checkContinue(){
    if(continueGame == false){
      this.gameOver()
      noLoop()
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
    }
    
    if (this.ypos < this.size ||this.ypos > height - this.size){
      this.yspeed = - this.yspeed
    }
    //check dots collision with each other, if true end loop
    let distance = sqrt(sq(bigDot.xpos - smallDot.xpos) + sq(bigDot.ypos - smallDot.ypos))
    if(distance <= bigDot.size + smallDot.size){
      continueGame = false
    }

  }
  
  randomise(){
    this.xpos = random(50, 450)
    this.ypos = random(50, 350)
    return this.xpos
    return this.ypos
  }
    
}

function mouseClicked(){
  bigDot.randomise()
  smallDot.randomise()
}
 
