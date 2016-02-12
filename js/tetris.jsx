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
    var content;
    var aboutMe = (
      <div className="about-me">
        Created by Todd Kranenburg
        <a href="https://www.linkedin.com/in/toddkranenburg" className="my-link">Linkedin</a>
        <a href="https://github.com/ToddKranenburg/tetris" className="my-link">Github Repo</a>
      </div>
    );
    if (this.state.playing) {
      content = <GameView/>;
    } else {
      content = (
        <div className="intro">
          <h1 className="intro-header">TETRIS</h1>
          <ul className="intro-body">
          <li className="intro-body-element"><img className="key" src="images/a.gif"/> and <img className="key" src="images/d.gif"/> move the block left and right</li>
          <li className="intro-body-element"><img className="key" src="images/w.gif"/> drops the block to the bottom</li>
          <li className="intro-body-element"><img className="key" src="images/s.gif"/> speeds up the block</li>
          <li className="intro-body-element"><img className="key" src="images/r.gif"/> rotates the block</li>
          </ul>
          <button onClick={this.playGame} className="game-button">Start Playing!</button>
        </div>
      );
    }
    return (
      <div>
      {content}
      {aboutMe}
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var rootEl = document.getElementById('root');

  if (rootEl) {
    ReactDOM.render(<Tetris/>, rootEl);
  }
});
