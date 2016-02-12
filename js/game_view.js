(function () {
  var Tetris = window.Tetris = (window.Tetris || {});

  var GameView = Tetris.GameView = function (game, ctx, explosionCtx) {
    this.game = game;
    this.context = ctx;
    this.explosionContext = explosionCtx;
    this.speed = 400;
    this.bound = false;
  };

  GameView.prototype.start = function () {
    this.game.draw(this.context, this.explosionContext);
    this.intervalId = setInterval(function () {
      if (this.game.step()) {
        if (this.game.shouldLevelUp()) {
          this.game.levelUp();
          window.clearInterval(this.intervalId);
          this.speed -= 50;
          this.start();
        }
        this.game.draw(this.context, this.explosionContext);
      } else {
        this.endGame();
      }
    }.bind(this), this.speed);
    if (!this.bound) {
      this.bindKeyHandlers();
    }
  };

  GameView.prototype.endGame = function () {
    window.clearInterval(this.intervalId);
    this.unbindKeyHandlers();
    var dimX = this.game.DIM_X;
    var dimY = this.game.DIM_Y;
    this.context.fillStyle = 'rgba(238, 232, 170, .6)';
    this.context.fillRect(0, 0, dimX, dimY);
    this.context.font = "48px serif";
    this.context.textAlign = "center";
    this.context.fillStyle = "black";
    this.context.fillText("Game Over", dimX/2, dimY/2);
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
    key('w', function () {
      this.game.board.forceFall(this.context);
    }.bind(this));
    key('s', function () {
      this.game.board.step();
      this.game.board.draw(this.context);
    }.bind(this));
    key('r', function () {
      this.game.board.rotate();
      this.game.draw(this.context);
    }.bind(this));

    this.bound = true;
  };

  GameView.prototype.unbindKeyHandlers = function () {
    key.unbind('a');
    key.unbind('d');
    key.unbind('r');
    key.unbind('w');
    key.unbind('s');

    this.bound = false;
  };

})();
