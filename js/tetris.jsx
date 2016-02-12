var React = require('react'),
  ReactDOM = require('react-dom');

var Tetris = React.createComponent({
  getInitialState: function () {
    return ({playing: false});
  },

  playGame: function () {
    this.setState({playing: true});
  },

  render: function () {
    if (playing) {
      return <GameView/>;
    } else {
      return (
        <div className="intro">
        <h1 className="intro-header">Welcome to Tetris!</h1>
        <p className="intro-body">Use 'a' and 'd' to move the block left and right.</p>
        <p className="intro-body">'w' moves the piece all the way down.</p>
        <p className="intro-body">'s' makes the piece fall faster.</p>
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
