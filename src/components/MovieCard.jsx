/**
 * MovieCard.jsx — COMPONENTE REUTILIZABLE para tarjetas de películas.
 *
 * CONCEPTOS CLAVE DEMOSTRADOS:
 *
 * 1) Props múltiples → title, image, genre, duration, classification, badge.
 *    Cada página le pasa datos diferentes al mismo componente.
 *
 * 2) children (prop especial de React) → Permite que el padre inyecte
 *    contenido personalizado DENTRO del componente.
 *    - En Home.jsx: No se pasan children → se muestra título + género por defecto.
 *    - En Cartelera.jsx: Se pasan children con favoritos, sinopsis, horarios.
 *    Esto hace al componente FLEXIBLE y REUTILIZABLE en contextos diferentes.
 *
 * 3) Renderizado condicional con && →
 *    {badge && <span>...</span>} solo muestra el badge si existe (no es null/undefined).
 *    {children || (<>fallback</>)} usa children si hay, si no muestra el fallback.
 *
 * 4) Operador ternario para estilos dinámicos →
 *    classification === 'AA' ? '#4CAF50' : '#E5A00D'
 *    Cambia el color del badge según la clasificación.
 *
 * USO EN EL PROYECTO:
 * - Home.jsx → <MovieCard title={...} image={...} genre={...} />  (modo simple)
 * - Cartelera.jsx → <MovieCard ...><children personalizados></MovieCard> (modo expandido)
 *
 * TIP PREGUNTA: "¿Qué es la prop children?"
 * → Es todo lo que se coloca ENTRE las etiquetas de apertura y cierre del componente.
 *   Es una prop especial de React que permite composición de componentes.
 *   Ejemplo: <MovieCard>ESTO es children</MovieCard>
 *
 * TIP PREGUNTA: "¿Por qué MovieCard se usa en 2 páginas distintas?"
 * → Porque es REUTILIZABLE. En Home muestra info básica, en Cartelera
 *   muestra info extendida usando children. Misma estructura, diferente contenido.
 */
import React from 'react';
import './Card.css';

function MovieCard({ title, image, genre, duration, classification, badge, children }) {
  return (
    <div className="movie-card-hover" style={{
      background: '#111',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      transition: 'transform 0.25s ease'
    }}>
      {/* Sección del poster con overlays */}
      <div style={{ position: 'relative', aspectRatio: '2/3', width: '100%' }}>
        <img
          src={image}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)'
        }} />

        {/* Renderizado condicional: badge solo aparece si existe */}
        {badge && (
          <span style={{
            position: 'absolute', top: 8, right: 0,
            background: '#E50914', color: '#fff',
            padding: '2px 6px', fontSize: '0.55rem', fontWeight: 800,
            borderRadius: '3px 0 0 3px'
          }}>{badge}</span>
        )}

        {/* Ternario: color verde para AA, amarillo para las demás */}
        {classification && (
          <span style={{
            position: 'absolute', bottom: 6, left: 8,
            background: classification === 'AA' ? '#4CAF50' : '#E5A00D',
            color: '#000', padding: '1px 5px',
            fontSize: '0.6rem', fontWeight: 800, borderRadius: '3px'
          }}>{classification}</span>
        )}
      </div>

      {/* Si hay children (contenido personalizado del padre), los muestra.
          Si no, muestra el título y género por defecto. */}
      <div style={{ padding: '10px 12px' }}>
        {children || (
          <>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', marginBottom: 3, lineHeight: 1.3 }}>
              {title}
            </h3>
            <p style={{ fontSize: '0.65rem', color: '#888' }}>
              {genre}{duration ? ` • ${duration}` : ''}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
