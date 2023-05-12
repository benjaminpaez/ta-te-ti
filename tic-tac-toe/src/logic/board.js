import { WINNER_COMBOS } from "../constants.js"

export const checkWinnerFrom = (boardToCheck) => {
  // vericamos todas las combinaciones ganadoras
    //para ver si gano x u o

  for(const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck [a] &&
      boardToCheck [a] === boardToCheck[b] &&
      boardToCheck [a] === boardToCheck [c]
    ) {
      return boardToCheck[a]
    }
  }
  //si no hay ganador
  return null
}

export const checkEndGame = (newBoard) => {
  //revisamos si hay empate, si no hay mas espacios vacios en el tab
  return newBoard.every((square) => square !== null)
}