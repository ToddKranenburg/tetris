// maybe add this component later and take it out of index.html?
var React = require('react'),
  ReactDOM = require('react-dom'),
  Game = require('../game');

var GameView = React.createClass({
  getInitialState: function () {
    this.bound = false;
    return ({
      game: null,
      ctx: null,
      explosionCtx: null,
      speed: 400,
      paused: false,
      gameOver: false
    });
  },

  componentDidMount: function () {
    var canvas = document.getElementById("game-canvas");
    var explosionCanvas = document.getElementById("explosion-canvas");

    canvas.width = window.Tetris.dimX;
    explosionCanvas.width = window.Tetris.dimX;
    canvas.height = window.Tetris.dimY;
    explosionCanvas.height = window.Tetris.dimY;
    var ctx = canvas.getContext("2d");
    var explosionCtx = explosionCanvas.getContext("2d");
    var game = new Game();

    this.setState({
      game: game,
      ctx: ctx,
      explosionCtx: explosionCtx
    }, this.start)
  },

  start: function () {
    var game = this.state.game;
    var ctx = this.state.ctx;
    var expCtx = this.state.explosionCtx;
    game.draw(ctx, expCtx);
    this.intervalId = setInterval(function () {
      if (game.step()) {
        if (game.shouldLevelUp()) {
          game.levelUp();
          window.clearInterval(this.intervalId);
          this.setState({speed: this.state.speed - 50}, this.start);
        }
        game.draw(ctx, expCtx);
        this.setState({game: game});
      } else {
        this.endGame();
      }
    }.bind(this), this.state.speed)

    if (!this.bound) {
      this.bindKeyHandlers();
    }
  },

  togglePause: function () {
    if (this.state.paused) {
      this.start();
      this.setState({paused: false});
    } else {
      window.clearInterval(this.intervalId);
      this.unbindKeyHandlers();
      this.setState({paused: true});
    }
  },

  unpause: function () {
  },

  bindKeyHandlers: function () {
    var game = this.state.game;
    var ctx = this.state.ctx;
    key('a', function () {
      game.board.nudge("L");
      game.draw(ctx);
    }.bind(this));
    key('d', function () {
      game.board.nudge("R");
      game.draw(ctx);
    }.bind(this));
    key('w', function () {
      game.board.forceFall(ctx);
    }.bind(this));
    key('s', function () {
      game.board.step();
      game.board.draw(ctx);
    }.bind(this));
    key('r', function () {
      game.board.rotate();
      game.draw(ctx);
    }.bind(this));

    this.bound = true;
  },

  unbindKeyHandlers: function () {
    key.unbind('a');
    key.unbind('d');
    key.unbind('r');
    key.unbind('w');
    key.unbind('s');

    this.bound = false;
  },

  newGame: function () {
    this.setState({
      game: new Game(),
      speed: 400,
      gameOver: false
    }, this.start)
  },

  endGame: function () {
    window.clearInterval(this.intervalId);
    this.unbindKeyHandlers();
    var ctx = this.state.ctx;
    ctx.fillStyle = 'rgba(238, 232, 170, .6)';
    ctx.fillRect(0, 0, window.Tetris.dimX, window.Tetris.dimY);
    this.setState({gameOver: true});
  },

  render: function () {
    var content, scoreboard;
    if (this.state.game) {
      scoreboard = (
        <div className="scoreboard">
          <h2 className="score">
            Score: {this.state.game.score}
          </h2>
          <h2 className="level">
            Level: {this.state.game.level}
          </h2>
        </div>
      );
    }
    if (this.state.gameOver) {
      content = (
        <div className="game-over">
          <h2>Game Over</h2>
          <button onClick={this.newGame}>Play Again?</button>
        </div>
      );
    } else {
      var buttonContent = this.state.paused ? "Play" : "Pause";
      content = (
        <button className="pause-button" onClick={this.togglePause}>
          {buttonContent}
        </button>
      );
    }
    return (
      <div>
        <canvas id="game-canvas">
        </canvas>
        <canvas id="explosion-canvas">
        </canvas>
        {scoreboard}
        {content}
      </div>

    );
  }
});

module.exports = GameView;
