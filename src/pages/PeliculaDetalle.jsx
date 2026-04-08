import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPeliculas } from '../data/cinemaApi';
import '../styles/pages/pelicula-detalle.css';

function PeliculaDetalle() {
  // Ruta dinámica
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // Buscar detalle por id
    getPeliculas()
      .then((data) => {
        if (cancelled) return;
        const found = data.find(
          (p) => String(p.id) === String(id)
        );
        setPelicula(found || null);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setPelicula(null);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="fade-in pelicula-detalle-loading">
        <i className="fa-solid fa-spinner fa-spin" />
        <p>Cargando película...</p>
      </div>
    );
  }

  if (!pelicula) {
    // Estado vacío
    return (
      <div className="fade-in pelicula-detalle-empty">
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 12 }}>Película no encontrada</h1>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: 24 }}>
          No hay una ficha para el id <strong style={{ color: '#ccc' }}>{id}</strong>. Vuelve a la cartelera para elegir un título.
        </p>
        <Link to="/cartelera" className="pelicula-detalle-link-button">
          Ir a cartelera
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in pelicula-detalle-page">
      <div className="container pelicula-detalle-container">
        {/* Breadcrumb */}
        <nav className="pelicula-breadcrumb">
          <Link to="/">Inicio</Link>
          <span className="pelicula-breadcrumb-sep">/</span>
          <Link to="/cartelera">Cartelera</Link>
          <span className="pelicula-breadcrumb-sep">/</span>
          <span className="pelicula-breadcrumb-current">Detalle</span>
        </nav>

        <div className="pelicula-detalle-grid">
          <div
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid #1e1e1e',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <img
              src={pelicula.image}
              alt={pelicula.title}
              style={{ width: '100%', display: 'block', aspectRatio: '2/3', objectFit: 'cover' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span
                style={{
                  background: pelicula.classification === 'AA' ? '#4CAF50' : '#E5A00D',
                  color: '#000',
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontSize: '0.7rem',
                  fontWeight: 800,
                }}
              >
                {pelicula.classification}
              </span>
              {pelicula.badge && (
                <span
                  style={{
                    background: '#E50914',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: '0.65rem',
                    fontWeight: 800,
                  }}
                >
                  {pelicula.badge}
                </span>
              )}
            </div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: 12 }}>
              {pelicula.title}
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: 20 }}>
              {pelicula.genre}
              {pelicula.duration ? ` • ${pelicula.duration}` : ''}
            </p>
            {pelicula.subtitle && (
              <p style={{ fontSize: '0.95rem', color: '#ccc', lineHeight: 1.6, marginBottom: 20, maxWidth: 520 }}>
                {pelicula.subtitle}
              </p>
            )}
            <p style={{ fontSize: '0.9rem', color: '#aaa', lineHeight: 1.65, marginBottom: 24, maxWidth: 640 }}>
              {pelicula.description}
            </p>
            {pelicula.tags && pelicula.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                {pelicula.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: '#1e1e1e',
                      color: '#aaa',
                      padding: '4px 10px',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      borderRadius: 20,
                      border: '1px solid #2a2a2a',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <button
                type="button"
                style={{
                  background: 'var(--accent-red)',
                  color: '#fff',
                  border: 'none',
                  padding: '11px 22px',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                <i className="fa-solid fa-ticket-simple" style={{ marginRight: 8 }} />
                Comprar boletos
              </button>
              <Link
                to="/cartelera"
                style={{
                  textDecoration: 'none',
                  background: 'transparent',
                  color: '#ccc',
                  border: '1px solid #333',
                  padding: '11px 22px',
                  borderRadius: 6,
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeliculaDetalle;
