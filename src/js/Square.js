class Square {
  constructor(color,coordinate, piece = null){
    this.color = color;
    this.coordinate = new Coordinate(coordinate);
    if(piece) this.setPiece(piece);
  }
  get coordinateStr() {
    return this.coordinate.toString;
  }

  setPiece(piece){
    this._piece = piece;
    this._piece.setCoordinate(this.coordinate);
  }

  removePiece(){
    this._piece = null;
  }

  set piece(piece) {
    this._piece = piece;
  }
  get piece() {
    return this._piece
  }

  get pieceMovements(){
    if(this._piece == null){
      return [];
    }
    return this._piece.movements;
  }

  set selected(value){
    this._selected = value;
  }
  makeAvailable(availability = true){
    this.availability = availability;
  }

  getHTML(){
    const squareDiv = document.createElement('div');
    squareDiv.classList.add('square');
    squareDiv.classList.add(this.color);
    if(this.availability) squareDiv.classList.add('available');
    if(this._selected) squareDiv.classList.add('selected');
    squareDiv.setAttribute('id',this.coordinate.toString);
    if(this._piece){
      squareDiv.append(this._piece.getHTML());
    }
    return squareDiv;
  }
}