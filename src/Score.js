import React, { Component } from 'react';
import './Score.css';

class Score extends Component {
  render() {
    return(
      <div id="score-container">Score: { this.props.score }</div>
    );
  }
}

export default Score;
