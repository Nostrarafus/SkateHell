class Background {
  constructor(w, h, ctx) {
    this.ctx = ctx
    this.img = new Image();
    this.img.src = "img/storyblocks-modern-hospital-clinic-and-bank-building-front-view-of-financial-and-medical-institution-exterior-urban-city-panorama-skyscrapers-cityscape-background-skyline-flat-horizontal-banner-vector_Bc7RO7xI4_SB_PM.jpg";
    this.x = 0;
    this.y = 0;
    this.h = 800;
    this.w = 2768;
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
