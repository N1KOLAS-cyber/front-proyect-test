import React, { useState } from 'react';
import '../components/Card.css';

// Carousel Data
const slides = [
  { id: 1, title: 'DUNE: PARTE DOS', subtitle: 'La épica continúa. Solo en cines.', image: '/img/cartelera/dune-wide.jpg' },
  { id: 2, title: 'KUNG FU PANDA 4', subtitle: 'El Guerrero Dragón regresa.', image: '/img/cartelera/kungfu-wide.jpg' },
  { id: 3, title: 'GODZILLA X KONG', subtitle: 'La batalla por la tierra hueca.', image: '/img/cartelera/godzilla-wide.jpg' }
];

// Mock Movie Data
const movies = [
    { id: 1, title: 'DUNE: PARTE DOS', classification: 'B', duration: '166 min', genre: 'Ciencia Ficción', image: '/img/cartelera/dune.jpg', badge: 'GARANTÍA' },
    { id: 2, title: 'CIVIL WAR', classification: 'B15', duration: '109 min', genre: 'Acción', image: '/img/cartelera/civilwar.jpg', badge: 'ESTRENO' },
    { id: 3, title: 'GODZILLA X KONG', classification: 'A', duration: '115 min', genre: 'Acción', image: '/img/cartelera/godzilla.jpg', badge: 'PREVENTA' },
    { id: 4, title: 'KUNG FU PANDA 4', classification: 'A', duration: '94 min', genre: 'Animación', image: '/img/cartelera/kungfu.jpg', badge: 'ESTRENO' },
    { id: 5, title: 'EL PLANETA DE LOS SIMIOS', classification: 'B', duration: '145 min', genre: 'Aventura', image: '/img/cartelera/apes.jpg', badge: null },
    { id: 6, title: 'GHOSTBUSTERS', classification: 'A', duration: '115 min', genre: 'Comedia', image: '/img/cartelera/ghostbusters.jpg', badge: null }
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="fade-in" style={{minHeight: '100vh', marginTop: '60px', background: 'var(--bg-main)', color: '#fff'}}>

       {/* --- HERO CAROUSEL --- */}
       <div style={{
           position: 'relative', 
           width: '100%', 
           height: '550px', 
           background: '#000',
           overflow: 'hidden',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center'
       }}>
            {/* Background Image */}
            <div style={{
                position: 'absolute', inset: 0, 
                backgroundImage: `url(${slides[currentSlide].image})`, 
                backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6
            }}>
                {/* Gradient Overlay for Text Readability */}
                <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000 0%, transparent 80%)'}}></div>
                <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0B0B0B 0%, transparent 50%)'}}></div>
            </div>
            
            {/* "Elige tu cine" - Floating Glass Pill (Top Right) */}
            <div style={{
                position: 'absolute', 
                top: 24, 
                right: 24, 
                zIndex: 50,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '8px 16px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
            }} className="hover:bg-white/20">
                <i className="fa-solid fa-location-dot" style={{color: 'var(--accent-red)'}}></i>
                <span style={{fontSize: '0.9rem', fontWeight: 600}}>Seleccionar Cine</span>
                <i className="fa-solid fa-chevron-down" style={{fontSize: '0.8rem', opacity: 0.7}}></i>
            </div>

            {/* Content Overlay */}
            <div className="container" style={{position: 'relative', zIndex: 10, textAlign: 'left', width: '100%', height: '100%', display: 'flex', alignItems: 'center', padding: '0 48px'}}>
                <div style={{maxWidth: '600px'}}>
                    <span style={{
                        background: 'var(--accent-red)', color: '#fff', 
                        padding: '6px 12px', fontSize: '0.85rem', fontWeight: 800, 
                        letterSpacing: '1px', borderRadius: '4px', marginBottom: '16px', 
                        display: 'inline-block', boxShadow: '0 0 15px rgba(229, 9, 20, 0.4)'
                    }}>
                        ESTRENO
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
                        color: '#fff', 
                        marginBottom: '12px', 
                        lineHeight: 1.1,
                        textShadow: '0 0 30px rgba(0,0,0,0.8)'
                    }}>
                        {slides[currentSlide].title}
                    </h1>
                    <p style={{fontSize: '1.25rem', color: '#ccc', marginBottom: '32px', maxWidth: '500px'}}>
                        {slides[currentSlide].subtitle}
                    </p>
                    <div style={{display: 'flex', gap: '16px'}}>
                        <button className="btn-primary" style={{
                            padding: '14px 40px', fontSize: '1rem', 
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <i className="fa-solid fa-ticket"></i> BOLETOS
                        </button>
                        <button className="btn-outline" style={{
                            padding: '14px 32px', fontSize: '1rem', 
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <i className="fa-solid fa-play"></i> TRÁILER
                        </button>
                    </div>
                </div>
            </div>

            {/* Slider Controls */}
            <div style={{position: 'absolute', bottom: 32, right: 48, display: 'flex', gap: 16, zIndex: 20}}>
                <button onClick={prevSlide} style={{
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', 
                    color: '#fff', fontSize: '1.2rem', width: 48, height: 48, borderRadius: '50%', 
                    cursor: 'pointer', backdropFilter: 'blur(4px)'
                }}>❮</button>
                <button onClick={nextSlide} style={{
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', 
                    color: '#fff', fontSize: '1.2rem', width: 48, height: 48, borderRadius: '50%', 
                    cursor: 'pointer', backdropFilter: 'blur(4px)'
                }}>❯</button>
            </div>
       </div>

       {/* --- SECTION: CARTELERA GRID --- */}
       <div className="container" style={{padding: '60px 24px'}}>
           
           {/* Section Header */}
           <div style={{display: 'flex', alignItems: 'center', gap: 32, marginBottom: '40px', borderBottom: '1px solid #222'}}>
               <button style={{
                   background: 'none', border: 'none', 
                   borderBottom: '2px solid var(--accent-red)', 
                   padding: '12px 0', 
                   color: '#fff', 
                   fontWeight: 700, 
                   fontSize: '1.5rem',
                   letterSpacing: '-0.5px'
                }}>
                   CARTELERA
               </button>
               <button style={{
                   background: 'none', border: 'none', 
                   padding: '12px 0', 
                   color: '#555', 
                   fontWeight: 700, 
                   fontSize: '1.5rem',
                   letterSpacing: '-0.5px',
                   cursor: 'pointer',
                   transition: 'color 0.3s'
                }}>
                   PRÓXIMOS ESTRENOS
               </button>
           </div>

           {/* Movie Grid */}
           <div style={{
               display: 'grid', 
               gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
               gap: '40px 24px'
           }}>
               {movies.map((movie) => (
                   <div key={movie.id} className="movie-card-dark" style={{textAlign: 'left', position: 'relative'}}>
                       
                       {/* Poster Container */}
                       <div style={{
                           height: '330px', 
                           background: '#1a1a1a', 
                           borderRadius: '12px', 
                           marginBottom: '16px', 
                           position: 'relative',
                           overflow: 'hidden',
                           boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                           transition: 'transform 0.3s ease'
                       }}>
                           {/* Image */}
                           <img src={movie.image} alt={movie.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                           
                           {/* Hover Overlay Gradient */}
                           <div className="poster-overlay" style={{
                               position: 'absolute', inset: 0, 
                               background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)',
                               opacity: 0.8
                           }}></div>

                           {/* Badge Overlay (Top Right) */}
                           {movie.badge && (
                               <span style={{
                                   position: 'absolute', top: 12, right: 0, 
                                   background: movie.badge === 'PREVENTA' ? '#4CAF50' : '#E50914', 
                                   color: '#fff', padding: '4px 8px', 
                                   fontSize: '0.7rem', fontWeight: 800,
                                   borderRadius: '4px 0 0 4px',
                                   boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
                               }}>
                                   {movie.badge}
                               </span>
                           )}

                           {/* Classification Badge (Bottom Left) */}
                           <span style={{
                               position: 'absolute', bottom: 12, left: 12, 
                               background: movie.classification === 'A' ? '#4CAF50' : '#FFC107', 
                               color: '#000', 
                               padding: '2px 8px', 
                               fontSize: '0.85rem', fontWeight: 800, borderRadius: '4px'
                           }}>
                               {movie.classification}
                           </span>
                       </div>

                       {/* Movie Info */}
                       <h3 style={{
                           fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px', 
                           color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                           fontFamily: 'var(--font-heading)'
                        }}>
                           {movie.title}
                       </h3>
                       <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                           <p style={{fontSize: '0.85rem', color: '#888'}}>
                               {movie.duration} • {movie.genre}
                           </p>
                       </div>
                       
                       {/* Action Button */}
                       <button style={{
                           width: '100%',
                           background: 'rgba(255,255,255,0.05)', 
                           color: 'var(--accent-red)', 
                           border: '1px solid rgba(255,255,255,0.1)', 
                           borderRadius: '6px', padding: '10px', 
                           fontSize: '0.9rem', fontWeight: 700,
                           cursor: 'pointer', 
                           transition: 'all 0.2s ease',
                           display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                        }} 
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = 'var(--accent-red)';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.color = 'var(--accent-red)';
                        }}
                        >
                           <i className="fa-solid fa-ticket"></i> BOLETOS
                       </button>
                   </div>
               ))}
           </div>
       </div>

    </div>
  );
}

export default Home;
