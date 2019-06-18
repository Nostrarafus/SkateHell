class Player {
  constructor(w, h, ctx) {
    this.canvasW = w;
    this.canvasH = h;
    this.ctx = ctx;
    this.keys = {
      arrowUp: 38,
      spaceBar: 32,
      arrowDown: 40
    }
    this.x = this.canvasW / 100;
    this.y0 = this.canvasH * 0.8;
    this.y = this.y0;
    this.vy = 1
    this.img = new Image();
    this.img.src = "img/fatskater.jpg";
    this.imgW = 80;
    this.imgH = 120;
    this.imgFrameX = 90;
    this.imgFrameY = 105;
    this.img.frames = 9;
    this.img.frameIndex = 0;
    this.img.downFramesW = 127;
    this.img.downFramesH = 654;
    this.gravity = 0.4

  }
  drawPlayer = () => {

    if (this.img.frameIndex === 0) {
      this.ctx.drawImage(
        this.img,
        33,
        219,
        this.imgFrameX,
        this.imgFrameY,
        this.x,
        this.y,
        this.imgW,
        this.imgH
      );
    } else if (this.img.frameIndex === 2) {

      this.ctx.drawImage(
        this.img,
        this.img.downFramesW,
        this.img.downFramesH,
        this.imgFrameX,
        this.imgFrameY,
        this.x,
        this.y,
        this.imgW,
        this.imgH
      );

    }
  }
  gameListeners = () => {
    document.onkeydown = (e) => {
      if (e.keyCode === this.keys.arrowUp && this.y == this.y0) {
        this.frameIndex += 1
        this.y -= 5
        this.vy -= 15
      };
      if (e.keyCode === this.keys.arrowDown && this.y == this.y0) {
        this.frameIndex = 2
        this.imgH -= 3
        this.vy += 5
      }
    }
  }

  playerMovement = () => {
    this.gameListeners()
    if (this.y >= this.y0) {
      this.vy = 1;
      this.y = this.y0;
    } else {
      this.vy += this.gravity;
      this.y += this.vy;
    }
  
  
}
}