import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return(
        <div className={"button" + (this.props.active ? "active" : "") }  onClick={ this.props.clickHandler }>
        </div>
    );
  }
}

export default Button;
