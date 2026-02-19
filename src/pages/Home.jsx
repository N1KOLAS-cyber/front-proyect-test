import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Card.css';

const featured = {
    title: 'EL SEÑOR DE LOS ANILLOS',
    subtitle: 'Una épica batalla por el destino de la Tierra Media. Una aventura que trasciende el tiempo.',
    classification: 'B15',
    genre: 'FANTASÍA',
    duration: '178 MIN',
    image: '/img/cartelera/el_señor_de_los_anillos.jpg'
};

const movies = [
    { id: 1, title: 'AVATAR: EL CAMINO DEL AGUA', classification: 'B', duration: '192 min', genre: 'Ciencia Ficción', image: '/img/cartelera/avatar.jpeg', badge: 'GARANTÍA' },
    { id: 2, title: 'ZOOTOPIA 2', classification: 'AA', duration: '100 min', genre: 'Animación', image: '/img/cartelera/Zootopia_2.jpg', badge: 'ESTRENO' },
    { id: 3, title: 'JURASSIC WORLD', classification: 'B', duration: '147 min', genre: 'Aventura', image: '/img/cartelera/jurasic_parck.jpg', badge: '4DX' },
    { id: 4, title: 'EL SEÑOR DE LOS ANILLOS', classification: 'B', duration: '178 min', genre: 'Fantasía', image: '/img/cartelera/el_señor_de_los_anillos.jpg', badge: 'CLÁSICO' },
    { id: 5, title: 'F1', classification: 'B', duration: '120 min', genre: 'Acción', image: '/img/cartelera/f1.jpg', badge: 'PRÓXIMAMENTE' },
];

const fullWidthStyle = {
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
};

function Home() {
    return (
        <div className="fade-in" style={{ minHeight: '100vh', marginTop: '60px', color: '#fff', background: 'transparent', overflowX: 'hidden' }}>

            {/* ══════════════════════════════════════
                HERO — Full bleed background image
            ══════════════════════════════════════ */}
            <div className="hero-section" style={{
                position: 'relative',
                width: '100vw',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                height: '62vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                {/* Background image */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url('/img/backgrounds/cine.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    filter: 'brightness(0.78)',
                    zIndex: 0,
                }} />

                {/* Gradient: transparent top → dark bottom */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 30%, #0B0B0B 100%)'
                }} />

                {/* Text + Buttons */}
                <div style={{ position: 'relative', zIndex: 2, padding: '0 24px', maxWidth: 560 }}>
                    <h1 className="hero-title" style={{
                        fontSize: '2.6rem',
                        fontWeight: 900,
                        lineHeight: 1.15,
                        marginBottom: 10,
                        fontFamily: 'var(--font-heading)',
                        textShadow: '0 2px 20px rgba(0,0,0,0.5)'
                    }}>
                        La Magia del <span style={{ color: 'var(--accent-red)' }}>Cine</span>
                    </h1>
                    <p style={{ fontSize: '0.9rem', color: '#ddd', marginBottom: 28, letterSpacing: '0.3px' }}>
                        Experiencias cinematográficas extraordinarias
                    </p>
                    <div className="hero-buttons" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                        <Link to="/cartelera" style={{ textDecoration: 'none' }}>
                            <button style={{
                                background: 'var(--accent-red)', color: '#fff', border: 'none',
                                padding: '11px 26px', borderRadius: '6px', fontWeight: 700,
                                fontSize: '0.8rem', letterSpacing: '1px', cursor: 'pointer',
                                boxShadow: '0 0 18px rgba(229,9,20,0.4)'
                            }}>VER CARTELERA</button>
                        </Link>
                        <Link to="/otros" style={{ textDecoration: 'none' }}>
                            <button style={{
                                background: 'rgba(255,255,255,0.1)', color: '#fff',
                                border: '1px solid rgba(255,255,255,0.3)',
                                padding: '11px 26px', borderRadius: '6px', fontWeight: 600,
                                fontSize: '0.8rem', letterSpacing: '1px', cursor: 'pointer',
                                backdropFilter: 'blur(6px)'
                            }}>PROMOCIONES</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════
                DESTACADA DE LA SEMANA
            ══════════════════════════════════ */}
            <div className="container" style={{ padding: '36px 32px 28px' }}>

                {/* Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                    <div style={{ width: 3, height: 18, background: 'var(--accent-red)', borderRadius: 2 }} />
                    <h2 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#ccc' }}>
                        Destacada de la Semana
                    </h2>
                </div>

                {/* Card: poster left + info right */}
                <div className="featured-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '280px 1fr',
                    background: '#111',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #1e1e1e',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                }}>
                    {/* Poster */}
                    <div style={{ position: 'relative', height: '300px' }}>
                        <img src={featured.image} alt={featured.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to right, transparent 55%, #111 100%)'
                        }} />
                    </div>

                    {/* Info */}
                    <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                            <i className="fa-solid fa-star" style={{ color: '#FFC107', fontSize: '0.65rem' }} />
                            <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '2px', color: '#FFC107' }}>DESTACADA</span>
                        </div>

                        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, lineHeight: 1.15, marginBottom: 10, color: '#fff' }}>
                            {featured.title}
                        </h2>

                        <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.65, marginBottom: 18, maxWidth: 380 }}>
                            {featured.subtitle}
                        </p>

                        {/* Classification pills */}
                        <div style={{ display: 'flex', gap: 6, marginBottom: 22, alignItems: 'center' }}>
                            <span style={{
                                background: '#E50914', color: '#fff',
                                padding: '3px 8px', borderRadius: '4px',
                                fontSize: '0.7rem', fontWeight: 800
                            }}>{featured.classification}</span>
                            <span style={{
                                color: '#aaa', padding: '3px 8px', borderRadius: '4px',
                                fontSize: '0.68rem', fontWeight: 600,
                                border: '1px solid #2a2a2a', letterSpacing: '1px'
                            }}>{featured.genre}</span>
                            <span style={{
                                color: '#aaa', padding: '3px 8px', borderRadius: '4px',
                                fontSize: '0.68rem', fontWeight: 600,
                                border: '1px solid #2a2a2a', letterSpacing: '1px'
                            }}>{featured.duration}</span>
                        </div>

                        {/* Buttons */}
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button style={{
                                background: 'var(--accent-red)', color: '#fff', border: 'none',
                                padding: '9px 20px', borderRadius: '6px', fontWeight: 700,
                                fontSize: '0.75rem', letterSpacing: '0.5px', cursor: 'pointer'
                            }}>
                                <i className="fa-solid fa-ticket-simple" style={{ marginRight: 6 }} />
                                COMPRAR BOLETOS
                            </button>
                            <button style={{
                                background: 'transparent', color: '#ccc',
                                border: '1px solid #2a2a2a', padding: '9px 18px',
                                borderRadius: '6px', fontWeight: 600,
                                fontSize: '0.75rem', cursor: 'pointer'
                            }}>
                                <i className="fa-solid fa-play" style={{ marginRight: 6 }} />
                                VER TRÁILER
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════
                EN CARTELERA — Full width strip
            ══════════════════════════════════ */}
            <div style={{ ...fullWidthStyle, padding: '8px 0 60px' }}>

                {/* Label row */}
                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                    padding: '0 32px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 3, height: 18, background: 'var(--accent-red)', borderRadius: 2 }} />
                        <h2 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#ccc' }}>
                            En Cartelera
                        </h2>
                    </div>
                    <Link to="/cartelera" style={{ textDecoration: 'none', fontSize: '0.72rem', color: '#E50914', fontWeight: 600 }}>
                        Ver todas <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.65rem', marginLeft: 4 }} />
                    </Link>
                </div>

                {/* Grid — 5 equal columns, full width */}
                <div className="cartelera-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '12px',
                    padding: '0 16px',
                }}>
                    {movies.map((movie) => (
                        <div key={movie.id} style={{
                            background: '#111',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #1e1e1e',
                            transition: 'transform 0.2s ease',
                            cursor: 'pointer'
                        }} className="movie-card-hover">

                            {/* Poster */}
                            <div style={{ position: 'relative', aspectRatio: '2/3', width: '100%' }}>
                                <img src={movie.image} alt={movie.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />

                                {movie.badge && (
                                    <span style={{
                                        position: 'absolute', top: 6, right: 0,
                                        background: '#E50914', color: '#fff',
                                        padding: '2px 6px', fontSize: '0.5rem', fontWeight: 800,
                                        borderRadius: '3px 0 0 3px'
                                    }}>{movie.badge}</span>
                                )}

                                <span style={{
                                    position: 'absolute', bottom: 6, left: 7,
                                    background: movie.classification === 'AA' ? '#4CAF50' : '#E5A00D',
                                    color: '#000', padding: '1px 5px',
                                    fontSize: '0.55rem', fontWeight: 800, borderRadius: '3px'
                                }}>{movie.classification}</span>
                            </div>

                            {/* Info */}
                            <div style={{ padding: '10px 12px' }}>
                                <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', marginBottom: 3, lineHeight: 1.3 }}>
                                    {movie.title}
                                </h3>
                                <p style={{ fontSize: '0.65rem', color: '#777' }}>{movie.genre} • {movie.duration}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Home;
