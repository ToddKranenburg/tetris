(function () {
  var Tetris = window.Tetris = (window.Tetris || {});

  var GameView = Tetris.GameView = function (game, ctx) {
    this.game = game;
    this.context = ctx;
  };

  GameView.prototype.start = function () {
    this.game.draw(ctx);
    this.intervalId = setInterval(function () {
      if (this.game.step()) {
        this.game.draw(ctx);
      } else {
        this.endGame();
      }
    }.bind(this), 100);

    this.bindKeyHandlers();
  };

  GameView.prototype.endGame = function () {
    window.clearInterval(this.intervalId);
    var dimX = this.game.DIM_X;
    var dimY = this.game.DIM_Y;
    this.context.fillStyle = 'rgba(238, 232, 170, .6)';
    this.context.fillRect(0, 0, dimX, dimY);
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
    key('r', function () {
      this.game.board.rotate();
      this.game.draw(this.context);
    }.bind(this));
  };

})();
