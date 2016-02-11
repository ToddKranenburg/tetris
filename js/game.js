
(function () {
  var Tetris = window.Tetris = (window.Tetris || {});
  var Board = Tetris.Board;
  var LevelScores = [150, 300, 500, 1000, 2000];
  var Game = Tetris.Game = function () {
    this.board = new Board();
    this.DIM_X = 30 * 12;
    this.DIM_Y = 30 * 20;
    this.level = 0;
    this.score = 0;
  };

  Game.prototype.draw = function (ctx, explosionCtx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.strokeRect(0, 0, this.DIM_X, this.DIM_Y);
    this.board.draw(ctx, explosionCtx);
    ctx.font = "30px serif";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + this.score, 230, 30);
    ctx.fillText("Level: " + (this.level + 1), 230, 70);
  };

  Game.prototype.shouldLevelUp = function () {
    return this.score >= LevelScores[this.level];
  };

  Game.prototype.levelUp = function () {
    this.level++;
  };

  Game.prototype.incrementScore = function (numExplosions) {
    this.score += numExplosions * 50;
  };

  Game.prototype.step = function () {

    if (this.board.gameIsOver()) {
      return false;
    } else {
      var numExplosions = this.board.step();
      this.incrementScore(numExplosions);

      return true;
    }
  };
})();
