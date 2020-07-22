import React from 'react';
import ChoiceCard from './components/ChoiceCard.jsx'
import './App.css';
import { useState } from "react";

import ChoiceButtons from "./components/ChoiceButtons";



import { CHOICES, getRoundOutcome } from "./utils";


function App() {
  const [prompt, setGamePrompt] = useState("Start");

  const onPlayerChoose = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);
    console.log(result)
    console.log(compChoice)

    const newUserChoice = CHOICES[playerChoice];
    const newComputerChoice = CHOICES[compChoice];

    setPlayerChoice(newUserChoice);
    setComputerChoice(newComputerChoice);

    if (result === "Victory!") {
      setPreviousWinner("You");
    } else if (result === "Defeat!") {
      setPreviousWinner("Computer");
    } else {
      setPreviousWinner("Tie");
    }
    setGamePrompt(result);
    gameHistory.push(result);
    setGameHistory(gameHistory);
  };
  const [gameHistory, setGameHistory] = useState([]);


  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [previousWinner, setPreviousWinner] = useState(null);

  return <div className="App">
    <div className="App">
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-8 themed-grid-col">
            <ChoiceCard
              title="Computer"
              previousWinner={previousWinner}
              imgURL={computerChoice && computerChoice.url}
            />
            <h1>{prompt}</h1>
            <ChoiceButtons onPlayerChoose={onPlayerChoose} />
            <ChoiceCard
              title="You"
              previousWinner={previousWinner}
              imgURL={playerChoice && playerChoice.url}
            />
          </div>
          <div className="col-md-4 themed-grid-col">
            <h3>History</h3>
            <ul>
              {gameHistory.map(result => {
                return <li>{result}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default App;
