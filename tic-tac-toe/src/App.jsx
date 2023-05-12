import { useState } from "react"
import confetti from 'canvas-confetti'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { DrawBoard } from "./components/DrawBoard.jsx"
import { DrawTurn } from "./components/DrawTurn.jsx"
import { saveGameStorage, resetGameStorage } from "./logic/storage/main.js"


function App() {
  const [board, setBoard] = useState( () =>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) :
    Array(9).fill(null) 
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  }) 

  //para saber si hay ganador
    //null -> no hay ganador
    //false -> empate
  const [winner, setWinner] = useState(null) 

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    //no actualiza la posicion si ya tiene algo
    // o si ya hay un ganador
    if (board[index] || winner ) return

    //actualiza el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //guardar partida en localStorage
    saveGameStorage( {
      board: newBoard,
      turn: newTurn
    })

    //revisamos si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
 
  return (
    <>
      <main className="board">
        <h1>TIC TAC TOE</h1>
        
        <button onClick={resetGame}>Resetear juego</button>
        
        <DrawBoard board={board} updateBoard={updateBoard}/>

        <DrawTurn turn={turn} />

        <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
    </>
  )
}

export default App
