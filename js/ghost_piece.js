(function () {
  var Tetris = window.Tetris = (window.Tetris || {});
  var SurrogatePiece = Tetris.SurrogatePiece;
  var GhostPiece = Tetris.GhostPiece = function (squares, board) {
    this.board = board;
    this.setSquares(squares);
  };

  GhostPiece.prototype = new SurrogatePiece();

  GhostPiece.prototype.moveToBottom = function () {
    if (this.willHitBottom() || this.willHit(this.board.getStationarySquares())) {
      return;
    } else {
      this.step();
      this.moveToBottom();
    }
  };

  GhostPiece.prototype.setSquares = function (squares) {
    this.squares = [];
    squares.forEach(function (square) {
      var position = [square.xPos, square.yPos];
      this.squares.push(new Tetris.GhostSquare(position, this.board));
    }.bind(this));
  };

  // GhostPiece.prototype.reset = function (piece) {
  //   this.color = piece.color;
  //   this.squares = piece.getSquares();
  // };

  GhostPiece.prototype.resetSquares = function () {
    this.squares.forEach(function (square) {
      square.reset();
    });
  };
})();
