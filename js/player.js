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
    this.y0 = this.canvasH * 0.6;
    this.y = this.y0;
    this.vy = 0;
    this.imgW = 80;
    this.imgH = 103;
    this.sW = 97;
    this.sH = 103;
    this.gravity = 0.4;
    this.canJump = true
    this.bullets = [];
    this.img1 = new Image();
    this.img1.src = "img/fatskater.png"
    this.img1.frames = 4;
    this.img1.frameIndex = 0;
    this.img1.Sy = 0
    this.drawNormalImage = true
    this.img2 = new Image();
    this.img2.src = "img/fatskater.png"
    this.img2.frames = 7;
    this.img2.frameIndex = 0;
    this.img2.Sy0 = 114
    this.img2.Sy = this.img2.Sy0
    this.drawJumpImage = false
    this.img3 = new Image();
    this.img3.src = "img/fatskater.png"
    this.img3.frames = 4;
    this.img3.frameIndex = 0;
    this.img3.Sy = 333
    this.drawCrawlImage = false

  }



  drawPlayer = (framescounter) => {
    this.gameListeners()

    if (this.drawNormalImage === true)
      this.ctx.drawImage(
        this.img1,
        this.img1.frameIndex * 88,     //Math.floor(this.img1.width / this.img1.frames),
        this.img1.Sy,
        this.sW,        // Math.floor(this.img1.width / this.img1.frames),
        this.sH,
        this.x,
        this.y,
        this.imgW,
        this.imgH
      );

    if (this.drawJumpImage === true) {
      this.ctx.drawImage(
        this.img2,
        this.img2.frameIndex * 88,
        this.img2.Sy,
        this.sW,
        this.sH,
        this.x,
        this.y,
        this.imgW,
        this.imgH
      );
    }

    if (this.drawCrawlImage === true) {
      this.ctx.drawImage(
        this.img3,
        this.img3.frameIndex * 88,
        this.img3.Sy,
        this.sW,
        this.sH,
        this.x,
        this.y,
        this.imgW,
        this.imgH
      );
    }

    this.animateImg(framescounter)

  }

  animateImg = (framescounter) => {
    if (framescounter % 6 === 0) {
      this.img1.frameIndex += 1;
      this.img2.frameIndex += 1;
      this.img3.frameIndex += 1;
      if (this.img1.frameIndex > 3) {
        this.img1.frameIndex = 0;
      }
      if (this.img2.frameIndex > 4) {
        this.img2.frameIndex = 0;
        this.img2.Sy += 103
        if (this.img2.Sy0 < this.img2.Sy) {
          this.img2.frameIndex = 0
          this.img2.Sy = this.img2.Sy0
        }
      }
      if (this.img3.frameIndex > 3) {
        this.img3.frameIndex = 0;
      }
    }
  }

  gameListeners = () => {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 38:
          if (this.y === this.y0) {
            this.canJump = true
            this.drawJumpImage = true
            this.drawNormalImage = false
            this.drawCrawlImage = false
            this.y -= 5
            this.vy -= 15
          }
          break;
        case 40:
          if (this.y === this.y0) {
            this.drawCrawlImage = true
            this.canJump = false
            this.drawNormalImage = false
            this.drawJumpImage = false
            this.vy += 12
            this.y += 2
          }
          break;
        case 32:
          this.drawJumpImage = false
          this.drawCrawlImage = false
          this.drawNormalImage = true
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

    this.bullets.forEach((bullet) => {
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
        this.drawNormalImage = true
        this.drawJumpImage = false
        this.drawCrawlImage = false
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
        this.drawNormalImage = true
        this.drawJumpImage = false
        this.drawCrawlImage = false

      } else {
        this.vy -= this.gravity;
        this.y += this.vy;
      }
    }
  }

}

