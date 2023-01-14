import React, { useState, useRef, useEffect } from 'react';

export default function Board({ words, result, index, winner }) {
  const getClass = (letter, letterIndex, wordIndex, currIndex) => {
    if (wordIndex == 5 && currIndex == 5 && winner) {
      return common(result, letter, letterIndex);
    }
    if (!(wordIndex < currIndex)) {
      return '';
    }
    return common(result, letter, letterIndex);
  };

  const common = (result, letter, letterIndex) => {
    if (result[letterIndex] === letter) {
      return 'exactMatch';
    }
    if (result.indexOf(letter) !== -1) {
      return 'correctButPosition';
    }
    return letter != ' ' ? 'notFound' : '';
  };

  return words?.map((word, wordIndex) => {
    return (
      <div className="row" key={`word${wordIndex}`}>
        {word
          .padEnd(6, ' ')
          .split('')
          .map((letter, i) => {
            return (
              <div
                className={`letter ${getClass(letter, i, wordIndex, index)}`}
              >
                {' '}
                {letter}
              </div>
            );
          })}
      </div>
    );
  });
}
