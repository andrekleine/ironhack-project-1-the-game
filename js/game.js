class Game {
    constructor(canvas, context, field, player, helicopter) {
      this.canvas = canvas;
      this.context = context;
      this.field = field;
      this.jet = [];
      this.ship = [];
      this.helicopter = helicopter;
      this.fuel = [];
      this.house = [];
      this.player = player;
      // GAME CONFIGS
      this.planeSpeed = 35;
      this.heliSpeed = 10;
    }
    
    keyboardControlConfig() {
      document.onkeydown = (event) => {        
        this.player.movePlayer(event.key.toLowerCase(), this.planeSpeed);        
      };      
    }
  
    startGame() {
      this.clearScreen();
      this.field.drawField();
      this.player.drawPlayer();      
      this.helicopter.drawHeli();
      window.requestAnimationFrame(() => this.startGame());
    }
  
    clearScreen() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);    
    }
}