(function () {
  var Tetris = window.Tetris = (window.Tetris || {});
  var IPiece = Tetris.IPiece;
  var Square = Tetris.Square;
  var Board = Tetris.Board = function () {
    this.movingPiece = new IPiece();//change this when you add more pieces
    this.stationarySquares = [];
  };

  Board.prototype.step = function () {
    if (this.pieceWillHit()) {
      this.pieceDidHit();
    } else {
      this.movingPiece.step();
    }
  };

  Board.prototype.nudge = function (direction) {
    this.movingPiece.nudge(direction);
  };

  Board.prototype.rotate = function () {
    this.movingPiece.rotate();
  };

  Board.prototype.pieceDidHit = function () {
    this.movingPiece.getSquares().forEach(function (square) {
      this.stationarySquares.push(square);
    }.bind(this));

    this.movingPiece = new IPiece();
  };

  Board.prototype.pieceWillHit = function () {
    if (this.movingPiece.willHit(this.stationarySquares)) {
      return true;
    } else if (this.movingPiece.willHitBottom()) {
      return true;
    } else {
      return false;
    }
  };

  Board.prototype.draw = function (ctx) {
    this.movingPiece.getSquares().forEach(function (square) {
      square.draw(ctx);
    });
    this.stationarySquares.forEach(function (square) {
      square.draw(ctx);
    });
  };

})();
