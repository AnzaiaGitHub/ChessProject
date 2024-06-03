class Movement {
  constructor(squareFrom,squareTo,mustCapture,onlyMovement){
    this._squareFrom = squareFrom;
    this._squareTo = squareTo;
    this.mustCapture = mustCapture;
    this.onlyMovement = onlyMovement;
    this.pieceToMove = squareFrom.piece;
    this.pieceInSquareTo = squareTo.piece;
  }

  getWrittenMove(){
    const ambiguos = (this.isAmbiguosPiece || this.isCapture && this.pieceToMove.algebraicName == '');
    let moveString = '';
    moveString+= this.pieceToMove.algebraicName;
    moveString+= ambiguos ? this.squareFrom.coordinate.column : '';
    moveString+= this.isCapture ? 'x' : '';
    moveString+= this.squareTo.coordinate.toString;
    if(this.isCrowning){
      this.moveString += '='+this.squareTo.piece.pieceIndex;
    }
    if(this.causesCheck){
      moveString += this.causesCheckMate ? '#':'+';
    }
    return moveString;
  }

  get isCrowning(){
    if(
      this.pieceToMove.type == 'Pawn' &&
      (this.pieceToMove.isWhite && this.squareTo.coordinate.row == 8) ||
      (!this.pieceToMove.isWhite && this.squareTo.coordinate.row == 1)
    ){
      return true;
    }
    return false;
  }
  get squareTo (){
    return this._squareTo;
  }
  get squareFrom (){
    return this._squareFrom;
  }

  set squareTo (sqrTo){
    this._squareTo = sqrTo;
  }
  set squareFrom (sqrFrom){
    this._squareFrom = sqrFrom;
  }

  get causesCheck() {
    //do logic
    return false;
  }
  get causesCheckMate() {
    //do logic
    return false;
  }
  get isAmbiguosPiece(){
    //do logic
    return false;
  }
  get isCapture(){
    if(this.pieceInSquareTo){
      return true;
    }
    return false;
  }
}