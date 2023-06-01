let bigDot
let smallDot


function setup(){
  createCanvas(500, 400);
  frameRate(90);
  bigDot = new Dots('blue', 100, 100, 40, 2, 1)
  smallDot = new Dots('red', 200, 200, 30, 1, 2)
  
}

function draw(){
  background('black');
  bigDot.update();
  bigDot.checkCollision();
  bigDot.move();
  smallDot.update();
  smallDot.checkCollision();
  smallDot.move();
  
}



class Dots{
  constructor(colour, xpos, ypos, size, xspeed, yspeed){
    this.colour = colour
    this.xpos = xpos
    this.ypos = ypos
    this.size = size
    this.xspeed = xspeed
    this.yspeed = yspeed
  }
  
  move(){
    this.xpos = this.xpos + this.xspeed
    this.ypos = this.ypos + this.yspeed
    
  }
  
  update(){
    strokeWeight(this.size *2)
    stroke(this.colour)
    point(this.xpos, this.ypos)
  
  }
  
  checkCollision(){
    if (this.xpos < this.size || this.xpos > width - this.size){
      this.xspeed = - this.xspeed
    }
    
    if (this.ypos < this.size ||this.ypos > height - this.size){
      this.yspeed = - this.yspeed
    }
  }
    
}
