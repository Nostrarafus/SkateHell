class Game {
  constructor() {
    this.canvasDOMEl = undefined;
    this.ctx = undefined;
    this.canvasW = 1200;
    this.canvasH = 750;
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
    this.randomImpObs = []
    this.destroyedObstacle = null
    this.destroyedBullet = null
    this.normalSprite = 0
    this.audio = undefined
    
  }

  init = (id) => {
    this.canvasDOMEl = document.getElementById(id)
    this.ctx = this.canvasDOMEl.getContext("2d")
    this.canvasDOMEl.setAttribute("height", this.canvasH);
    this.canvasDOMEl.setAttribute("width", this.canvasW)
    this.start()

  }

  start = () => {
    this.disableButton()
    this.audio = new Audio("img/Black_Eyed_Peas_-_Pump_It.mp3");
    this.audio.play();
    this.fps = 60;
    this.reset();
    this.intervalId = setInterval(() => {
      this.clear();
      this.framesCounter++;
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }
      if (this.framesCounter % 100 === 0) this.generateObstacle();
      if (this.framesCounter % 100 === 0) this.generateRandomObstacle();
      if (this.framesCounter % 100 === 0) this.generateRandomImpObs();


      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)

      this.drawAll();
      this.moveAll();

      this.clearObstacles();

      if (this.isCollisionObstacle()) {
        this.gameOver();
      }
      if (this.isCollisionrandomObstacle()) {
        this.gameOverFlanders();
      }
      if (this.isCollisionrandomImpObs()) {
        this.gameOverWigum();
      }
      if (this.isBulletCollision()) {
        this.destroyrandomObs()
        this.destroyBullet()
      };
      if (this.framesCounter % 30) {
        this.scoreBoard.increaseScore()
      }


    }, 1000 / this.fps)

  }
  stop = () => {
    clearInterval(this.intervalId)
    document.location.reload()
  }
  stopWigum = () => {
    clearInterval(this.intervalId)
  }
  gameOverWigum = () => {
    this.stop()
    if (confirm(`¿De verdad te ha matado Wigum? ¿Lo vuelves a intentar, PAQUETE?`)) {
      this.reset()
      this.start()
    }
  }
  gameOverFlanders = () => {
    this.stop()
    if (confirm(`Hola holita noob (¿De verdad no has podido con Flanders?) ¿Lo vuelves a intentar, novatillo?`)) {
      this.reset()
      this.start()
    }
  }

  gameOver = () => {
    this.stop()
    if (confirm(`Eres una verguenza para tu familia  ¿Lo vuelves a intentar, NOOB?`)) {
      this.reset()
      this.start()
    }
  }

  reset = () => {
    this.background = new Background(this.canvasW + 500, this.canvasH, this.ctx);
    this.player = new Player(this.canvasW, this.canvasH, this.ctx);
    this.scoreBoard = new scoreBoard(this.ctx)
    this.obstacles = []
    this.randomObstacles = []
    this.randomImpObs = []
    this.player.bullets = []
  }

  isCollisionObstacle = () => {
    return this.obstacles.some(obstacle => {
      return (
        this.player.x + this.player.imgW - 20 >= obstacle.x &&
        this.player.x + 10 <= obstacle.x + obstacle.w &&
        this.player.y + this.player.sH >= obstacle.y &&
        this.player.y <= obstacle.y + obstacle.h - 30
      )
    })
  }

  isCollisionrandomObstacle = () => {
    return this.randomObstacles.some(obstacle => {
      return (
        this.player.x + this.player.imgW - 15 >= obstacle.x &&
        this.player.x + 50 <= obstacle.x + obstacle.w &&
        this.player.y + (this.player.sH + 15) >= obstacle.y &&
        this.player.y <= obstacle.y + obstacle.h - 40
      )
    })
  }

  isCollisionrandomImpObs = () => {
    return this.randomImpObs.some(obstacle => {
      return (
        this.player.x + this.player.imgW - 40 >= obstacle.x &&
        this.player.x + 100 <= obstacle.x + obstacle.w &&
        this.player.y + (this.player.sH) >= obstacle.y &&
        this.player.y <= obstacle.y + obstacle.h - 50
      )
    })
  }

  isBulletCollision = () => {
    return this.randomObstacles.some(obstacle => {
      for (let i = 0; i < this.player.bullets.length; i++) {
        return (
          this.player.bullets[i].x + (this.player.bullets[i].r * 3) >= obstacle.x &&
          this.player.bullets[i].x <= obstacle.x + obstacle.w + 10 &&
          this.player.bullets[i].y + (this.player.bullets[i].r * 3) >= obstacle.y &&
          this.player.bullets[i].y <= obstacle.y + obstacle.h + 10
        )
      }
    })
  }

  destroyObs = () => {
    this.randomObstacles.forEach((obstacle, idx) => {
      if (this.isBulletCollision()) {
        this.destroyedObstacle = idx
        obstacle.destroyrandomObs()
      }
    }
    )
    this.player.bullets.forEach((bullet, idx) => {
      if (this.isBulletCollision()) {
        this.destroyedBullet = idx
        bullet.destroyBullet()
      }
    })
  }

  destroyrandomObs = () => {
    this.randomObstacles.splice(this.destroyedObstacle, 1)
  }

  destroyBullet = () => {
    this.player.bullets.splice(this.destroyedBullet, 1)
  }

  drawAll = () => {
    this.background.draw()
    this.player.drawPlayer(this.framesCounter)
    this.player.drawBullet()
    this.obstacles.forEach((obstacle) => {
      obstacle.draw();
    })
    this.randomObstacles.forEach((obstacle) => {

      obstacle.draw();

    })
    this.randomImpObs.forEach((obstacle) => {
      obstacle.draw();
    })
    this.scoreBoard.drawScoreBoard()
    this.scoreBoard.drawScoreMssg()
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
    this.randomImpObs.forEach((obstacle) => {
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
    this.randomImpObs = this.randomImpObs.filter((obstacle) => {
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

  generateRandomImpObs = () => {
    this.randomImpObs.push(
      new RandomImpObs(this.canvasW, this.player.y0, this.player.sH, this.ctx)
    );
  }
  disableButton = () => {
    document.getElementById("start-button").style.display = "none";
  }
}



