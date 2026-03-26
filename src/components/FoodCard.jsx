/**
 * FoodCard.jsx — COMPONENTE REUTILIZABLE para tarjetas de alimentos.
 *
 * CONCEPTOS CLAVE DEMOSTRADOS:
 *
 * 1) Props para datos Y para funciones (callbacks) →
 *    - Datos: title, price, category, description, icon
 *    - Estado del padre: isInCart (booleano que viene del estado cart[] del padre)
 *    - Callback: onToggle (función del padre que modifica el estado cart[])
 *
 * 2) Comunicación hijo → padre via callbacks →
 *    El botón "AGREGAR" llama a onToggle (que es addToCart del padre Alimentos.jsx).
 *    El hijo NO modifica el estado directamente, solo avisa al padre.
 *    FLUJO: Click en botón → onToggle() → padre ejecuta addToCart(id) →
 *    setCart actualiza el estado → React re-renderiza → isInCart cambia → UI se actualiza.
 *
 * 3) Estilos dinámicos basados en props →
 *    background: isInCart ? '#2a1114' : '#111'
 *    El fondo cambia dependiendo de si el item está en el carrito.
 *
 * TIP PREGUNTA: "¿Cómo se comunica un componente hijo con el padre?"
 * → Mediante callbacks. El padre pasa una función como prop (onToggle).
 *   El hijo la ejecuta cuando ocurre un evento. El padre recibe la señal
 *   y actualiza su propio estado, lo que causa un re-renderizado.
 *
 * TIP PREGUNTA: "¿Por qué isInCart viene como prop y no se calcula aquí?"
 * → Porque el estado del carrito (cart[]) vive en Alimentos.jsx (el padre).
 *   Este componente solo MUESTRA datos, no los posee. Esto sigue el principio
 *   de "single source of truth" (una sola fuente de verdad).
 */
import React from 'react';

function FoodCard({ title, price, category, description, icon, isInCart, onToggle }) {
  return (
    <div className="movie-card-hover" style={{
      background: isInCart ? '#2a1114' : '#111',
      border: isInCart ? '1px solid var(--accent-red)' : '1px solid #1e1e1e',
      borderRadius: '10px',
      overflow: 'hidden',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    }}>
      <div style={{
        height: '86px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a1a, #222)',
      }}>
        {icon
          ? <i className={icon} style={{ fontSize: '2rem', color: 'var(--accent-red)' }}></i>
          : <span style={{ fontSize: '2rem', opacity: 0.1 }}>—</span>
        }
      </div>

      <div style={{ padding: '12px' }}>
        <span style={{
          fontSize: '0.55rem', fontWeight: 800, letterSpacing: '1px',
          color: '#555', textTransform: 'uppercase'
        }}>{category}</span>
        <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginTop: 2, marginBottom: 4 }}>
          {title}
        </h4>
        <p style={{ fontSize: '0.62rem', color: '#666', marginBottom: 12, lineHeight: 1.4 }}>
          {description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>{price}</span>
          {/* onClick ejecuta el callback onToggle que viene del padre */}
          <button onClick={onToggle} style={{
            background: isInCart ? '#1e1e1e' : 'var(--accent-red)',
            color: isInCart ? '#888' : '#fff',
            border: 'none', borderRadius: '4px', padding: '5px 10px',
            fontSize: '0.6rem', fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            {isInCart ? '✓ LISTO' : '+ AGREGAR'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
