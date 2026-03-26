/**
 * Cartelera.jsx — PÁGINA DE CARTELERA (ruta "/cartelera")
 *
 * CONCEPTOS CLAVE DEMOSTRADOS EN ESTA PÁGINA:
 *
 * ┌──────────────────────────────────────────────────────────────┐
 * │ useEffect + fetch     → Consume peliculas.json               │
 * │ useState (6 estados)  → movies, loading, activeTab,          │
 * │                          activeFormat, favorites, expandedDesc│
 * │ Componente reutiliz.  → Usa <MovieCard> con children          │
 * │ Estado tipo ARRAY     → favorites[] (agregar/quitar con       │
 * │                          filter + spread, SIN mutar)          │
 * │ Estado tipo OBJETO    → expandedDesc{} (toggle por id)        │
 * │ Filtrado dinámico     → filtered = movies.filter(...)         │
 * │ Eventos onClick       → tabs, filtros, favoritos, sinopsis    │
 * └──────────────────────────────────────────────────────────────┘
 *
 * FLUJO FAVORITOS (Evento → Estado → Re-renderizado):
 * 1. Usuario hace click en el corazón → onClick={() => toggleFavorite(movie.id)}
 * 2. toggleFavorite ejecuta setFavorites con el callback prev => ...
 * 3. Si el id YA está en el array → lo quita con .filter()
 *    Si NO está → lo agrega con spread [...prev, id]
 * 4. React detecta cambio en favorites → re-renderiza
 * 5. El corazón cambia de gris a rojo, el contador se actualiza
 *
 * TIP PREGUNTA: "¿Por qué usas prev => ... en vez de setFavorites(favorites)?"
 * → Porque el estado puede haber cambiado entre que React programó el update
 *   y cuando se ejecuta. Con prev => ... siempre trabajas con el valor MÁS RECIENTE.
 *   Esto se llama "actualización funcional" y evita bugs de estado stale.
 *
 * TIP PREGUNTA: "¿Por qué MovieCard aquí usa children y en Home no?"
 * → Porque en Cartelera necesitamos contenido adicional (favoritos, sinopsis, horarios).
 *   children permite inyectar JSX personalizado dentro del mismo componente.
 *   Esto demuestra la REUTILIZACIÓN: mismo componente, diferente contenido.
 *
 * TIP PREGUNTA: "¿Cómo funciona el filtrado de formatos?"
 * → activeFormat es un estado. Cuando cambia, 'filtered' se recalcula:
 *   const filtered = activeFormat === 'TODOS' ? movies : movies.filter(m => m.tags.includes(activeFormat))
 *   React re-renderiza y solo muestra las películas del formato seleccionado.
 */
import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getPeliculas } from '../data/cinemaApi';

const TABS = ['HOY', 'MAÑANA', 'PRÓXIMOS ESTRENOS'];
const FORMATS = ['TODOS', 'IMAX', 'PLATINO', 'PREMIUM', '4DX', 'ATMOS'];

function Cartelera() {
    // ═══ ESTADOS ═══
    const [movies, setMovies] = useState([]);             // Películas obtenidas por fetch
    const [loading, setLoading] = useState(true);          // Spinner mientras carga
    const [activeTab, setActiveTab] = useState('HOY');     // Tab seleccionado (string)
    const [activeFormat, setActiveFormat] = useState('TODOS'); // Filtro de formato
    const [favorites, setFavorites] = useState([]);        // Array de IDs favoritos
    const [expandedDesc, setExpandedDesc] = useState({});  // Objeto { [id]: bool }

    // ═══ useEffect — FETCH DE DATOS ═══
    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        getPeliculas()
            .then((data) => {
                if (cancelled) return;
                setMovies(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching peliculas:', err);
                if (cancelled) return;
                setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    // ═══ MANEJO DE ESTADO ARRAY — sin mutación directa ═══
    // prev.includes(id) verifica si ya es favorito
    // .filter() crea un NUEVO array sin el id (quitar)
    // [...prev, id] crea un NUEVO array con el id añadido (agregar)
    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    // ═══ MANEJO DE ESTADO OBJETO — spread para inmutabilidad ═══
    const toggleDescription = (id) => {
        setExpandedDesc(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // ═══ FILTRADO DINÁMICO — se recalcula en cada render ═══
    const filtered = activeFormat === 'TODOS'
        ? movies
        : movies.filter(m => m.tags && m.tags.includes(activeFormat));

    return (
        <div className="fade-in" style={{ minHeight: '100vh', marginTop: '60px', background: 'transparent', color: '#fff' }}>

            {/* Encabezado con contador dinámico de favoritos */}
            <div className="container" style={{ padding: '36px 32px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 3, height: 18, background: 'var(--accent-red)', borderRadius: 2 }}></div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>CARTELERA</h1>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888', marginLeft: 13 }}>Selecciona tu película y compra boletos</p>
                {/* Renderizado condicional: solo se muestra si hay favoritos */}
                {favorites.length > 0 && (
                    <div style={{ marginLeft: 13, marginTop: 10, display: 'inline-block', background: 'rgba(229, 9, 20, 0.2)', color: '#ff4d4d', padding: '5px 12px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        <i className="fa-solid fa-heart" style={{ marginRight: 6 }}></i>
                        {favorites.length} película(s) favorita(s)
                    </div>
                )}
            </div>

            {/* Tabs — onClick cambia activeTab, el estilo reacciona al estado */}
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

            {/* Filtros de formato — onClick cambia activeFormat → filtered se recalcula */}
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

            {/* ═══ GRID DE PELÍCULAS — Usa <MovieCard> con children ═══ */}
            <div className="container" style={{ padding: '28px 32px 60px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
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
                                {/* ═══ CHILDREN: contenido personalizado dentro de MovieCard ═══ */}

                                {/* Tags del formato */}
                                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
                                    {movie.tags && movie.tags.map(t => (
                                        <span key={t} style={{
                                            background: '#1e1e1e', color: '#aaa',
                                            padding: '2px 6px', fontSize: '0.55rem', fontWeight: 700,
                                            borderRadius: '3px', border: '1px solid #2a2a2a'
                                        }}>{t}</span>
                                    ))}
                                </div>

                                {/* Título + botón favorito (onClick → toggleFavorite) */}
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

                                {/* Botón sinopsis — onClick → toggleDescription → expandedDesc cambia */}
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

                                {/* Renderizado condicional: sinopsis solo visible si expandedDesc[id] es true */}
                                {expandedDesc[movie.id] && (
                                    <p style={{ fontSize: '0.7rem', color: '#ddd', marginBottom: '12px', lineHeight: '1.4', background: '#1a1a1a', padding: '8px', borderRadius: '6px' }}>
                                        {movie.description}
                                    </p>
                                )}

                                {/* Horarios — className para ocultar en móvil via CSS */}
                                <div className="showtime-btns" style={{ display: 'flex', gap: 6 }}>
                                    {['15:00', '18:00', '21:00'].map(t => (
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
