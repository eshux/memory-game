import React, { FC } from 'react';
import './Button.scss';

type Props = {
  text: string;
  onClick: () => void;
};

const Button: FC<Props> = ({ text, onClick }) => {
  return (
    <>
      <button className='buttons' type="button" onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
