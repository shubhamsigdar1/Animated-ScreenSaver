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
