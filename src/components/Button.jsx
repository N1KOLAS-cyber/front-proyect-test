import React from 'react';
import '../styles/components/Button.css';

function Button({ text, onClick, variant = 'primary', style }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      style={style}
    >
      {text}
    </button>
  );
}

export default Button;
