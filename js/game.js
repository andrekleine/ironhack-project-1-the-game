class Game {
    constructor(canvas, context, field, player, helicopter, ship, jet, fuel, house) {
      this.canvas = canvas;
      this.context = context;
      this.field = field;
      this.jet = jet;
      this.ship = ship;
      this.helicopter = helicopter;
      this.fuel = fuel;
      this.house = house;
      this.player = player;
      // GAME CONFIGS
      this.planeSpeed = 35;
      this.heliSpeed = 5;
      this.shipSpeed = 2;
      this.jetSpeed = 6;
      this.shotSpeed = 6;
    }
    
    keyboardControlConfig() {
      document.onkeydown = (event) => {        
        this.player.movePlayer(event.key.toLowerCase(), this.planeSpeed);        
      };      
    }
  
    startGame() {
      this.clearScreen();
      this.field.drawField();
      this.player.drawObject();
      this.fuel.drawObject();
      this.house.drawObject();
      this.helicopter.drawHeli(this.heliSpeed);
      this.ship.drawShip(this.shipSpeed);
      this.jet.drawJet(this.jetSpeed);      
      window.requestAnimationFrame(() => this.startGame());
    }
  
    clearScreen() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);    
    }
}