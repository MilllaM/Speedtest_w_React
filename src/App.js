import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import Score from './Score';
import Gameover from './Gameover';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
};

class App extends Component {
  state = {  //incl. all parts that will be updated
    activeButton: 0,
    clicks: 0,
    showGameover: false
  }
//UI elements are not dependent on these below,
//so they don't need to be inside the Component's state
  buttonList= [];
  timerId = undefined;
  delay = 1000;


// whenever a button is pressed:
handleClick = (btnId) => {
  console.log("Clicked: ", btnId);
  if (!(this.buttonList[0] === btnId)) {
    this.gameover();
    return;
  }
  this.buttonList.shift(); // vai: this.buttonList.slice(1);  ???
  this.setState(prevState => {
    return {
      clicks: prevState.clicks +1
    };
  });
}


  //gameover is not a method here, but an attribute!
    gameover = () => {
      clearTimeout(this.timerId);
      this.setState({
        showGameover:true
      });
    }

  next = () => {
    //check for game over
    if (this.buttonList.length >= 10 ) {
      this.gameover();
      return;
    }

    //pick the next active activeButton
    let nextActive = undefined;
    do {
      nextActive = getRandomInt(1, 4);
    }
    while (nextActive === this.state.activeButton);

    let newList = this.buttonList;
    newList.push(nextActive);

    //update active button state, check this still!
    this.setState ({ //param in setState are JS objects
      activeButton: nextActive
    });
    this.buttonList = newList;
    console.log(this.buttonList);

/* set timer for next activation
we need to tell which object this method (setTimeout) belongs to (bind method takes the object pointer)
Binding ensures that when we pass the method to the child component, it will still update the parent component.
setTimeout(this.next.bind(this),1000) */
    this.delay *= 0.95;
    this.timerId = setTimeout(this.next.bind(this), this.delay);
  }

  //this is called when...
  componentDidMount() {
    this.next();
  }


  render() {
    return (
      <div className="App">
        <main className="button-container">
          <Score score={ this.state.clicks} />
          <Button active ={this.state.activeButton === 1 } clickHandler={ () => this.handleClick(1)} />
          <Button active ={this.state.activeButton === 2 } clickHandler={ () => this.handleClick(2)} />
          <Button active ={this.state.activeButton === 3 } clickHandler={ () => this.handleClick(3)} />
          <Button active ={this.state.activeButton === 4 } clickHandler={ () => this.handleClick(4)} />
          {this.state.showGameover && <Gameover /> }
        </main>
      </div>
    );
  }
}

export default App;
