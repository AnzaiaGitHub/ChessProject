let game;
document.addEventListener('DOMContentLoaded', () => {
  const screens = {
    canvas: document.getElementById('chessboard'),
    gameMoves: document.getElementById('gameMoves'),
    turn:document.getElementById('turn') 
  }
  game = new Game(screens);
});
