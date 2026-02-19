import React from 'react';
import './Card.css';
import Button from './Button';

function PromoCard({ title, description, image, type }) {
  return (
    <div className="card promo-card fade-in" style={{
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        overflow: 'visible'
    }}>
       <div className="card-image-container" style={{
           paddingTop: '56.25%', 
           borderRadius: '16px',
           boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
           border: '1px solid var(--border-subtle)'
       }}>
           <img 
               src={image || `https://placehold.co/800x450/222/e50914?text=${encodeURIComponent(type || title)}`} 
               alt={title} 
               className="card-image"
           />
           <div className="card-tag" style={{left: '20px', right: 'auto', background: 'var(--color-primary)', border: 'none'}}>{type}</div>
       </div>
       
       <div style={{padding: '24px 8px'}}>
         <h3 className="card-title" style={{fontSize: '1.5rem', marginBottom: '8px', color: '#fff'}}>{title}</h3>
         <p className="card-subtitle" style={{marginBottom: '20px', textTransform: 'none', color: '#aaa', lineHeight: '1.6'}}>{description}</p>
         <Button variant="outline" text="Conocer más" />
       </div>
    </div>
  );
}

export default PromoCard;
