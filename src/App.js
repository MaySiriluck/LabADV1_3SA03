import React from 'react';
import CharacterCard from './CharacterCard';
import './App.css';
import _ from 'lodash';

let message = 'Hello'
 
const prepareStateFromWord = (given_word) => {
  let word = given_word.toUpperCase()
  let chars = _.shuffle(Array.from(word))
  return {
    word,
    chars,
    attempt: 1,
    guess: [],
    completed: false
    boot: 1
  }
}
 
export default class App extends React.Component {
  state = prepareStateFromWord(message);
  boot =() => {
    this.setState({
      boot: this.state.boot + 1,
      completed: !this.state.completed,
      attempt: this.state.attempt = 1 
    })
  }

  activationHandler = (c) => {
    let guess = [...this.state.guess, c]
    this.setState({ guess })
    if (guess.length == this.state.chars.length) {
      if (guess.join('').toString() == this.state.word) {
        this.setState({ guess: [], completed: true })
      } else {
        this.setState({ guess: [], attempt: this.state.attempt + 1 })
      }
    }
  }

  render() {
    console.log
    return (
      <div>
        {
          Array.from(this.state.chars).map((item, index) => (
            <CharacterCard
              value={item}
              key={index}
              attempt={this.state.attempt}
              activationHandler={this.activationHandler}
              boot = {this.state.boot}/>
          ))
        }
        <h2>Selected</h2>
        {
          Array.from(this.state.guess).map((item, index) => (
            <CharacterCard
              value={item}
              key={index}
              activationHandler={this.activationHandler}/>
          ))
        }
        <div>Attemp {this.state.attempt}</div>{

          this.state.completed && <h4>Complete</h4>
        }
        {
          this.state.completed && <button onClick={this.boot}>Reset</button>
        }
      </div>
    )
  }
}