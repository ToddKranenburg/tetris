var React = require('react'),
  ReactDOM = require('react-dom'),
  GameView = require('./components/game_view');

var Tetris = React.createClass({
  getInitialState: function () {
    return ({playing: false});
  },

  playGame: function () {
    this.setState({playing: true});
  },

  render: function () {
    if (this.state.playing) {
      return (
        <GameView/>
      );
    } else {
      return (
        <div className="intro">
          <h1 className="intro-header">Welcome to Tetris!</h1>
          <h2 className="intro-body-header">Commands:</h2>
          <p className="intro-body">'a' and 'd' to move the block left and right</p>
          <p className="intro-body">'w' to drop the block to the bottom</p>
          <p className="intro-body">'s' to speed the block up</p>
          <button onClick={this.playGame}>Start Playing!</button>
        </div>
      );
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var rootEl = document.getElementById('root');

  if (rootEl) {
    ReactDOM.render(<Tetris/>, rootEl);
  }
});
