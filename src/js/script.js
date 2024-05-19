document.addEventListener('DOMContentLoaded', () => {
  const chessboard = document.getElementById('chessboard');
  const pieces = {
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
    'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
  };
  
  const initialBoard = [
    'rnbqkbnr',
    'pppppppp',
    '        ',
    '        ',
    '        ',
    '        ',
    'PPPPPPPP',
    'RNBQKBNR'
  ];
  
  let selectedSquare = null;
  
  function createBoard() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.classList.add((i + j) % 2 === 0 ? 'white' : 'black');
        square.dataset.row = i;
        square.dataset.col = j;
        if (initialBoard[i][j] !== ' ') {
          square.textContent = pieces[initialBoard[i][j]];
        }
        square.addEventListener('click', handleSquareClick);
        chessboard.appendChild(square);
      }
    }
  }
  
  function handleSquareClick(event) {
    const square = event.target;
    if (selectedSquare) {
      movePiece(selectedSquare, square);
      selectedSquare.classList.remove('selected');
      selectedSquare = null;
    } else {
      if (square.textContent !== '') {
        selectedSquare = square;
        square.classList.add('selected');
      }
    }
  }
  
  function movePiece(fromSquare, toSquare) {
    if(!isLegalMove(fromSquare,toSquare)){
      return;
    }
    toSquare.textContent = fromSquare.textContent;
    fromSquare.textContent = '';
  }

  function isLegalMove(fromSquare, toSquare) {
    const posibleMovementSquares = getPosibleMovementSquares(fromSquare);
    if(posibleMovementSquares.find(e => e == toSquare) == undefined){
      alert("not posible movement");
      return;
    }
    return true;
  }

  function getPosibleMovementSquares(fromSquare){
    const pieceIndex = getPieceIndexFromFigure(fromSquare.textContent);
    const isWhite = isWhitePiece(fromSquare);

    const eatingCoordinates = getEatingCoordinates(fromSquare);
    const eatingSquares = getCalculatedMovementSquares(fromSquare,eatingCoordinates);
    validateEatingSquares(isWhite, eatingSquares);

    const movementCoordinates = getMovementCoordinates(fromSquare);
    const movementSquares = getCalculatedMovementSquares(fromSquare,movementCoordinates);
    validateMovementSquares(isWhite,movementSquares)

    return eatingSquares.concat(movementSquares);
  }

  function getSquareFromCoord(row,col){
    let square = null;
    row = parseInt(row);
    col = parseInt(col);
    if(row < 0 || row > 7 || col < 0 || col > 7) {
      return null;
    }
    const squares = chessboard.querySelectorAll('.square');
    squares.forEach(sqr => {
      const [sqrRow,sqrCol] = getRowColCoords(sqr);
      if(sqrRow == row && sqrCol == col){
        square = sqr;
      }
    });
    return square;
  }

  function getCalculatedMovementSquares(fromSquare,movementCoordinates){
    let squares = [];
    const [fromRow,fromCol] = getRowColCoords(fromSquare);
    for(let coords of movementCoordinates){
      const row = coords[0] != undefined ? coords[0] : 0;
      const col = coords[1] != undefined ? coords[1] : 0;
      const square = getSquareFromCoord((fromRow+row),(fromCol+col));
      if(square !== null){
        squares.push(square);
      }
    }
    return squares;
  }

  function getRowColCoords(square) {
    return [parseInt(square.getAttribute('data-row')),parseInt(square.getAttribute('data-col'))];
  }

  function getTowards(isWhite,numberOfSquares){
    return isWhite ? -numberOfSquares : numberOfSquares;
  }

  function getLeft(isWhite,numberOfSquares) {
    return getTowards(isWhite,numberOfSquares);
  }

  function validateEatingSquares(isWhite,eatingSquares){
    const clearFromIndex = [];
    eatingSquares.map((square, index) => {
      if(
        square.textContent == "" ||
        isWhitePiece(square) !== !isWhite
      ){
        clearFromIndex.unshift(index);
      }
    });
    clearFromIndex.map((index)=>{
      eatingSquares.splice(index,1);
    });
  }

  function validateMovementSquares(isWhite,movementSquares){
    const clearFromIndex = [];
    movementSquares.map((square, index) => {
      if(
        square.textContent != ""
      ){
        clearFromIndex.unshift(index);
      }
    });
    clearFromIndex.map((index)=>{
      movementSquares.splice(index,1);
    });
  }

  function isWhitePiece(square){
    const pieceIndex = getPieceIndexFromFigure(square.textContent);
    return pieceIndex == pieceIndex.toUpperCase();
  }

  function getPieceIndexFromFigure(figure){
    return Object.keys(pieces).find((e) => {
      return pieces[e] == figure
    });
  }

  function getEatingCoordinates(fromSquare){
    const pieceIndex = getPieceIndexFromFigure(fromSquare.textContent);
    const isWhite = isWhitePiece(fromSquare);
    switch (pieceIndex.toUpperCase()) {
      case 'P': //pawn
        //TODO passant capture
        return [
          [getTowards(isWhite,1),getLeft(isWhite,1)],
          [getTowards(isWhite,1),getLeft(isWhite,-1)]
        ];
        break;
      default:
        return getMovementCoordinates(fromSquare)
    }
  }

  function getMovementCoordinates(fromSquare){
    const pieceIndex =getPieceIndexFromFigure(fromSquare.textContent);
    const isWhite = isWhitePiece(fromSquare);
    switch (pieceIndex.toUpperCase()) {
      case 'P':
        return [
          [getTowards(isWhite,1),0]
        ];
        break;
    }
  }

  createBoard();
});
