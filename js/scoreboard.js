class scoreBoard {
  constructor(ctx){
    
    this.ctx = ctx
    this.score = 0
 
  }
 
  increaseScore=()=>{
 this.score += 1
  }
  drawScoreBoard = () => {
 
    this.ctx.font = `80px Comic Sans MS`;
 
    this.ctx.fillStyle = `black`;
   
      this.ctx.fillText(`${this.score}mts`  , 50, 100);
 
  }
  drawScoreMssg = () => {
  
     if (this.score >= 1000){
 
       this.ctx.font = `80px Comic Sans MS`;
 
       this.ctx.fillStyle = `green`;
 
 
         this.ctx.fillText(`You are a fucking boss` , 50,500);
     }}
 
  getScore = () => {
    return this.score
  }
 }