//import React from 'react';
//import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import Score from './Score';
import Gameover from './Gameover';


class App extends Component {
  state = {
    activeButton: 0,
    buttonList: [],
    clicks: 0,
    showGameover: false
  }

  timerId = undefined;
  delay = 1000;


gameover = () => {
    clearTimeout(this.timerId);
    this.setState({
      showGameover:true
    });
  }

getRandomInt (min, max) {
  return Math.floor(Math.random() * (max-min +1)) + min;
}

handleClick = (btnId) => () => {
  console.log("click", btnId);

  if(!(btnId === this.state.buttonList[0])) {
    //game over
    this.gameover();
    return;
  }

  this.setState({
    buttonList : this.state.buttonList.slice(1),
    clicks: this.state.clicks +1
  });
}

next = () => {

    //check for game over
    //APO!! tarkista tää, kun buttonlist siirrettiin pois componentista!!
if (this.state.buttonList.length >= 10 ){
  //end game
  this.gameover();
  return;
}

//pick the next active activeButton
let nextActive = 1 + (this.state.activeButton +1) % 3;
    //
do {
  nextActive = this.getRandomInt(1,3);
} while (nextActive === this.state.activeButton);

let newList = this.state.buttonList;
newList.push(nextActive);

//update active button state, check this still
this.setState ({
  activeButton: nextActive,
  buttonList: newList
});
console.log(this.state.buttonList);

//set timer for next activation
//we need to tell which object this method (setTimeout) belongs to to   (bind method takes the object pointer)

setTimeout(this.next.bind(this),1000)
}

//this is called when...
componentDidMount() {
  setTimeout(this.next, 2000); //aloitus vasta 2 sec jälkeen
  this.next();
}

render() {
  return (
    <div className="App">
    <main className="button-container">
    <Score score={ this.state.clicks} />
    <Button label="B" active ={this.state.activeButton ===1 } clickHandler={this.handleClick(1)} />
    <Button label="C" active ={this.state.activeButton ===2 } clickHandler={this.handleClick(2)} />
    <Button label="H" active ={this.state.activeButton ===3 } clickHandler={this.handleClick(3)} />
    {this.state.showGameover && <Gameover /> }
    </main>
    </div>
  )
}
}

export default App;
