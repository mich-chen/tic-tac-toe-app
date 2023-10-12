import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

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

const Board = ({ nextValue, squares, onPlay }) => {
  const handleSquareClick = (i) => {
    // check first if square has value, so cannot overwrite
    // and check if we have winnter yet
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice(); // copy current squares state
    nextSquares[i] = nextValue;
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${nextValue}`;
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
    </div>
  )
}

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]); // nested array of board's values
  const [currentMove, setCurrentMove] = useState(0); // index of current move in history

  // 'X' is even move, 'O' is odd moves
  const nextValue = currentMove % 2 === 0 ? 'X' : 'O'; // can dynamically calculate w/ useState()
  const currentBoard = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // keep history up to currentMove point (inclusive of current move);
    setHistory(nextHistory);
    // move currentMove
    setCurrentMove(nextHistory.length - 1);
    
  }

  const handleLogJump = (i) => {
    setCurrentMove(i);
  }

  const handleRestart = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const log = history.map((squares, index) => {
    let description;
    if (index > 0) {
      description = `Go to move # ${index}`;
    } else {
      description = `Go to start of game`;
    }
    return (
      <li key={index}>
        <button onClick={() => handleLogJump(index)}>{description}</button>
      </li>
    )
  });
  
  return (
    <div className='game'>
      <div className='game-board'>
        <Board nextValue={nextValue} squares={currentBoard} onPlay={handlePlay}/>
        <button onClick={handleRestart}>Reset Game</button>
      </div>
      <div className='game-info'>
        <ol>
          {log}
        </ol>
      </div>
    </div>
  )
}

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
      <Game />
    </div>
  )
}

export default App;
