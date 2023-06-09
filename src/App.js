import React, { useState } from "react"
import "./App.css"
import Square from "./components/Square"

const App = () => {
  const [board, setBoard] = useState([
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?"
  ])
  //Set useState for guesses
  const [guess, setGuess] = useState(5)
  //Set useStates for treasure and bomb location, randomizing each location 
  const [treasureLocation, setTreatureLocation] = useState(Math.floor(Math.random() * board.length)) 
  const [bombLocation, setBombLocation] = useState(Math.floor(Math.random() * board.length)) 

  //If treasure and bomb locations randomize to the same square, re-randomize bomb location
  if(treasureLocation ===  bombLocation){
    bombLocation = Math.floor(Math.random() * board.length)
  }

  const handleGamePlay = (index) => {

    let updatedBoard = [...board]
    //emoji keyboard is cmd+ctrl+space
    if(index === treasureLocation){
      updatedBoard[index] = "💰"
      setBoard(updatedBoard)
      alert("You win! You found the treasure! To play again, Press Play Again").setTimeout(handleRestart(), 2000)
    } else if(index === bombLocation){
      updatedBoard[index] = "💣"
      setBoard(updatedBoard)
      alert("BOOM! You found the bomb, you lose. To play again, Press Play Again").setTimeout(handleRestart(), 2000)
    } else {
      updatedBoard[index] = "🌴"
      setBoard(updatedBoard)
      if(guess === 0){
        alert("You have run out of guesses. Try Again.").setTimeout(handleRestart(), 2000)
      } else{
        setGuess(guess - 1)
      }
    }
  }
  //Function to reset the board if you win, lose, or run out of guesses. Also, reset the number of guesses
  const handleRestart = () => {
    setBoard([
      "?",
      "?",
      "?",
      "?",
      "?",
      "?",
      "?",
      "?",
      "?"
    ])
    setGuess(5)
  }
  
  return (
    <>
      <h1>Treasure Hunt Game</h1>
      <p className="guess">You have {guess} guesses left before game over!</p>
      <div className="gameboard">
        {board.map((value, index) => {
          return (
            <Square 
            value={value}
            key={index}
            index={index}
            handleGamePlay={handleGamePlay}
            />
          )
        })}
      </div>
      <button className="button" onClick={handleRestart}>Play Again</button>
    </>
  )
}

export default App
