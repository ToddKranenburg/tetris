// maybe add this component later and take it out of index.html?
var React = require('react'),
  ReactDOM = require('react-dom'),
  Game = require('../game');

var GameView = React.createClass({
  getInitialState: function () {
    this.bound = false;
    var highScore = document.cookie.replace(/(?:(?:^|.*;\s*)tetrisHighScore\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (highScore.length === 0) {
      highScore = "0";
    }
    var expiration = new Date(Date.now() + 1000*60*60*24*7)
    document.cookie = "tetrisHighScore=" + highScore + ";expires=" + expiration.toUTCString();
    return ({
      game: null,
      ctx: null,
      explosionCtx: null,
      speed: 400,
      paused: false,
      gameOver: false,
      highScore: parseInt(highScore)
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

  bindKeyHandlers: function () {
    var game = this.state.game;
    var ctx = this.state.ctx;
    key('left', function () {
      game.board.nudge("L");
      game.draw(ctx);
    }.bind(this));
    key('right', function () {
      game.board.nudge("R");
      game.draw(ctx);
    }.bind(this));
    key('up', function () {
      game.board.forceFall(ctx);
    }.bind(this));
    key('down', function () {
      game.board.step();
      game.board.draw(ctx);
    }.bind(this));
    key('enter', function () {
      game.board.rotate();
      game.draw(ctx);
    }.bind(this));

    this.bound = true;
  },

  unbindKeyHandlers: function () {
    key.unbind('left');
    key.unbind('right');
    key.unbind('up');
    key.unbind('down');
    key.unbind('enter');

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
    var highScore = this.state.highScore;
    if (this.state.game.score > highScore) {
      highScore = this.state.game.score;
    }
    document.cookie = "tetrisHighScore=" + highScore;
    this.setState({gameOver: true, highScore: highScore});
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
            Level: {this.state.game.level + 1}
          </h2>
          <h2 className="level">
            High Score: {this.state.highScore}
          </h2>
        </div>
      );
    }
    if (this.state.gameOver) {
      content = (
        <div className="game-over">
          <h2 className="game-over-header">Game Over</h2>
          <button onClick={this.newGame} className="game-button">PLAY AGAIN</button>
        </div>
      );
    } else {
      var buttonContent = this.state.paused ? "RESUME" : "PAUSE";
      content = (
        <div className="pause-button">
          <button className="game-button" onClick={this.togglePause}>
            {buttonContent}
          </button>
        </div>
      );
    }
    return (
      <div className="game-view">
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
