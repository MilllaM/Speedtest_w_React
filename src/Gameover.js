import React, { Component } from 'react';
import './Gameover.css';

class Gameover extends Component {
  render() {
    return(
      <div id="overlay">
        <div id="gameover">Game over!!</div>
      </div>
    );
  }
}
export default Gameover;
