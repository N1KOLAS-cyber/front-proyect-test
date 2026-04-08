import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getPeliculas, getUiConfig } from '../data/cinemaApi';

function Cartelera() {
    // Estado UI
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('HOY');
    const [activeFormat, setActiveFormat] = useState('TODOS');
    const [favorites, setFavorites] = useState([]);
    const [expandedDesc, setExpandedDesc] = useState({});
    const [uiConfig, setUiConfig] = useState({
        tabsCartelera: ['HOY'],
        formatosCartelera: ['TODOS'],
        showtimesCartelera: ['15:00', '18:00', '21:00'],
    });

    useEffect(() => {
        let cancelled = false;

        // Consumo JSON
        setLoading(true);
        Promise.all([getPeliculas(), getUiConfig()])
            .then(([peliculas, config]) => {
                if (cancelled) return;
                setMovies(peliculas);
                setUiConfig(config);
                setLoading(false);
            })
            .catch(() => {
                if (cancelled) return;
                setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const toggleFavorite = (id) => {
        // Favoritos
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const toggleDescription = (id) => {
        // Sinopsis expandida
        setExpandedDesc(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const filtered = activeFormat === 'TODOS'
        ? movies
        : movies.filter(m => m.tags && m.tags.includes(activeFormat));

    return (
        <div className="fade-in page-shell">

            <div className="container page-container">
                <div className="section-title-row">
                    <div className="section-title-accent"></div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>CARTELERA</h1>
                </div>
                <p className="section-subtitle">Selecciona tu película y compra boletos</p>
                {favorites.length > 0 && (
                    <div style={{ marginLeft: 13, marginTop: 10, display: 'inline-block', background: 'rgba(229, 9, 20, 0.2)', color: '#ff4d4d', padding: '5px 12px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        <i className="fa-solid fa-heart" style={{ marginRight: 6 }}></i>
                        {favorites.length} película(s) favorita(s)
                    </div>
                )}
            </div>

            <div style={{ borderBottom: '1px solid #222' }}>
                <div className="container" style={{ padding: '0 32px', display: 'flex', gap: 0 }}>
                    {uiConfig.tabsCartelera.map(tab => (
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

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px 0', borderBottom: '1px solid #1a1a1a' }}>
                <div className="container" style={{ padding: '0 32px', display: 'flex', gap: 8, overflowX: 'auto' }}>
                    {uiConfig.formatosCartelera.map(fmt => (
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

            <div className="container" style={{ padding: '28px 32px 60px' }}>
                {loading ? (
                    <div className="loading-state">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <p>Cargando cartelera...</p>
                    </div>
                ) : (
                    <div className="movie-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        gap: '20px 16px'
                    }}>
                        {filtered.map(movie => (
                            <MovieCard
                                key={movie.id}
                                movieId={movie.id}
                                title={movie.title}
                                image={movie.image}
                                classification={movie.classification}
                                badge={movie.badge}
                            >
                                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
                                    {movie.tags && movie.tags.map(t => (
                                        <span key={t} style={{
                                            background: '#1e1e1e', color: '#aaa',
                                            padding: '2px 6px', fontSize: '0.55rem', fontWeight: 700,
                                            borderRadius: '3px', border: '1px solid #2a2a2a'
                                        }}>{t}</span>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', marginBottom: 2, lineHeight: 1.3, maxWidth: '80%' }}>
                                        {movie.title}
                                    </h3>
                                    <button
                                        onClick={() => toggleFavorite(movie.id)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: favorites.includes(movie.id) ? '#e50914' : '#555', transition: 'color 0.2s', fontSize: '1.2rem', padding: 0 }}
                                        title={favorites.includes(movie.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                                    >
                                        <i className={favorites.includes(movie.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                                    </button>
                                </div>
                                <p style={{ fontSize: '0.65rem', color: '#888', marginBottom: 10 }}>{movie.genre} • {movie.duration}</p>

                                <button
                                    onClick={() => toggleDescription(movie.id)}
                                    style={{
                                        background: 'transparent', color: '#ccc', border: '1px solid #444',
                                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem',
                                        fontWeight: 600, cursor: 'pointer', marginBottom: '10px', width: '100%',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    {expandedDesc[movie.id] ? 'Ocultar Sinopsis' : 'Ver Sinopsis'}
                                </button>

                                {expandedDesc[movie.id] && (
                                    <p style={{ fontSize: '0.7rem', color: '#ddd', marginBottom: '12px', lineHeight: '1.4', background: '#1a1a1a', padding: '8px', borderRadius: '6px' }}>
                                        {movie.description}
                                    </p>
                                )}

                                <div className="showtime-btns" style={{ display: 'flex', gap: 6 }}>
                                    {uiConfig.showtimesCartelera.map(t => (
                                        <button key={t} style={{
                                            background: 'none', border: '1px solid #333', color: '#ccc',
                                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem',
                                            fontWeight: 600, cursor: 'pointer'
                                        }}>{t}</button>
                                    ))}
                                </div>
                            </MovieCard>
                        ))}

                        {filtered.length === 0 && (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#555', padding: '60px 0', fontSize: '0.9rem' }}>
                                <i className="fa-solid fa-film" style={{ fontSize: '2rem', marginBottom: 12, display: 'block', opacity: 0.3 }}></i>
                                No hay películas disponibles en este formato.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cartelera;
