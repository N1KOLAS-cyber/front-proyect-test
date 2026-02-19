import React from 'react';
import './Card.css';
import Button from './Button';

function MovieCard({ title, image, genre }) {
  return (
    <div className="card movie-card fade-in">
      <div className="card-image-container">
        <img 
          src={image || "https://placehold.co/400x600/141414/666?text=POSTER"} 
          alt={title} 
          className="card-image"
        />
        <div className="card-tag">3D / IMAX</div>
      </div>
      <div className="card-content">
        <div className="card-overlay" style={{background: 'linear-gradient(0deg, #141414 10%, transparent 60%)', height: '150%', bottom: 0}}></div>
        <div style={{position: 'relative', zIndex: 10, paddingBottom: '12px'}}>
          <h3 className="card-title">{title}</h3>
          <p className="card-subtitle">{genre || "Género"}</p>
          <div className="card-actions">
              <Button variant="primary" text="Ver Horarios" style={{width: '100%', justifyContent: 'center'}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
