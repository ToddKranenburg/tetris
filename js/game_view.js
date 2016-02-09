(function () {
  var Tetris = window.Tetris = (window.Tetris || {});

  var GameView = Tetris.GameView = function (game, ctx) {
    this.game = game;
    this.context = ctx;
  };

  GameView.prototype.start = function () {
    this.game.draw(ctx);

    this.intervalId = setInterval(function () {
      this.game.step();
      this.game.draw(ctx);
    }.bind(this), 500);

    this.bindKeyHandlers();
  };

  GameView.prototype.pause = function () {
    window.clearInterval(this.intervalId);
  };

  GameView.prototype.bindKeyHandlers = function () {

    key('a', function () {
      this.game.board.nudge("L");
      this.game.draw(this.context);
    }.bind(this));
    // key('w', function () {
    //   this.game.ship.power([0, -1]);
    // }.bind(this));
    key('d', function () {
      this.game.board.nudge("R");
      this.game.draw(this.context);
    }.bind(this));
    // key('s', function () {
    //   this.game.ship.power([0, 1]);
    // }.bind(this));
    key('space', function () {
      this.game.board.rotate();
      this.game.draw(this.context);
    }.bind(this));
  };

})();
