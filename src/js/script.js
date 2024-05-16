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
    let eatingSquares = [];
    let movementSquares = [];
    const pieceIndex = Object.keys(pieces).find((e) => {
      return pieces[e] == fromSquare.textContent
    });
    const isWhite = pieceIndex === pieceIndex.toUpperCase();
    switch (pieceIndex) {
      case 'p': //black pawn
      case 'P': //white pawn
        const eatingCoordinates = [
          [getTowards(isWhite,1),getLeft(isWhite,1)],
          [getTowards(isWhite,1),getLeft(isWhite,-1)]
        ];
        eatingSquares = getCalculatedMovementSquares(fromSquare,eatingCoordinates);
        const movementCoordinates = [
          [getTowards(isWhite,1),0]
        ];
        movementSquares = getCalculatedMovementSquares(fromSquare,movementCoordinates);
        break;
    }
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

  createBoard();
});
