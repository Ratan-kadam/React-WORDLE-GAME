import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { pushWord } from './utils';
import Board from './Board';
import Database from './db.js';

const WORD_LENGTH = 6;
const BOARD_ROWS_COUNT = 6;

export default function App() {
  const [words, setWords] = useState(Array(6).fill(''));
  const [index, setIndex] = useState(0);
  const [winner, setWinner] = useState(false);
  const [RESULT, setResult] = useState(
    Database[Math.floor(Math.random() * 1000) % Database?.length]
  );

  const handleTyping = (e) => {
    const code = e?.keyCode;
    const keyPressed = String.fromCharCode(e?.keyCode);
    let currWord = words[index];

    if (code === 13 && currWord?.length === WORD_LENGTH) {
      if (currWord === RESULT) {
        setWinner(true);
      }
      if (index === BOARD_ROWS_COUNT - 1) {
        setWinner(true);
      } else {
        setIndex((index) => index + 1);
      }
      return;
    }

    if (code == 8) {
      currWord = currWord.slice(0, -1);
      setWords(pushWord(currWord, words, index));
    }

    if (keyPressed >= 'A' && keyPressed <= 'Z' && currWord.length < 6) {
      currWord = currWord.concat(keyPressed);
      setWords(pushWord(currWord, words, index));
    }
  };

  useEffect(() => {
    if (winner) {
      return;
    }
    window.addEventListener('keyup', handleTyping);
    return () => {
      return window.removeEventListener('keyup', handleTyping);
    };
  }, [index, words, winner]);

  const handleRestart = () => {
    setResult(Database[Math.floor(Math.random() * 1000) % Database?.length]);
    setWinner(false);
    setWords(Array(6).fill(''));
    setIndex(0);
  };

  const renderResult = () => {
    if (winner) {
      return <div> CORRECT ANSWER IS: {RESULT} </div>;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="board">
          <div className="title"> WORDLE </div>
          <Board
            words={words}
            result={RESULT}
            index={index}
            winner={winner}
          ></Board>
          <button
            className="restart_button"
            disabled={!winner}
            onClick={handleRestart}
          >
            {' '}
            Restart{' '}
          </button>
          {renderResult()}
        </div>
      </div>
    </div>
  );
}
