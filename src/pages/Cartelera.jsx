import React from 'react';
import '../components/Card.css';

function Cartelera() {
  const movies = [
    { id: 1, title: 'DUNE: PARTE DOS', genre: 'Sci-Fi / Épica', tags: ['IMAX', 'DOLBY'], featured: true, image: '/img/cartelera/dune.jpg' },
    { id: 2, title: 'CIVIL WAR', genre: 'Thriller', tags: ['ESTRENO'], featured: false, image: '/img/cartelera/civilwar.jpg' },
    { id: 3, title: 'GODZILLA X KONG', genre: 'Acción', tags: ['4DX', '3D'], featured: false, image: '/img/cartelera/godzilla.jpg' },
    { id: 4, title: 'KUNG FU PANDA 4', genre: 'Animación', tags: ['KIDS'], featured: false, image: '/img/cartelera/kungfu.jpg' },
    { id: 5, title: 'PLANETA DE LOS SIMIOS', genre: 'Aventura', tags: ['MACRO XE'], featured: false, image: '/img/cartelera/apes.jpg' }
  ];

  return (
    <div className="section container fade-in" style={{paddingTop: '100px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '32px'}}>
         <h2 className="glow-text">CARTELERA <span style={{fontSize: '0.5em', verticalAlign: 'middle', opacity: 0.5}}>// NOW PLAYING</span></h2>
      </div>

      <div className="bento-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gridAutoRows: '320px'}}>
        {movies.map(movie => (
          <div 
            key={movie.id} 
            className={`movie-card ${movie.featured ? 'featured' : ''}`}
            style={{backgroundImage: `url(${movie.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
          >
              <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(0deg, #000 0%, transparent 60%)', opacity: 1}}></div>
              
              <div style={{position: 'absolute', top: 20, left: 20, display: 'flex', gap: 8}}>
                  {movie.tags.map(tag => (
                      <span key={tag} className="tech-badge">{tag}</span>
                  ))}
              </div>

              <div className="movie-info-overlay" style={{opacity: 1, transform: 'none'}}> 
                  <h3 style={{fontSize: movie.featured ? '2.5rem' : '1.5rem', lineHeight: 1, marginBottom: 8}}>{movie.title}</h3>
                  <p style={{color: 'var(--accent-red)', fontWeight: 700, letterSpacing: 1, fontSize: '0.8rem'}}>{movie.genre}</p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cartelera;
