class Game {
  constructor(canvas, context, field, panel, marker) {
    this.canvas = canvas;
    this.context = context;
    this.field = field;
    this.panel = panel;   
    this.marker = marker; 
    this.player = [];
    this.enemies = [];
    this.fuels = [];
    this.houses = [];    
    this.shots = [];
    this.markerBar = [];
    this.rollDownElts = [this.enemies, this.fuels, this.houses];
    this.drawElts = [this.fuels, this.houses, this.enemies, this.shots];
    this.allElts = [this.player, this.enemies, this.fuels, this.houses, this.shots, this.markerBar];
    this.score = 0;
    this.lives = 3;

    // Element imgs
    this.images = {
      player: [],
      heli: [],
      ship: [],
      jet: [],
      fuel: [],
      house: [],
      shot: [],
      explosion: [],
      marker: []
    };
    
    // Game state    
    this.frames = 0;
    this.fuelDuration = 2000;
    this.isGameOver = false;
    this.isOverFuel = false;

    // CONFIGS
    // Frequencies    
    this.frequencies = {
      enemy: 100,
      fuel: 200,
      house: 2
    };
    // Speeds    
    this.speeds = {
      player: 35,
      heli: 6,
      ship: 4,
      jet: 10,
      shot: 25,
      screen: 3
    };
    this.points = {
      ship: 30,
      heli: 60,
      fuel: 80, 
      jet: 100
    }
  }
  
  // CONTROLS KEYBOARD EVENTS
  keyboardControlConfig() {
    document.onkeydown = (event) => {
      if (!this.isGameOver) {
        this.player[0].move(event.key.toLowerCase());
        if (event.key === ' ') this.shotInst();        
      }
    };
  }
  
  // MAIN FUNCTION: CALLS ALL GAME UPDATING FUNCTIONS
  startGame() {
    this.frames++;
    this.clearScreen();
    this.clearElements();
    this.field.drawField();    
    this.drawElements();
    this.showEltsOnScreen();
    this.rollDown();
    this.checkCollisions();
    this.checkFuel();
    this.player[0].draw();
    this.drawPanel();
    this.updateScore();
    this.gameUpdate();
  }

  // CHECKS FOR GAME OVER || KEEP CALLING startGame();
  gameUpdate() {
    if (this.isGameOver) {
      this.context.font = '100px PressStart2P';
      this.context.fillStyle = 'white';
      setTimeout(() => {
        this.context.fillText('GAME OVER', 50, 380);
      }, 500);      
    }
    else {
      window.requestAnimationFrame(() => this.startGame());
    }
  }

  // CLEANUP FUNCTIONS
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

  // FEEDS ENEMIES TO ENEMIES []
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

  // INSTANTIATES ENEMIES, FUELS AND HOUSES x GAME FRAMES
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

  // ROLLS ALL GAME ELEMENTS DOWN
  rollDown() {
    this.rollDownElts.forEach(element => {
      element.forEach(item => {
        item.posY += this.speeds.screen;        
      });      
    });
  }

  // DRAWS ALL ELEMENTS ON SCREEN
  drawElements() {
    this.drawElts.forEach(element => {
      element.forEach(item => {
        item.draw();
      });      
    });
  }

  // DRAWS PANEL ON SCREEN
  drawPanel () {
    this.panel.draw();
    this.markerBar[0].draw(this.fuelDuration, this.isOverFuel);
    this.marker.draw();
  }  

  // GATHERS ALL COLLISION FUNCTIONS
  checkCollisions() {
    this.crashIntoWall();
    this.checkPlaneCollision();
    this.checkPlaneFuelCollision();
    this.checkShotEnemyCollision();
    this.checkShotFuelCollision();
  }
  
  // CHECKS FOR FUEL LEVEL
  checkFuel() {
    if (this.markerBar[0].empty()) {
      this.player[0].image = this.player[0].images[1];
        this.player[0].draw();
        setTimeout(() => {
          this.isGameOver = true;
        }, 30);
    }
  }

  // NEXT TWO FUNCTIONS CHECK FOR POINTS
  checkEnemyPoints(enemy) {
    switch(enemy.constructor.name) {
      case 'Ship':
        this.score += this.points.ship;
        break;
      case 'Helicopter':
        this.score += this.points.heli;
        break;
      case 'Jet':
        this.score += this.points.jet;
        break;      
      default:
        this.score += 0;      
    }
  }

  checkFuelPoints() {
    this.score += this.points.fuel;
  }

  // UPDATES SCORE  
  updateScore() {
    this.context.font = '28px PressStart2P';
    this.context.fillStyle = 'yellow';
    this.context.fillText('SCORE', 770, 650);
    this.context.font = '36px PressStart2P';
    this.context.fillText(this.score, 765, 705 );
  }

  // updateLives() {
  //   this.context.font = '46px Tahoma';
  //   this.context.fillStyle = 'yellow';
  //   this.context.fillText(`Lives: ${this.lives}`, 80, 690);
  // }

  // COLLISION FUNCTIONS
  crashIntoWall() {
    if (this.player[0].posX < 250 || this.player[0].posX > 710) {
      this.player[0].image = this.player[0].images[1];
      this.player[0].draw();
      setTimeout(() => {
        this.isGameOver = true;
      }, 20)
    }
  }

  checkPlaneCollision() {
    this.enemies.forEach((enemy) => {
      if (this.player[0].crashWith(enemy)) {  
        enemy.image = this.images.explosion[0];
          setTimeout(() => {
            enemy.image = this.images.explosion[1];            
          }, 20); 
        this.player[0].image = this.player[0].images[1];
        this.player[0].draw();
        setTimeout(() => {
          this.isGameOver = true;
        }, 20)
      }
    });
  }

  checkPlaneFuelCollision() {
    this.fuels.forEach((fuel) => {
      this.player[0].crashWith(fuel) ? this.isOverFuel = true : this.isOverFuel = false;
    });
  }

  checkShotFuelCollision() {
    this.shots.forEach(shot => {
      this.fuels.forEach((fuel) => {      
        if (shot.crashWith(fuel)) {
          this.checkFuelPoints();
          this.shots.splice(shot, 1);
          fuel.image = this.images.explosion[0];
          setTimeout(() => {
            fuel.image = this.images.explosion[1];
            fuel.posX
          }, 100);
          setTimeout(() => {
            this.fuels.splice(fuel, 1);
          }, 200);
        }
      });
    });
  }

  checkShotEnemyCollision() {
    this.shots.forEach(shot => {
      this.enemies.forEach((enemy) => {      
        if (shot.crashWith(enemy)) {
          this.checkEnemyPoints(enemy);
          this.shots.splice(shot, 1);
          enemy.image = this.images.explosion[0];
          setTimeout(() => {
            enemy.image = this.images.explosion[1];            
          }, 100);
          setTimeout(() => {
            this.enemies.splice(enemy, 1);
          }, 100);
        }
      });
    });
  }
  
  // ELEMENT INSTANTIATING FUNCTIONS
  randomPosX() {
    return Math.floor(Math.random() * (650 - 280) + 280);
  }

  playerInst() {
    const player = new Player(this.canvas, this.context, 474, 530, 45, 49, this.images.player[0], this.speeds.player);    
    this.images.player.forEach(element => {
      player.images.push(element);
    });
    this.player.push(player);
  }

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
    this.shots.push(new Shot(this.canvas, this.context, this.player[0].posX + 20, this.player[0].posY - 10, 5, 23, this.images.shot[0], this.speeds.shot));
  }

  markerBarInst() {
    this.markerBar.push(new MarkerBar(this.canvas, this.context, 612, 655, 16, 40, this.images.marker[0]));
  }

  // LOADS ELEMENTS' IMAGES
  loadElementImgs() {
    const planeImg = new Image();
    planeImg.src = './images/plane.png';
    const planeExpl = new Image();
    planeExpl.src = './images/explosion-plane.png';
    this.images.player.push(planeImg, planeExpl);    
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
    const explMin1 = new Image();
    explMin1.src = './images/explosion-minor-1.png';
    const explMin2 = new Image();
    explMin2.src = './images/explosion-minor-2.png';    
    this.images.explosion.push(explMin1, explMin2);
    const markerBarImg = new Image();
    markerBarImg.src = './images/fuel-marker-bar.png';  
    this.images.marker.push(markerBarImg);
  }
}