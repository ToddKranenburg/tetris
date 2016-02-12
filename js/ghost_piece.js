var SurrogatePiece = require('./piece').SurrogatePiece,
  GhostSquare = require('./ghost_square');


var GhostPiece = function (squares, board) {
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
    this.squares.push(new GhostSquare(position, this.board));
  }.bind(this));
};


GhostPiece.prototype.resetSquares = function () {
  this.squares.forEach(function (square) {
    square.reset();
  });
};

module.exports = GhostPiece;
