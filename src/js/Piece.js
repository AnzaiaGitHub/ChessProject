const piecesMap = {
  'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
  'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};
class Piece {
  constructor(type,algebraicName,color,pieceIndex){
    if(this.constructor == Piece) {
      throw new Error("Piece needs to be abstracted");
    }
    if(this.setMovements == undefined) {
      throw new Error("setMovements method must be implemented");
    }
    this.type = type; //"Pawn"
    this.algebraicName = algebraicName; //this._coordinate.column
    this.color = color; //white
    this.shape = piecesMap[pieceIndex]; //"♙"
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

  setMovements(){}

  getHTML(){
    const container = document.createElement('P');
    container.classList.add('piece');
    container.textContent = this.shape;
    return container;
  }
}

class Pawn extends Piece {
  constructor(pieceIndex){
    const color = (pieceIndex == pieceIndex.toUpperCase()) ? 'white' : 'black';
    super('Pawn','',color,pieceIndex);
  }
  setCoordinate(coordinate){
    this._coordinate = coordinate;
    this.algebraicName = coordinate.column;
  }
  setMovements(){this._movements = []}
}

class Rook extends Piece {
  constructor(pieceIndex){
    const color = (pieceIndex == pieceIndex.toUpperCase()) ? 'white' : 'black';
    super('Rook','R',color,pieceIndex);
  }
  setMovements(){this._movements = []}
}

class Knight extends Piece {
  constructor(pieceIndex){
    const color = (pieceIndex == pieceIndex.toUpperCase()) ? 'white' : 'black';
    super('Knight','N',color,pieceIndex);
  }
  setMovements(){this._movements = ['1']}
}

class Bishop extends Piece {
  constructor(pieceIndex){
    const color = (pieceIndex == pieceIndex.toUpperCase()) ? 'white' : 'black';
    super('Bishop','B',color,pieceIndex);
  }
  setMovements(){this._movements = []}
}

class Queen extends Piece {
  constructor(pieceIndex){
    const color = (pieceIndex == pieceIndex.toUpperCase()) ? 'white' : 'black';
    super('Queen','Q',color,pieceIndex);
  }
  setMovements(){this._movements = []}
}

class King extends Piece {
  constructor(pieceIndex){
    const color = (pieceIndex == pieceIndex.toUpperCase()) ? 'white' : 'black';
    super('King','K',color,pieceIndex);
  }
  setMovements(){this._movements = []}
}