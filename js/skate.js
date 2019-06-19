class Game {
  constructor() {
    this.canvasDOMEl = undefined;
    this.ctx = undefined;
    this.canvasW = 1200;
    this.canvasH = 700;
    this.intervalId = undefined;
    this.framesCounter = 0;
    this.intervalId = undefined;
    this.counter = 0;
    this.keys = {
      arrowUp: 38,
      spaceBar: 32,
      arrowDown: 40
    }
    this.obstacles = []
    this.randomObstacles = []
  }

  init = (id) => {
    this.canvasDOMEl = document.getElementById(id)
    this.ctx = this.canvasDOMEl.getContext("2d")
    this.canvasDOMEl.setAttribute("height", this.canvasH);
    this.canvasDOMEl.setAttribute("width", this.canvasW)
    this.start()
  }

  start = () => {
    this.fps = 60;
    this.reset();
    this.intervalId = setInterval(() => {
      this.clear();
      this.framesCounter++;
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }
      if (this.framesCounter % 80 === 0) {
        this.generateObstacle();
        this.generateRandomObstacle();
      }
      this.drawAll();
      this.moveAll();
      if (this.player.frameIndex = 0) {
        this.player.normalSx += 80
        if (this.player.normalSx > 400) this.normalSx = 33
      }
      // if (jumpSprite === true) this.sx + 80
      // if (crawlSprite === true) {this.sy + 100; this.sx +80}
      this.clearObstacles();

      if (this.isCollisionObstacle()) {
        this.gameOver();
      }

    }, 1000 / this.fps)

  }
  stop = () => {
    clearInterval(this.intervalId)
  }

  gameOver = () => {
    this.stop()
    if (confirm(`Eres una verguenza para tu familia, lo vuelves a intentar?`)) {
      this.reset()
      this.start()
    }
  }

  reset = () => {
    this.background = new Background(this.canvasW, this.canvasH, this.ctx);
    this.player = new Player(this.canvasW, this.canvasH, this.ctx);
    this.obstacles = []
    this.randomObstacles = []
  }
  isCollisionObstacle = () => {
    return this.obstacles.some(obstacle => {
      return (
        this.player.x + this.player.imgW >= obstacle.x &&
        this.player.x < obstacle.x + obstacle.w &&
        this.player.y + (this.player.sH - 20) >= obstacle.y
      )
    })
  }

  drawAll = () => {
    this.background.draw()
    this.player.drawPlayer()
    this.player.drawBullet()
    this.obstacles.forEach((obstacle) => {

      obstacle.draw();
    })
    this.randomObstacles.forEach((obstacle) => {
      obstacle.draw();
    })
  }

  clear = () => {
    this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
  }
  moveAll = () => {
    this.background.move()
    this.player.playerJump()
    this.player.gameListeners()
    this.player.playerCrawl()
    this.obstacles.forEach((obstacle) => {
      obstacle.move()
    });
    this.randomObstacles.forEach((obstacle) => {
      obstacle.move()
    });
  }

  clearObstacles = () => {
    this.obstacles = this.obstacles.filter((obstacle) => {
      return obstacle.x >= 0;
    })
    this.randomObstacles = this.randomObstacles.filter((obstacle) => {
      return obstacle.x >= 0
    })
  }

  generateObstacle = () => {
    this.obstacles.push(
      new Obstacle(this.canvasW, this.player.y0, this.player.sH, this.ctx)
    );
  }

  generateRandomObstacle = () => {
    this.randomObstacles.push(
      new RandomObstacle(this.canvasW, this.player.y0, this.player.sH, this.ctx)
    );
  }




}



