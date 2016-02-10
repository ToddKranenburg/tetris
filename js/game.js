
(function () {
  var Tetris = window.Tetris = (window.Tetris || {});
  var Board = Tetris.Board;

  var Game = Tetris.Game = function () {
    this.board = new Board();
    this.DIM_X = 30 * 12;
    this.DIM_Y = 30 * 20;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.strokeRect(0, 0, this.DIM_X, this.DIM_Y);
    this.board.draw(ctx);
  };

  Game.prototype.step = function () {
    if (this.board.gameIsOver()) {
      return false;
    } else {
      this.board.step();
      return true;
    }
  };
})();
