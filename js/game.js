var Board = require('./board');

var LevelScores = [150, 300, 500, 1000, 2000];
var Game = function () {
  this.board = new Board();
  this.DIM_X = 30 * 12;
  this.DIM_Y = 30 * 20;
  this.level = 0;
  this.score = 0;
};

Game.prototype.draw = function (ctx, explosionCtx) {
  this.board.draw(ctx, explosionCtx);
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

module.exports = Game;
