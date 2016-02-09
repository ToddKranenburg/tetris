(function () {
  var Tetris = window.Tetris = (window.Tetris || {});
  var Piece = Tetris.Piece = function (squares) {
    this.squares = squares;
  };

  Piece.prototype.step = function () {
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i].step();
    }
  };

  Piece.prototype.getSquares = function () {
    return this.squares;
  };

  Piece.prototype.rotate = function () {
    var pivotSquare = this.squares[0];
    if (this.rotationIsInBounds()) {
      for (var i = 1; i < (this.squares.length); i++) {
        this.squares[i].pivot(pivotSquare);
      }
    }
  };

  Piece.prototype.nudge = function (direction) {
    var delta;
    switch(direction) {
      case "L":
        delta = [-1, 0];
        break;
      case "R":
        delta = [1, 0];
        break;
    }

    if (this.deltaIsInBounds(delta)) {
      this.squares.forEach(function (square) {
        square.nudge(delta);
      });
    }

  };

  Piece.prototype.deltaIsInBounds = function (delta) {
    for (var i = 0; i < this.squares.length; i++) {
      if (this.squares[i].willHitASide(delta)) {
        return false;
      }
    }

    return true;
  };

//there is a bug here
  Piece.prototype.rotationIsInBounds = function () {
    for (var i = i; i < this.squares.length; i++) {
      if (this.squares[i].willPivotIntoASide(this.squares[0])) {
        return false;
      }
    }

    return true;
  };

  Piece.prototype.willHitBottom = function (dim_y) {
    var squares = this.getSquares();
    for (var i = 0; i < squares.length; i++) {
      if (squares[i].willHitBottom()) {
        return true;
      }
    }

    return false;
  };
  Piece.prototype.willHit = function (otherSquares) {
    for (var i = 0; i < otherSquares.length; i++) {
      for (var j = 0; j < this.squares.length; j++) {
        if (this.squares[j].willHit(otherSquares[i])) {
          return true;
        }
      }
    }

    return false;
  };

  var SurrogatePiece  = Tetris.SurrogatePiece = function () {};
  SurrogatePiece.prototype = Piece.prototype;
})();
