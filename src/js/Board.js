const initialBoardString = [
  'rnbqkbnr',
  'pppppppp',
  '        ',
  '        ',
  '        ',
  '        ',
  'PPPPPPPP',
  'RNBQKBNR'];
const colNames = 'abcdefgh'.split('');
class Board {
  constructor(boardString = initialBoardString) {
    this.rowsArray = this.createBoard(boardString);
  }

  get movements (){
    return this._movements;
  }
  set movements (moves){
    this._movements = moves;
  }

  get noPieceSelected (){
    if(this.getSelectedSquare() != null){
      return false;
    }
    return true;
  }

  getSelectedSquare(){
    let selectedSquare = null;
    this.rowsArray.map((squaresRow)=>{
      squaresRow.map((sqr)=>{
        if(sqr.isSelected){
          selectedSquare = sqr;
        }
      });
    });
    return selectedSquare;
  }

  createBoard(boardStr){
    const rowsArr = [];
    if(!this.isValidBoardString(boardStr)){
      boardStr = initialBoardString;
    }
    for(let row = 0; row < 8; row++){
      const colsArray = [];
      for(let col = 0; col<8; col++){
        const coordinateStr = ''+colNames[col]+(8-row);
        const sqrColor = (row + col) % 2 === 0 ? 'white' : 'black';
        const char = boardStr[row][col];
        const square = this.createSquareFromChar(char,coordinateStr,sqrColor);
        colsArray.push(square);
      }
      rowsArr.push(colsArray);
    }
    return rowsArr;
  }

  createSquareFromChar(char, coordinate, sqrColor){
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
    for(const row of this.rowsArray){
      const rowDiv = document.createElement('div');
      rowDiv.classList.add("game-board-row");
      for(const square of row){
        const squareDiv = square.getHTML();
        if(square.piece && !square.availability){
          squareDiv.addEventListener('click',()=>{
            this.selectSquare(square)
          });
        }
        if(square.availability){
          squareDiv.addEventListener('click',()=>{
            this.moveHere(square);
          });
        }
        rowDiv.append(squareDiv);
      }
      container.append(rowDiv);
    }
    return container;
  }

  selectSquare(square){
    if(game.turn != square.piece.color){
      return;
    }
    this.movements = [];
    if(square.isSelected || !this.noPieceSelected){
      const selectedSquare = this.getSelectedSquare();
      selectedSquare.selected=false;
      this.cleanAvailables();
      if(square != selectedSquare){
        this.selectSquare(square);
      }
    } else {
      this.movements = square.piece.movements;
    }
    if(this.movements?.length > 0){
      square.selected = true;
      this.movements.map((move)=>{
        move.squareTo.makeAvailable();
      });
    }
    game.renderGame();
  }

  moveHere(square){
    const move = this._movements.find(move => move.squareTo.coordinateStr === square.coordinateStr);
    let piece = move.squareFrom.piece;
    move.squareFrom.removePiece();
    move.squareFrom.selected = false;
    piece.initialPosition = false;
    if(move.isCrowning){
      piece = this.choseCrowning(piece.isWhite);
    }
    move.squareTo.setPiece(piece);
    this.cleanAvailables();
    game.addMove(move.getWrittenMove());
    game.nextTurn();
    game.renderGame();
  }

  cleanAvailables(){
    this.rowsArray.map((row)=>{
      row.map((square)=>{
        if(square.availability === true){
          square.makeAvailable(false);
        }
      });
    });
  }

  choseCrowning(isWhite){
    let options = 'q,r,n,b';
    let option = prompt('Chose the crowning opt: '+options);
    if(isWhite){
      option = option.toUpperCase();
    } else {
      option = option.toLowerCase();
    }
    console.log('option: '+option);
    let piece;
    switch(option.toUpperCase()){
      case 'Q':
      case 'R':
      case 'N':
      case 'B':
        console.log('process option');
        piece = this.getPieceFromChar(option);
        piece.initialPosition = false;
        break;
      default:
        console.log('wrong option');
        piece=null;
    }
    if(piece){
      return piece;
    }
    return this.choseCrowning(isWhite)
  }

  getSquareByCoord(coord){
    let returningSquare = null;
    this.rowsArray.map((row)=>{
      row.map((square)=>{
        if(square.coordinateStr === coord){
          returningSquare = square;
        }
      });
    });
    return returningSquare;
  }
}