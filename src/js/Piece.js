const piecesMap = {
  'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
  'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};
class Piece {
  constructor(type,algebraicName,pieceIndex){
    if(this.constructor == Piece) {
      throw new Error("Piece needs to be abstracted");
    }
    if(this.setMovements == undefined) {
      throw new Error("setMovements method must be implemented");
    }
    this.initialPosition = true;
    this.type = type; //"Queen"
    this.algebraicName = algebraicName; //Q
    this.pieceIndex = pieceIndex;
    this.color = (pieceIndex == pieceIndex.toUpperCase()) ? 'white' : 'black'; //white
    this.shape = piecesMap[pieceIndex]; //"Q"
  }
  get movements (){
    this.setMovements();
    return this._movements;
  }
  set movements (movements){
    this._movements = movements;
  }
  setCoordinate(coordinate){
    this._coordinate = coordinate;
  }
  set coordinate (coordinate){
    this._coordinate = coordinate;
  }
  get isWhite() {
    return this.color == 'white';
  }

  setMovements(){}

  getHTML(){
    const container = document.createElement('P');
    container.classList.add('piece');
    container.textContent = this.shape;
    return container;
  }

  calculateMoveCoordinate(stepsForward,stepsRight){
    const factor = this.isWhite ? 1 : -1;
    const currentCol = colNames.indexOf(this._coordinate.column);
    const currentRow = -1 + Number(this._coordinate.row);
    const toCol = currentCol + (factor*stepsRight);
    const toRow = currentRow + (factor*stepsForward);
    if(
      toCol > 7 ||
      toCol < 0 ||
      toRow > 7 ||
      toRow < 0
    ){
      return null;
    }
    return ''+colNames[toCol]+(toRow+1);
  }

  getRectMovement(stepsForward,stepsRight,mustCapture=false,onlyMovement=false){
    return null;
  }
  
  createMovement(stepsForward,stepsRight,mustCapture=false,onlyMovement=false){
    const coord = this.calculateMoveCoordinate(stepsForward,stepsRight);
    if(coord == null){
      return null;
    }
    const squareFrom = game._board.getSquareByCoord(this._coordinate.toString);
    const squareTo = game._board.getSquareByCoord(coord);
    if(mustCapture && squareTo.piece == null){
      return null;
    }
    if(squareTo.piece?.color === this.color){
      return null;
    }
    if(onlyMovement && squareTo.piece != null){
      return null;
    }
    const movement = new Movement(squareFrom,squareTo,mustCapture,onlyMovement);
  if(movement.causesSelfCheck){
    return null;
  }
    return movement;
  }
}

class Pawn extends Piece {
  constructor(pieceIndex){
    super('Pawn','',pieceIndex);
  }
  setCoordinate(coordinate){
    this._coordinate = coordinate;
  }
  setMovements(){
    let posibleMovements = [];
    posibleMovements.push(this.createMovement(1,1,true));
    posibleMovements.push(this.createMovement(1,-1,true));
    posibleMovements.push(this.createMovement(1,0,false,true));
    if(this.initialPosition){
      posibleMovements.push(this.getRectMovement(2,0,false,true));
    }
    this._movements = posibleMovements.filter(move => move !== null);;
  }
}

class Rook extends Piece {
  constructor(pieceIndex){
    super('Rook','R',pieceIndex);
  }
  setMovements(){this._movements = []}
}

class Knight extends Piece {
  constructor(pieceIndex){
    super('Knight','N',pieceIndex);
  }
  setMovements(){this._movements = []}
}

class Bishop extends Piece {
  constructor(pieceIndex){
    super('Bishop','B',pieceIndex);
  }
  setMovements(){this._movements = []}
}

class Queen extends Piece {
  constructor(pieceIndex){
    super('Queen','Q',pieceIndex);
  }
  setMovements(){this._movements = []}
}

class King extends Piece {
  constructor(pieceIndex){
    super('King','K',pieceIndex);
  }
  setMovements(){this._movements = []}
}