var SurrogatePiece = require('./piece').SurrogatePiece,
  Piece = require('./piece').Piece,
  Square = require('./square').Square;

var IPiece = function (board) {
  var squares = [
    new Square([4, 0], board),
    new Square([5, 0], board),
    new Square([6, 0], board),
    new Square([7, 0], board)
  ];
  this.color = "#00FFFF";
  Piece.call(this, squares, board);
};
IPiece.prototype = new SurrogatePiece();

var OPiece = function (board) {
  var squares = [
    new Square([5, 0], board),
    new Square([5, 1], board),
    new Square([6, 0], board),
    new Square([6, 1], board)
  ];
  this.color = "#FFFF00";
  Piece.call(this, squares, board);
};
OPiece.prototype = new SurrogatePiece();

var SPiece = function (board) {
  var squares = [
    new Square([4, 1], board),
    new Square([5, 0], board),
    new Square([5, 1], board),
    new Square([6, 0], board)
  ];
  this.color = "#00FF00";
  Piece.call(this, squares, board);
};
SPiece.prototype = new SurrogatePiece();


var ZPiece = function (board) {
  var squares = [
    new Square([4, 0], board),
    new Square([5, 0], board),
    new Square([5, 1], board),
    new Square([6, 1], board)
  ];
  this.color = "#FF0000";
  Piece.call(this, squares, board);
};
ZPiece.prototype = new SurrogatePiece();

var JPiece = function (board) {
  var squares = [
    new Square([4, 0], board),
    new Square([6, 0], board), 
    new Square([5, 0], board),
    new Square([6, 1], board)
  ];
  this.color = "#0000FF";
  Piece.call(this, squares, board);
};
JPiece.prototype = new SurrogatePiece();

var LPiece = function (board) {
  var squares = [
    new Square([4, 1], board),
    new Square([4, 0], board),
    new Square([5, 0], board),
    new Square([6, 0], board)
  ];
  this.color = "#FFA500";
  Piece.call(this, squares, board);
};
LPiece.prototype = new SurrogatePiece();


var TPiece = function (board) {
  var squares = [
    new Square([4, 0], board),
    new Square([5, 0], board),
    new Square([5, 1], board),
    new Square([6, 0], board)
  ];
  this.color = "#FF00FF";
  Piece.call(this, squares, board);
};
TPiece.prototype = new SurrogatePiece();

module.exports = {
  0: IPiece,
  1: JPiece,
  2: LPiece,
  3: OPiece,
  4: SPiece,
  5: TPiece,
  6: ZPiece
};
