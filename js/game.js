class Game {
  constructor(canvas, context, field, panel, player) {
    this.canvas = canvas;
    this.context = context;
    this.field = field;
    this.panel = panel;
    this.player = player;
    this.enemies = [];
    this.fuels = [];
    this.houses = [];    
    this.shots = [];
    this.rollDownElts = [this.enemies, this.fuels, this.houses];
    this.drawElts = [this.fuels, this.houses, this.enemies, this.shots];

    // Element imgs
    this.images = {
      heli: [],
      ship: [],
      jet: [],
      fuel: [],
      house: [],
      shot: [],
    };
    
    this.frames = 0;

    // CONFIGS
    // Frequencies    
    this.frequencies = {
      enemy: 150,
      fuel: 400,
      house: 2
    };
    // Speeds    
    this.speeds = {      
      heli: 4,
      ship: 2,
      jet: 10,
      shot: 25,
      screen: 2
    };
  }
  
  keyboardControlConfig() {
    document.onkeydown = (event) => {
      this.player.move(event.key.toLowerCase());
      if (event.key === ' ') this.shotInst();
      };
  }
  
  // Function that calls all game's working functions
  startGame() {
    // Count frames
    this.frames++;
    // Erase whole screen
    this.clearScreen();
    // Delete elements out of screen
    this.clearElements();
    // Draw game scenario
    this.field.drawField();
    // Roll Down elements
    this.rollDownElts.forEach(element => {
      element.forEach(item => {
        item.posY += this.speeds.screen;              
      });      
    });
    // Draw elements
    this.drawElts.forEach(element => {
      element.forEach(item => {
        item.draw();
      });      
    });    
    // Draw player
    this.player.draw();
    // Show elements on screen
    this.showEltsOnScreen();  
    // Draw control panel
    this.panel.draw();
    // function calling itself
    window.requestAnimationFrame(() => this.startGame());
  }
  
  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clearElements() {
    this.shots.forEach(shot => {
      if (shot.posY < 0) this.shots.splice(shot, 1);      
    });
    this.enemies.forEach(enemy => {
      if (enemy.posY > 750 || enemy.posX > 1000) this.enemies.splice(enemy, 1);      
    });
    this.fuels.forEach(fuel => {
      if (fuel.posY > 750) this.fuels.splice(fuel, 1);      
    });
    this.houses.forEach(house => {
      if (house.posY > 750) this.houses.splice(house, 1);      
    });
  }

  randomEnemyInst() {
    const randomEnemy = Math.floor(Math.random() * 3);
    switch (randomEnemy) {
      case 0:
        return this.heliInst();
      case 1:
        return this.shipInst();
      case 2:
        return this.jetInst();
    }
  }

  showEltsOnScreen() {
    if (this.frames % this.frequencies.enemy === 0) {
      this.randomEnemyInst();
    }
    if (this.frames % this.frequencies.fuel === 0) {
      this.fuelInst();
    }
    if (this.houses % this.frequencies.house === 0) {
      this.houseInst();      
    }
  }

  randomPosX() {
    return Math.floor(Math.random() * (650 - 280) + 280);
  }
  
  // Element instantiating functions
  heliInst() {
    const helicopter = new Helicopter(this.canvas, this.context, this.randomPosX(), 0, 50, 35, this.images.heli[0], this.speeds.heli);
    this.images.heli.forEach(element => {
      helicopter.images.push(element);      
    });
    this.enemies.push(helicopter);
  }

  shipInst() {    
    const ship = new Ship(this.canvas, this.context, this.randomPosX(), 0, 100, 30, this.images.ship[0], this.speeds.ship);
    this.images.ship.forEach(element => {
      ship.images.push(element);      
    });
    this.enemies.push(ship);
  }

  jetInst() {
    const jet = new Jet(this.canvas, this.context, 0, 150, 56, 21, this.images.jet[0], this.speeds.jet);
    this.images.jet.forEach(element => {
      jet.images.push(element);      
    });
    this.enemies.push(jet);
  }

  fuelInst() {
    const fuel = new Fuel(this.canvas, this.context, this.randomPosX(), 0, 49, 84, this.images.fuel[0]);
    this.fuels.push(fuel);
  }

  houseInst() {
    const house1 = new House(this.canvas, this.context, 60, 0, 112, 67, this.images.house[0]);
    const house2 = new House(this.canvas, this.context, 820, -350, 112, 67, this.images.house[0]);    
    this.houses.push(house1, house2);
  }  

  shotInst() {
    this.shots.push(new Shot(this.canvas, this.context, this.player.posX + 20, this.player.posY - 10, 5, 23, this.images.shot[0], this.speeds.shot));
  }

  // Load elements images
  loadElementImgs() {
    const heliR1 = new Image();
    heliR1.src = './images/heli-r-1.png';
    const heliR2 = new Image();
    heliR2.src = './images/heli-r-2.png';
    const heliL1 = new Image();
    heliL1.src = './images/heli-l-1.png';
    const heliL2 = new Image();
    heliL2.src = './images/heli-l-2.png';
    this.images.heli.push(heliR1, heliR2, heliL1, heliL2);
    const shipR = new Image();
    shipR.src = './images/ship-r.png';
    const shipL = new Image();
    shipL.src = './images/ship-l.png';
    this.images.ship.push(shipR, shipL);
    const jetR = new Image();
    jetR.src = './images/jet-r.png';
    const jetL = new Image();
    jetL.src = './images/jet-r.png';
    this.images.jet.push(jetR, jetL);
    const fuelImg = new Image();
    fuelImg.src = './images/fuel.png';
    this.images.fuel.push(fuelImg);
    const houseImg = new Image();
    houseImg.src = './images/house.png';
    this.images.house.push(houseImg);
    const shotImg = new Image();
    shotImg.src = './images/shot.png';
    this.images.shot.push(shotImg);
  }
}