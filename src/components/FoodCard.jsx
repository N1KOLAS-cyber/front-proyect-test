import React from 'react';
import './Card.css';
import Button from './Button';

function FoodCard({ title, price, image, category }) {
  return (
    <div className="card food-card fade-in">
      <div className="card-image-container">
        <img 
          src={image || `https://placehold.co/400x300/181818/e50914?text=${encodeURIComponent(title)}`} 
          alt={title} 
          className="card-image"
          style={{objectFit: 'cover'}}
        />
        <div className="card-tag">${price}</div>
      </div>
      <div className="card-content" style={{marginTop: '-40px', background: 'linear-gradient(0deg, #141414 60%, transparent 100%)', justifyContent: 'flex-end', height: '100px'}}>
        <div style={{zIndex: 2}}>
            <h3 className="card-title" style={{marginBottom: '4px'}}>{title}</h3>
            <p className="card-subtitle">{category}</p>
        </div>
      </div>
      <div style={{padding: '12px 20px', backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)'}}>
           <Button variant="outline" text="Agregar" style={{width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '10px'}} />
      </div>
    </div>
  );
}

export default FoodCard;
