class Game {
  constructor(canvas){
    this.board = new Board();
    this.turn = 'white';
    this.status = 'Started';
    this.players = {
      'white': 'Player 1',
      'black': 'Player 2'
    }
    this.canvas = canvas;
    this.renderGame();
  }

  renderGame(){
    this.canvas.innerHTML = "";
    this.canvas.append(this.board.getHTML());
  }
}