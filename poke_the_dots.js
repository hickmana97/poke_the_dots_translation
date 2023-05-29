

function setup(){
  createCanvas(500, 400);
  background('black');
  frameRate(90);
  
}

function draw(){
  stroke(bigDot[0])
  strokeWeight(bigDot[2] * 2)
  point(bigDot[1][0], bigDot[1][1])
  stroke(smallDot[0])
  strokeWeight(smallDot[2] * 2)
  point(smallDot[1][0], smallDot[1][0])
}

let bigDot = ['blue', [100,100], 40, [2,1]]
let smallDot = ['red', [200,200], 30, [1,2]]

function moveDots(coords, velocity){
  for(let coordinate of coords){
    i = 0
    coordinate = coordinate + velocity[i];
    i = i + 1
    }
}
