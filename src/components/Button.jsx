/**
 * Button.jsx — COMPONENTE REUTILIZABLE de botón.
 *
 * CONCEPTOS CLAVE DEMOSTRADOS:
 *
 * 1) Props → Recibe: text, onClick, variant, style.
 *    Esto permite usar el mismo componente con diferentes textos,
 *    acciones y estilos sin duplicar código.
 *
 * 2) Valor por defecto en props → variant = 'primary'
 *    Si el padre no pasa variant, se usa 'primary' automáticamente.
 *
 * 3) Template literals para clases dinámicas → `btn btn-${variant}`
 *    Si variant="outline", la clase será "btn btn-outline".
 *
 * TIP PREGUNTA: "¿Qué son las props?"
 * → Son los datos que un componente padre le pasa a un hijo.
 *   Funcionan como los argumentos de una función. Son de solo lectura
 *   (el hijo NO puede modificarlas).
 *
 * TIP PREGUNTA: "¿Por qué este componente no tiene useState?"
 * → Porque es un componente presentacional (stateless). Solo muestra lo que
 *   recibe por props. La lógica y el estado están en el componente padre.
 */
import React from 'react';
import './Button.css';

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
