// 1 - Iniciar o canvas e incluir a imagem do jogo √
// 2 - Desenhar o aviao no cenario √
// 3 - Fazer o aviao se mover para esquerda e direita (implementar boundaries)
// 4 - Criar obstaculos
// 5 - Mover obstaculos e fazer aparecer varios obstaculos a cada X segundos
// 6 - Gerar obstaculos em tamanhos e posicoes aleatorias
// 7 - Criar logica de colisao entre o carro e os obstaculos
// 8 - Sistema de pontos
// 9 - Game over (fazer aparecer um score final)
/*
Regras do jogo (speed), metodos de start, verificar game over, display resultado final, contagem de pontuacao, player, inimigos, casas, fuel
*/

window.onload = () => {
  // Reference canvas and context
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  
  // Load panel img
  const panelImg = new Image();
  panelImg.src = './images/panel-bar.png';

  // Load fuel marker img
  const fuelMarkerImg = new Image();
  fuelMarkerImg.src = './images/fuel-marker.png';

  // load google font == Monoton
  WebFontConfig = {
    google:{ families: ['PressStart2P'] },
    active: function(){start();},
  };
  (function(){
    var wf = document.createElement("script");
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js';
    wf.async = 'true';
    document.head.appendChild(wf);
  })();
  
  // After images are loaded, instantiate objects
  panelImg.onload = () => {    
    const field = new Field(canvas, context);
    const panel = new Panel(canvas, context, 0, 590, 1000, 220, panelImg);
    const marker = new FuelMarker(canvas, context, 340, 640, 312, 60, fuelMarkerImg);
    const game = new Game(canvas, context, field, panel, marker);
    game.keyboardControlConfig();
    game.loadElementImgs();
    game.markerBarInst();
    game.playerInst();    
    game.startGame();
  }
}