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
  
  const panelImg = new Image();
  panelImg.src = './images/panel-bar.png';
  
  // After images are loaded, instantiate objects
  panelImg.onload = () => {
    const field = new Field(canvas, context);
    const panel = new Panel(canvas, context, 0, 590, 1000, 220, panelImg);
    const game = new Game(canvas, context, field, panel);
    game.keyboardControlConfig();
    game.loadElementImgs();
    game.playerInst();
    game.startGame();    
  }
}