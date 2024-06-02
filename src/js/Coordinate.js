class Coordinate {
  constructor(coordinateString){
    const [col,row] = this.getCoordsFromString(coordinateString);
    this._column = col;
    this._row = row;
  }
  getCoordsFromString(str){
    return str.split("");
  }
  set column(col) {
    this._column = col;
  }
  set row(row) {
    this._row = row;
  }
  get column() {
    return this._column;
  }
  get row() {
    return this._row;
  }
  get toString() {
    return ''+this._column+this._row;
  }
}