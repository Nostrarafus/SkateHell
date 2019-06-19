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
    this.y0 = this.canvasH * 0.65;
    this.y = this.y0;
    this.vy = 0;
    this.img = new Image();
    this.img.src = "img/fatskater.jpg";
    this.imgW = 80;
    this.imgH0 = 120;
    this.imgH = this.imgH0;
    this.sW = 84;
    this.sH = 100;
    this.img.upFrames = 0;
    this.frameIndex = 2;
    this.img.sx0 = 38;
    this.img.sx = this.img.sx0;
    this.img.sy0 = 434
    this.img.sy = this.img.sy0;
    this.gravity = 0.4;
    this.canJump = true
    this.bullets = [];
    this.normalSx = 33
    this.normalSy = 325
  }
  drawPlayer = () => {

    if (this.frameIndex === 0) {
      this.ctx.drawImage(
        this.img,
        this.normalSx,
        this.normalSy,
        this.sW,
        this.sH,
        this.x,
        this.y,
        this.imgW,
        this.imgH
      );
    }
    if (this.frameIndex === 2) {

      this.ctx.drawImage(
        this.img,
        this.img.sx,
        this.img.sy,
        this.sW,
        this.sH,
        this.x,
        this.y,
        this.imgW,
        this.imgH
      );

    }
  }
  

  gameListeners = () => {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 38:
          if (this.y === this.y0) {
            this.canJump = true
            this.frameIndex = 2
            this.y -= 5
            this.vy -= 15
          }
          break;
        case 40:
          if (this.y === this.y0) {
            this.canJump = false
            this.frameIndex = 0
            this.vy += 10
            this.y += 2
          }
          break;
          case 32:
             this.shoot()
             break;
      }
    }
  }

  shoot = () => {
    let bullet = new Bullet(
      this.x + this.sW,
      this.y + this.sH / 2,
      this.y0,
      this.sH,
      this.ctx
    );

    this.bullets.push(bullet);

  }

  drawBullet = () => {
    
    this.bullets = this.bullets.filter(bullet => {
      return bullet.x < this.canvasW;
    });
    
    this.bullets.forEach( (bullet) => {
      bullet.draw();
      bullet.move();
    });
  }

  playerJump = () => {
    this.gameListeners()
    if (this.canJump === true) {
      if (this.y >= this.y0) {
        this.vy = 0;
        this.y = this.y0;
        this.frameIndex = 0
      } else {
        this.vy += this.gravity;
        this.y += this.vy;
      }
    }
  }

  playerCrawl = () => {
    this.gameListeners()
    if (this.canJump === false) {
      if (this.y <= this.y0) {
        this.vy = 0;
        this.y = this.y0;
        this.frameIndex = 0
      } else {
        this.vy -= this.gravity;
        this.y += this.vy;
      }
    }
  }

}

