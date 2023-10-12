import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

// some state or context for which player's turn
// or toggle between X and O

const Square = ({ value, onSquareClick }) => {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
        {value}
    </button>
  );
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState('X');

  const handleSquareClick = (i) => {
    // check first if square has value, so cannot overwrite
    // and check if we have winnter yet
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice(); // copy current squares state
    nextSquares[i] = nextValue;
    setSquares(nextSquares);
    setNextValue(nextValue === 'X' ? 'O' : 'X')
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${nextValue}`;
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
  }

  return (
    <div>
      <div>{status}</div>

      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)}/>
      </div>

      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)}/>
      </div>

      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)}/>
      </div>

      <button onClick={handleRestart}>Reset Game</button>
    </div>
  )
}

// 0 1 2 
// 3 4 5 
// 6 7 8
function calculateWinner(squares) {
  // define possible wins
  const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const App = () => {
  return (
    <div>
      <Board />
    </div>
  )
}

export default App;
