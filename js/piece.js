COLORS = ['#FD0', '#6C0', '#09F', '#F30'];

var Piece = function (squares, board) {
  var i = Math.floor(Math.random() * COLORS.length);
  // this.color = COLORS[i];
  this.addSquares(squares);
  this.board = board;
};

Piece.prototype.addSquares = function (squares) {
  this.squares = [];
  for (var i = 0; i < squares.length; i++) {
    squares[i].setColor(this.color);
    this.squares.push(squares[i]);
  }
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
  var midpoint = this.squares.length / 2;
  var pivotSquare = this.squares[midpoint];
  if (this.rotationIsInBounds()) {
    for (var i = 0; i < (this.squares.length); i++) {
      if (i === midpoint) {
        continue;
      }
      this.squares[i].pivot(pivotSquare);
    }
  }
};

Piece.prototype.moveTo = function (piece) {
  for (var i = 0; i < this.squares.length; i++) {
    oldSquare = this.squares[i];
    newSquare = piece.squares[i];

    oldSquare.moveTo(newSquare);
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

  if (this.deltaIsInBounds(delta) && this.deltaIsUnoccupied(delta)) {
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

Piece.prototype.deltaIsUnoccupied = function (delta) {
  for (var i = 0; i < this.squares.length; i++) {
    if (this.squares[i].willHitASquare(delta)) {
      return false;
    }
  }

  return true;
};

Piece.prototype.rotationIsInBounds = function () {
  var pivotSquare = this.squares[0];

  for (var i = 1; i < this.squares.length; i++) {
    var square = this.squares[i];
    if (square.willPivotIntoASide(pivotSquare)) {
      return false;
    } else if (square.willPivotIntoASquare(pivotSquare)) {
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

var SurrogatePiece  = function () {};
SurrogatePiece.prototype = Piece.prototype;

module.exports = {
  Piece: Piece,
  SurrogatePiece: SurrogatePiece
};
