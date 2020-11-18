import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card from './components/Cards/Card';
import Button from './components/Buttons/Button';
import './App.css';
import 'flexboxgrid';

const cardData: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

const shuffle = (array: number[]) => {
  array.sort(() => Math.random() - 0.5);
};

shuffle(cardData);

const MemoryGame = () => {
  const [showFront, setShowFront] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [found, setFound] = useState<number[]>([]);
  const [cards, setCards] = useState<number[]>(cardData);
  const [difficulty, setDifficulty] = useState<number[]>([]);

  const clickHandler = (id: number) => {
    // @ts-ignore
    setShowFront((showFront[0] = id));
    setShowFront([...showFront, id]);
    if (showFront.length >= 2 && cards[showFront[0]] === cards[showFront[1]]) {
      // @ts-ignore
      setFound((found[0] = showFront));
      setFound([...found, ...showFront]);
      setShowFront([]);
    } else if (showFront.length >= 2) {
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
        setShowFront([]);
      }, 1000);
    }
  };

  const buttonClickHandler = (num: number) => {
    setFound([]);
    setDifficulty([]);
    for (let i = 0; i < (num * num) / 2; i++) {
      difficulty.push(i, i);
    }
    shuffle(difficulty);
    setCards(difficulty);
  };

  return (
    <div className="app">
      <div className="container container-fluid">
        <div className="row center-xs">
          <div className="col-xs-12">
            <h1>Memory Game</h1>
            <Button text="easy [4x4]" onClick={() => buttonClickHandler(4)} />
            <Button text="medium [6x6]" onClick={() => buttonClickHandler(6)} />
            <Button text="hard [10x10]" onClick={() => buttonClickHandler(10)} />
            <Button
              text="reset"
              onClick={() => buttonClickHandler(Math.sqrt(cards.length))}
            />
          </div>
        </div>
        <div className="row center-xs">
          <div
            className={`col-xs-12 flex layout ${
              cards.length === 16 && 'layout--s'
            } ${cards.length === 36 ? 'layout--m' : 'layout--l'}`}
          >
            {cards.map((i, index) => {
              return (
                <div key={uuidv4()}>
                  <Card
                    id={index}
                    front={`https://robohash.org/${i}`}
                    back="https://picsum.photos/id/1002/300/300"
                    clickHandler={() => clickHandler(index)}
                    disabled={disabled}
                    showFront={showFront.includes(index)}
                    found={found.includes(index)}
                    cardSize={cards.length}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
