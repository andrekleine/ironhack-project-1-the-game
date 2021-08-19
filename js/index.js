window.onload = () => {
  const comandos = document.getElementById('comandos');
  const button = document.getElementById('button');
    
  // Load fuel marker image
  this.markerImg = new Image();
  markerImg.src = './images/fuel-marker.png';
  
  button.onclick = () => {
    const game = new Game(markerImg, 0, 3);
    game.keyboardControlConfig();
    game.loadElementImgs();
    game.markerBarInst();
    game.playerInst();    
    game.startGame();
    document.body.removeChild(comandos);
  };
};

