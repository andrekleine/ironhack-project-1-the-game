const button = document.getElementById('jogar');
button.onclick = () => {
  // Reference canvas and context
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  
  // Load panel img
  const panelImg = new Image();
  panelImg.src = './images/panel-bar.png';

  // Load fuel marker img
  const fuelMarkerImg = new Image();
  fuelMarkerImg.src = './images/fuel-marker.png';
  
  // After images are loaded, instantiate objects
  panelImg.onload = () => {    
    const field = new Field(canvas, context);
    const panel = new Panel(canvas, context, 0, 590, 1000, 220, panelImg);
    const marker = new FuelMarker(canvas, context, 340, 640, 312, 60, fuelMarkerImg);
    const game = new Game(canvas, context, field, panel, marker, 0, 3);
    game.keyboardControlConfig();
    game.loadElementImgs();
    game.markerBarInst();
    game.playerInst();    
    game.startGame();
  }
}