//setup our canvas
//give access to the drawing properties
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//innerWidth refers to the viewport
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

//function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function to generate random RGB colors
function randomRGB() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath(); //start drawing shape
    ctx.fillStyle = this.color; //fill the particular color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //make a circle from point x and y of particular size
    ctx.fill(); //fill the object with color
  }

  //Ball hitting the screen
  update() {
    //hits right side of screen
    //(this.size->size of ball)
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    //hits left side of screen
    if (this.x - this.size <= 0) {
      //reverse the ball(go in other direction horizontally)
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    //move the ball
    this.x += this.velX;
    this.y += this.velY;
  }
}

const balls = [];

while (balls.length < 50) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size), //x-coordinate
    random(0 + size, height - size), //y-coordinate
    random(1, 4), //vel-x
    random(1, 4), //vel-y
    randomRGB(), //Assign color
    size
  );

  balls.push(ball);
}

//function to loop the animation
function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, 0, width, height);
  for (const ball of balls) {
    ball.draw();
    ball.update();
  }

  //recursion
  requestAnimationFrame(loop);
}

loop();
