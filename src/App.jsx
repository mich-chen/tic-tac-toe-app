import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const Square = ({ value, onSquareClick, isWinner }) => {
  return (
    <button
      className={'square' + ' ' + (isWinner ? 'square-winning' : null)}
      onClick={onSquareClick}
    >
        {value}
    </button>
  );
}

const Board = ({ nextValue, squares, onPlay, winner }) => {
  const handleSquareClick = (i) => {
    // check so cannot override square value
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice(); // copy current squares state
    nextSquares[i] = nextValue;
    onPlay(nextSquares);
  }

  // using 2 for-loops to render board - Tutorial's extra improvement question
  const cols = [];
  const rows = [];
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 3; j++) {
      rows.push(
        <Square
          key={'square' + j + i}
          value={squares[i+j]}
          onSquareClick={() => handleSquareClick(i+j)}
          isWinner={winner && winner.indexes.has(i+j) ? true : false}
        />
      );
    }
    cols.push(
      <div className='board-row'>
        {rows.slice(-3)}
      </div>
    );
  };

  return (
    <div>
      {cols[0]}
      {cols[1]}
      {cols[2]}
    </div>
  )
}

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]); // nested array of board's values
  const [currentMove, setCurrentMove] = useState(0); // index of current move in history
  const [isAscending, setIsAscending] = useState(true); // sorted by move #

  // 'X' is even move, 'O' is odd moves
  const nextValue = currentMove % 2 === 0 ? 'X' : 'O';
  const currentBoard = history[currentMove];

  const handlePlay = (nextSquares) => {
    // keep history up to currentMove point (inclusive of current move);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const handleLogJump = (i) => {
    setCurrentMove(i);
  }

  const handleRestart = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const handleSort = () => {
    setIsAscending(!isAscending); // not updating history because game needs to remember moves
  }
  
  // winner is calculated each render so we don't need to store it as state, causing max re-renders error
  const winner = calculateWinner(currentBoard);
  let status = winner ? `Winner: ${winner.value}`
    : (!currentBoard.includes(null)) ? 'Draw!'
    : `Next player: ${nextValue}`;

  const log = history.map((squares, index) => {
    let description = index === currentMove && index === 0 ? `You are at start of game`
      : index === currentMove ? `You are at move#${index}` 
      : index ? `Go to move #${index}`
      : `Go to start of game`
    if (index === currentMove || (currentMove === index && index === 0)) {
      return (
        <li key={index}>
          <div>{description}</div>
        </li>
      );
    } else {
      return (
        <li key={index}>
          <button onClick={() => handleLogJump(index)}>{description}</button>
        </li>
      );
    }
  });
  
  return (
    <div className='game'>
      <div className='game-board'>
        <div className='status'>{status}</div>
        <Board nextValue={nextValue} squares={currentBoard} onPlay={handlePlay} winner={winner}/>
        <button onClick={handleRestart}>Reset Game</button>
      </div>
      <div className='game-info'>
        <h4>Game Log</h4>
        <button onClick={handleSort}>Sorted in: {isAscending ? 'Ascending Order' : 'Descending Order'}</button>
        <ol>
          {isAscending ? log : log.reverse()}
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
      return {
        value: squares[a],
        indexes: new Set([a,b,c]),
      };
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
