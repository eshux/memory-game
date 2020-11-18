import React, { FC } from 'react';
import './Card.scss';

type Props = {
  front: string; // img src
  back: string; // img src
  clickHandler: () => void, // onClick function
  disabled: boolean,
  showFront: boolean, 
  found: boolean, 
  cardSize: number,
};

const Card: FC<Props> = ({
  front,
  back,
  clickHandler,
  disabled,
  showFront,
  found,
  cardSize
}) => {

  return (
    <div className={`card ${cardSize === 36 && 'card--m'} ${cardSize === 100 && 'card--l'}`}>
      <button
        type="button"
        className="button"
        disabled={found || showFront ? true : disabled}
        onClick={() => clickHandler()}
      >
        ?
      </button>

      <div className="card__image-wrapper">
        <img className="card__image" src={showFront || found ? front : back} alt="" />
      </div>
    </div>
  );
};

export default Card;
