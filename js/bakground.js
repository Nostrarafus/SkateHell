class Background {
  constructor(w, h, ctx) {
    this.ctx = ctx
    this.img = new Image();
    this.img.src = "img/background_ciudad.png";
    this.x = 0;
    this.y = 0;
    this.h = h;
    this.w = w;
    this.dx = 10;
  }

  draw = () =>{
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
    this.ctx.drawImage(
      this.img,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  }

  move = () => {
    this.x -= this.dx;

    if (this.x < -this.w) this.x = 0;
  }
}
