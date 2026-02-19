import React, { useState } from 'react';
import '../components/Card.css';

const movies = [
    { id: 1, title: 'AVATAR: EL CAMINO DEL AGUA', classification: 'B', duration: '192 min', genre: 'Ciencia Ficción', image: '/img/cartelera/avatar.jpeg', tags: ['IMAX', '3D'], badge: 'GARANTÍA' },
    { id: 2, title: 'ZOOTOPIA 2', classification: 'AA', duration: '100 min', genre: 'Animación', image: '/img/cartelera/Zootopia_2.jpg', tags: ['PREMIUM'], badge: 'ESTRENO' },
    { id: 3, title: 'JURASSIC WORLD', classification: 'B', duration: '147 min', genre: 'Aventura', image: '/img/cartelera/jurasic_parck.jpg', tags: ['4DX'], badge: '4DX' },
    { id: 4, title: 'EL SEÑOR DE LOS ANILLOS', classification: 'B', duration: '178 min', genre: 'Fantasía', image: '/img/cartelera/el_señor_de_los_anillos.jpg', tags: ['PLATINO'], badge: 'CLÁSICO' },
    { id: 5, title: 'F1', classification: 'B', duration: '120 min', genre: 'Acción', image: '/img/cartelera/f1.jpg', tags: ['ATMOS'], badge: 'PRÓXIMAMENTE' },
];

const TABS = ['HOY', 'MAÑANA', 'PRÓXIMOS ESTRENOS'];
const FORMATS = ['TODOS', 'IMAX', 'PLATINO', 'PREMIUM', '4DX', 'ATMOS'];

function Cartelera() {
    const [activeTab, setActiveTab] = useState('HOY');
    const [activeFormat, setActiveFormat] = useState('TODOS');

    const filtered = activeFormat === 'TODOS'
        ? movies
        : movies.filter(m => m.tags.includes(activeFormat));

    return (
        <div className="fade-in" style={{ minHeight: '100vh', marginTop: '60px', background: 'transparent', color: '#fff' }}>

            {/* Page Header */}
            <div className="container" style={{ padding: '36px 32px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 3, height: 18, background: 'var(--accent-red)', borderRadius: 2 }}></div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>CARTELERA</h1>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888', marginLeft: 13 }}>Selecciona tu película y compra boletos</p>
            </div>

            {/* Day Tabs */}
            <div style={{ borderBottom: '1px solid #222' }}>
                <div className="container" style={{ padding: '0 32px', display: 'flex', gap: 0 }}>
                    {TABS.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            background: 'none', border: 'none',
                            borderBottom: activeTab === tab ? '2px solid var(--accent-red)' : '2px solid transparent',
                            color: activeTab === tab ? '#fff' : '#666',
                            padding: '12px 20px', fontWeight: 700, fontSize: '0.8rem',
                            letterSpacing: '0.5px', cursor: 'pointer', transition: 'all 0.2s'
                        }}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Format Filter Pills */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px 0', borderBottom: '1px solid #1a1a1a' }}>
                <div className="container" style={{ padding: '0 32px', display: 'flex', gap: 8, overflowX: 'auto' }}>
                    {FORMATS.map(fmt => (
                        <button key={fmt} onClick={() => setActiveFormat(fmt)} style={{
                            background: activeFormat === fmt ? 'var(--accent-red)' : 'transparent',
                            color: activeFormat === fmt ? '#fff' : '#777',
                            border: activeFormat === fmt ? 'none' : '1px solid #2a2a2a',
                            padding: '5px 14px', borderRadius: '20px', fontWeight: 700,
                            fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
                        }}>
                            {fmt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Movie Grid */}
            <div className="container" style={{ padding: '28px 32px 60px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '20px 16px'
                }}>
                    {filtered.map(movie => (
                        <div key={movie.id} style={{
                            background: '#111', borderRadius: '10px', overflow: 'hidden',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                            transition: 'transform 0.25s ease'
                        }} className="movie-card-hover">

                            {/* Poster */}
                            <div style={{ position: 'relative', height: '260px' }}>
                                <img src={movie.image} alt={movie.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)' }}></div>

                                {/* Badge */}
                                {movie.badge && (
                                    <span style={{
                                        position: 'absolute', top: 8, right: 0,
                                        background: '#E50914', color: '#fff',
                                        padding: '2px 6px', fontSize: '0.55rem', fontWeight: 800,
                                        borderRadius: '3px 0 0 3px'
                                    }}>{movie.badge}</span>
                                )}

                                {/* Classification */}
                                <span style={{
                                    position: 'absolute', bottom: 6, left: 8,
                                    background: movie.classification === 'AA' ? '#4CAF50' : '#E5A00D',
                                    color: '#000', padding: '1px 5px', fontSize: '0.6rem', fontWeight: 800, borderRadius: '3px'
                                }}>{movie.classification}</span>
                            </div>

                            {/* Info */}
                            <div style={{ padding: '10px 12px' }}>
                                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
                                    {movie.tags.map(t => (
                                        <span key={t} style={{
                                            background: '#1e1e1e', color: '#aaa',
                                            padding: '2px 6px', fontSize: '0.55rem', fontWeight: 700,
                                            borderRadius: '3px', border: '1px solid #2a2a2a'
                                        }}>{t}</span>
                                    ))}
                                </div>
                                <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', marginBottom: 2, lineHeight: 1.3 }}>{movie.title}</h3>
                                <p style={{ fontSize: '0.65rem', color: '#888', marginBottom: 10 }}>{movie.genre} • {movie.duration}</p>

                                <div style={{ display: 'flex', gap: 6 }}>
                                    {['15:00', '18:00', '21:00'].map(t => (
                                        <button key={t} style={{
                                            background: 'none', border: '1px solid #333', color: '#ccc',
                                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem',
                                            fontWeight: 600, cursor: 'pointer'
                                        }}>{t}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#555', padding: '60px 0', fontSize: '0.9rem' }}>
                            <i className="fa-solid fa-film" style={{ fontSize: '2rem', marginBottom: 12, display: 'block', opacity: 0.3 }}></i>
                            No hay películas disponibles en este formato.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cartelera;
