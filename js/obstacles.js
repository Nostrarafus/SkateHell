
class Obstacle {
  constructor(w, playerY, playerH, ctx) {
    this.ctx = ctx;
    this.w = 20;
    this.h = this.w * 10;
    this.dx = 10;
    this.x = w;
    this.y = playerY + playerH - this.h + 5;

  }

  draw = () => {
   this.ctx.fillStyle = "black";
   this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  
  move = () => {
    this.x -= this.dx;
  }
}
