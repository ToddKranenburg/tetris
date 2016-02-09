(function () {
  var Tetris = window.Tetris = (window.Tetris || {});
  var SurrogatePiece = Tetris.SurrogatePiece;
  var Piece = Tetris.Piece;
  var Square = Tetris.Square;

  var IPiece = Tetris.IPiece = function () {
    var squares = [
      new Square([4, 0]),
      new Square([5, 0]),
      new Square([6, 0]),
      new Square([7, 0])
    ];
    Piece.call(this, squares);
  };

  IPiece.prototype = new SurrogatePiece();
})();
