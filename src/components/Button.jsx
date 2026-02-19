import React from 'react';
import './Button.css';

function Button({ text, onClick, variant = 'primary', style }) {
  // className logic: "btn" is always there, then "btn-<variant>"
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
