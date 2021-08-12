// 1 - Iniciar o canvas e incluir a imagem da pista se deslocando para baixo
// 2 - Desenhar o carro na pista
// 3 - Fazer o carro se mover para esquerda e direita (implementar boundaries)
// 4 - Criar obstaculos
// 5 - Mover obstaculos e fazer aparecer varios obstaculos a cada X segundos
// 6 - Gerar obstaculos em tamanhos e posicoes aleatorias
// 7 - Criar logica de colisao entre o carro e os obstaculos
// 8 - Sistema de pontos
// 9 - Game over (fazer aparecer um score final)
/*
Regras do jogo (speed), metodos de start, verificar game over, display resultado final, contagem de pontuacao, player, inimigos, casas, fuel
*/

class Game {
  constructor(canvas, context, field, player) {
    this.canvas = canvas;
    this.context = context;
    this.field = field;
    this.jet = [];
    this.ship = [];
    this.helicopter = [];
    this.fuel = [];
    this.house = [];
    this.player = player;    
  }
  
  startGame() {
    this.clearScreen();
    this.field.drawField();
  }

  clearScreen() {
    this.context.context.clearRect(0, 0, this.canvas.width, this.canvas.height);    
  }
};

window.onload = () => {
  document.getElementById('start-button').onclick = () => {    
    // const player = new Player();
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const game = new Game(canvas, context, field, player);

    game.startGame();
  };
};