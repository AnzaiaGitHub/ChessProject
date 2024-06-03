class Game {
  constructor(nodes){
    this._board = new Board();
    this.turn = 'white';
    this.moveNumber = 1;
    this.status = 'Started';
    this.players = {
      'white': 'Player 1',
      'black': 'Player 2'
    }
    this.movesHistory = [];
    this.nodes = nodes;
    this.renderGame();
  }

  renderGame(){
    this.nodes.canvas.innerHTML = "";
    this.nodes.gameMoves.innerHTML = "";
    this.nodes.gameMoves.append(this.getMovesHTML());
    this.nodes.canvas.append(this._board.getHTML());
    this.nodes.turn.innerHTML = this.turn;
  }

  get board (){
    return this._board;
  }
  set board (board){
    this._board = board;
  }

  get turn (){
    return this._turn;
  }
  set turn (turn){
    this._turn = turn;
  }
  addMove(moveString){
    if(this.turn == 'white'){
      this.movesHistory.push(this.moveNumber+'.'+moveString);
    } else {
      this.movesHistory[this.moveNumber-1]+=' '+ moveString;
    }
  }

  nextTurn(){
    this.turn = this._turn == 'white' ? 'black' : 'white';
    if(this.turn == 'white'){
      this.moveNumber++;
    }
  }

  getMovesHTML(){
    const list = document.createElement('ul');
    this.movesHistory.map((round)=>{
      const li = document.createElement('li');
      li.textContent = round;
      list.append(li);
    });
    return list;
  }
}