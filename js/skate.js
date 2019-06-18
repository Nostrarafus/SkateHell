class Game {
  constructor() {
    this.canvasDOMEl = undefined;
    this.ctx = undefined;
    this.canvasW = 1200;
    this.canvasH = 700;
    this.intervalId = undefined;
    this.counter = 0;
    this.intervalId = undefined;
    this.counter = 0;
    this.keys = {
      arrowUp: 38,
      spaceBar: 32,
      arrowDown: 40
    }
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
      this.counter++;
      if (this.counter > 1000) {
        this.counter = 0;
      }
      this.drawAll();
      this.moveAll();

    }, 1000 / this.fps)

  }

  reset = () => {
    this.background = new Background(this.canvasW, this.canvasH, this.ctx);
    this.player = new Player(this.canvasW, this.canvasH, this.ctx);
  }

  drawAll = () => {
    this.background.draw()
    this.player.drawPlayer()
  }


  clear = () => {
    this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
  }
  moveAll = () => {
    this.background.move();
    this.player.playerMovement();
  }
}

