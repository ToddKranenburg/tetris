(function () {
  var Tetris = window.Tetris = (window.Tetris || {});
  var SurrogateSquare = Tetris.SurrogateSquare;

  var GhostSquare = Tetris.GhostSquare = function (position, board) {
    this.xPos = position[0];
    this.yPos = position[1];
    this.initialYPos = position[1];
    this.board = board;
  };

  GhostSquare.prototype = new SurrogateSquare();

  GhostSquare.prototype.drawGhost = function (ctx) {
    var x = this.xPos * 30;
    var y = this.yPos * 30;
    ctx.fillStyle = 'rgba(139, 139, 131, .4)';
    ctx.fillRect(x, y, 30, 30);
  };

  GhostSquare.prototype.reset = function () {
    this.yPos = this.initialYPos;
  };
})();
