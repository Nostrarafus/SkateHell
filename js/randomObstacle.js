class RandomObstacle {
  constructor(w, playerY, playerH, ctx) {
    this.ctx = ctx;
    this.w = 15;
    this.h = this.w;
    this.dx = 10;
    this.x = w;
    this.y =  this.getRandomInt(30,60) - (this.getRandomInt(-1,1)*(playerY + playerH - this.h))
  }
  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


  draw = () => {
   this.ctx.fillStyle = "white";
   this.ctx.fillRect(this.x, this.y, this.w, this.h);
    
  }
  move = () => {
    this.x -= this.dx;
  }
}