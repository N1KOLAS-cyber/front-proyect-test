import React from 'react';
import { Link } from 'react-router-dom';


function MovieCard({ title, image, genre, duration, classification, badge, children, movieId }) {
  const posterBlock = (
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

      {badge && (
        <span style={{
          position: 'absolute', top: 8, right: 0,
          background: '#E50914', color: '#fff',
          padding: '2px 6px', fontSize: '0.55rem', fontWeight: 800,
          borderRadius: '3px 0 0 3px'
        }}>{badge}</span>
      )}

      {classification && (
        <span style={{
          position: 'absolute', bottom: 6, left: 8,
          background: classification === 'AA' ? '#4CAF50' : '#E5A00D',
          color: '#000', padding: '1px 5px',
          fontSize: '0.6rem', fontWeight: 800, borderRadius: '3px'
        }}>{classification}</span>
      )}
    </div>
  );

  return (
    <div className="movie-card-hover" style={{
      background: '#111',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      transition: 'transform 0.25s ease'
    }}>
      {movieId != null ? (
        <Link
          to={`/pelicula/${movieId}`}
          style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          aria-label={`Ver detalles de ${title}`}
        >
          {posterBlock}
        </Link>
      ) : (
        posterBlock
      )}

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
