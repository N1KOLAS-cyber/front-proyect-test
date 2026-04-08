import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import MovieCarousel from '../components/MovieCarousel';
import { getNoticias, getOpiniones, getPeliculas } from '../data/cinemaApi';
import '../styles/pages/home.css';

function Home() {
    // Estado principal
    const [peliculas, setPeliculas] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [opiniones, setOpiniones] = useState([]);
    const [loadingPeliculas, setLoadingPeliculas] = useState(true);
    const [loadingNoticias, setLoadingNoticias] = useState(true);
    const [expandedNews, setExpandedNews] = useState({});

    useEffect(() => {
        let cancelled = false;

        // Carga inicial
        getPeliculas()
            .then((data) => {
                if (cancelled) return;
                setPeliculas(data);
                setLoadingPeliculas(false);
            })
            .catch(() => {
                if (cancelled) return;
                setLoadingPeliculas(false);
            });

        getNoticias()
            .then((data) => {
                if (cancelled) return;
                setNoticias(data);
                setLoadingNoticias(false);
            })
            .catch(() => {
                if (cancelled) return;
                setLoadingNoticias(false);
            });

        getOpiniones()
            .then((data) => {
                if (cancelled) return;
                setOpiniones(data);
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };
    }, []);

    const toggleNews = (id) => {
        // Expandir noticia
        setExpandedNews(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const featured = peliculas.find(p => p.featured);

    return (
        <div className="fade-in home-page">

            <div className="home-hero home-full-width">
                <div className="home-hero-bg" />
                <div className="home-hero-overlay" />
                <div className="home-hero-content">
                    <h1 className="home-hero-title">
                        La Magia del <span style={{ color: 'var(--accent-red)' }}>Cine</span>
                    </h1>
                    <p className="home-hero-subtitle">
                        Experiencias cinematográficas extraordinarias
                    </p>
                    <div className="home-hero-buttons">
                        <Link to="/cartelera" className="home-link-reset">
                            <button className="home-btn-primary">VER CARTELERA</button>
                        </Link>
                        <Link to="/otros" className="home-link-reset">
                            <button className="home-btn-ghost">PROMOCIONES</button>
                        </Link>
                    </div>
                </div>
            </div>

            {!loadingPeliculas && peliculas.length > 0 && (
                <>
                {/* Estrenos */}
                <section className="home-estrenos">
                    <h2 className="home-section-kicker">ESTRENOS</h2>
                    <MovieCarousel movies={peliculas} />
                </section>
                </>
            )}

            {featured && (
                <>
                {/* Destacada */}
                <div className="container" style={{ padding: '36px 32px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                        <div style={{ width: 3, height: 18, background: 'var(--accent-red)', borderRadius: 2 }} />
                        <h2 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#ccc' }}>
                            Destacada de la Semana
                        </h2>
                    </div>

                    <div className="featured-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: '280px 1fr',
                        background: '#111',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid #1e1e1e',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                    }}>
                        <div style={{ position: 'relative', height: '300px' }}>
                            <img src={featured.image} alt={featured.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(to right, transparent 55%, #111 100%)'
                            }} />
                        </div>

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
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                <Link to={`/pelicula/${featured.id}`} style={{ textDecoration: 'none' }}>
                                    <button type="button" style={{
                                        background: 'var(--accent-red)', color: '#fff', border: 'none',
                                        padding: '9px 20px', borderRadius: '6px', fontWeight: 700,
                                        fontSize: '0.75rem', letterSpacing: '0.5px', cursor: 'pointer'
                                    }}>
                                        <i className="fa-solid fa-circle-info" style={{ marginRight: 6 }} />
                                        VER FICHA
                                    </button>
                                </Link>
                                <button type="button" style={{
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
                </>
            )}

            <div className="home-full-width" style={{ padding: '8px 0 60px' }}>
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

                {loadingPeliculas ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                        <p>Cargando cartelera...</p>
                    </div>
                ) : (
                    <div className="cartelera-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '12px',
                        padding: '0 16px',
                    }}>
                        {peliculas.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movieId={movie.id}
                                title={movie.title}
                                image={movie.image}
                                genre={movie.genre}
                                duration={movie.duration}
                                classification={movie.classification}
                                badge={movie.badge}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="container" style={{ padding: '0 32px 60px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <div style={{ width: 3, height: 18, background: 'var(--accent-red)', borderRadius: 2 }} />
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#fff' }}>
                        NOTICIAS DEL CINE
                    </h2>
                    <span style={{ background: 'rgba(229, 9, 20, 0.1)', color: '#E50914', fontSize: '0.65rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 800 }}>LIVE</span>
                </div>

                {loadingNoticias ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                        <p>Cargando últimas noticias...</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                        {noticias.map(noticia => (
                            <div key={noticia.id} style={{
                                background: '#111', borderRadius: '8px', overflow: 'hidden', border: '1px solid #1e1e1e', transition: 'transform 0.2s ease', display: 'flex', flexDirection: 'column'
                            }} className="movie-card-hover">
                                <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                                    <img src={noticia.image} alt="Noticia" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <span style={{ position: 'absolute', top: 10, left: 10, background: 'var(--accent-red)', color: '#fff', fontSize: '0.6rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                                        {noticia.category}
                                    </span>
                                </div>
                                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <span style={{ color: '#888', fontSize: '0.65rem', marginBottom: '8px', fontWeight: 600 }}>
                                        <i className="fa-regular fa-clock" style={{ marginRight: '5px' }}></i>{noticia.date}
                                    </span>
                                    <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3, textTransform: 'capitalize' }}>
                                        {noticia.title}
                                    </h3>
                                    <p style={{ color: '#aaa', fontSize: '0.75rem', lineHeight: 1.5, marginBottom: '16px', flexGrow: 1 }}>
                                        {expandedNews[noticia.id] ? noticia.body : noticia.body.substring(0, 80) + '...'}
                                    </p>
                                    <button
                                        onClick={() => toggleNews(noticia.id)}
                                        style={{
                                            background: expandedNews[noticia.id] ? 'var(--accent-red)' : 'transparent',
                                            color: '#fff',
                                            border: expandedNews[noticia.id] ? 'none' : '1px solid #333',
                                            padding: '8px 0',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            width: '100%'
                                        }}>
                                        {expandedNews[noticia.id] ? 'MOSTRAR MENOS' : 'LEER MÁS'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {opiniones.length > 0 && (
                <div className="container" style={{ padding: '0 32px 60px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 3, height: 18, background: 'var(--accent-red)', borderRadius: 2 }} />
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#fff' }}>
                            OPINIONES DE USUARIOS
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                        {opiniones.map(op => (
                            <div key={op.id} style={{
                                background: '#111', borderRadius: '10px', padding: '20px',
                                border: '1px solid #1e1e1e', transition: 'transform 0.2s'
                            }} className="movie-card-hover">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                    <img src={op.avatar} alt={op.user}
                                        style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #2a2a2a' }} />
                                    <div>
                                        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{op.user}</h4>
                                        <p style={{ fontSize: '0.65rem', color: '#888' }}>{op.movie}</p>
                                    </div>
                                </div>
                                <div style={{ marginBottom: 10 }}>
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i}
                                            className={`fa-${i < op.rating ? 'solid' : 'regular'} fa-star`}
                                            style={{ color: i < op.rating ? '#FFC107' : '#333', fontSize: '0.75rem', marginRight: 2 }}
                                        ></i>
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#aaa', lineHeight: 1.6 }}>{op.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}

export default Home;
