const initialBoardString = [
  'rnbqkbnr',
  'pppppppp',
  '        ',
  '        ',
  '        ',
  '        ',
  'PPPPPPPP',
  'RNBQKBNR'];
const colNames = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  4: 'e',
  5: 'f',
  6: 'g',
  7: 'h'
};
class Board {
  constructor(boardString = initialBoardString) {
    this.board = this.createBoard(boardString);
  }

  createBoard(boardStr){
    const rowsArray = [];
    if(!this.isValidBoardString(boardStr)){
      boardStr = initialBoardString;
    }
    for(let row = 0; row < 8; row++){
      const colsArray = [];
      for(let col = 0; col<8; col++){
        const coordinateStr = ''+colNames[col]+(8-row);
        const sqrColor = (row + col) % 2 === 0 ? 'white' : 'black';
        const char = boardStr[row][col];
        const square = this.getSquareFromChar(char,coordinateStr,sqrColor);
        colsArray.push(square);
      }
      rowsArray.push(colsArray);
    }
    return rowsArray;
  }

  getSquareFromChar(char, coordinate, sqrColor){
    let piece = null;
    if(char != " "){
      piece = this.getPieceFromChar(char);
    }
    if(piece != null){
      return new Square(sqrColor,coordinate,piece);
    }
    return new Square(sqrColor,coordinate);
  }

  getPieceFromChar(char){
    switch(char.toUpperCase()){
      case 'R':
        return new Rook(char);
        break;
      case 'N':
        return new Knight(char);
        break;
      case 'B':
        return new Bishop(char);
        break;
      case 'Q':
        return new Queen(char);
        break;
      case 'K':
        return new King(char);
        break;
      case 'P':
        return new Pawn(char);
        break;
    }
  }

  isValidBoardString(strArr){
    const regex = new RegExp("[RNBQKP ]");
    if(!Array.isArray(strArr) || strArr.length != 8){
      alert('bad rows quantity');
      return false;
    }
    for(const row of strArr){
      if(row.length != 8){
        alert('bad cols quantity in row '+row);
        return false;
      }
      for(const char of row.toUpperCase()){
        if(!regex.test(char)){
          alert('char "'+char+'" is not valid');
          return false;
        }
      }
    }
    return true;
  }

  getHTML(){
    const container = document.createElement('div');
    container.classList.add("game-board");
    for(const row of this.board){
      const rowDiv = document.createElement('div');
      rowDiv.classList.add("game-board-row");
      for(const square of row){
        const squareDiv = square.getHTML();
        if(square.piece){
          squareDiv.addEventListener('click',()=>{
            this.selectSquare(square)}
          );
        }
        rowDiv.append(squareDiv);
      }
      container.append(rowDiv);
    }
    return container;
  }

  selectSquare(square){
    let moves = square.piece.movements;
    if(moves.length > 0){
      square.selected = true;
      for(const move of moves){
        console.log(move);
      }
      game.renderGame();
    }
  }
}