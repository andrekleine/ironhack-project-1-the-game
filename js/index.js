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
  
  
  // IMPORT IMAGES
  const planeImg = new Image();
  planeImg.src = './images/plane.png';

  // Helicopter
  const heliR1 = new Image();
  heliR1.src = './images/heli-r-1.png';
  const heliR2 = new Image();
  heliR2.src = './images/heli-r-2.png';
  const heliL1 = new Image();
  heliL1.src = './images/heli-l-1.png';
  const heliL2 = new Image();
  heliL2.src = './images/heli-l-2.png';

  

  // After images are loaded, instantiate objects
  planeImg.onload = () => {
    const field = new Field(canvas, context);
    const player = new Player(canvas, context, 474, 530, 45, 49, planeImg);
    const helicopter = new Helicopter(canvas, context, 300, 200, 50, 35, heliR1);
    helicopter.images.push(heliR1, heliR2, heliL1, heliL2);
    const game = new Game(canvas, context, field, player, helicopter);
    game.keyboardControlConfig();
    game.startGame();
  }
}