import React from 'react';
import '../components/Card.css';

function Otros() {
  const promos = [
     { id: 1, title: 'MEMBRESÍA INVITADO ESPECIAL', sub: 'Acumula el 10% en puntos + Refill Gratis', type: 'MEMBRESÍA', image: '/img/otros/membresia.jpg' },
     { id: 2, title: 'MARTES 2X1 EN TODAS LAS SALAS', sub: 'La mejor promoción de la semana', type: 'PROMO', image: '/img/otros/promo2x1.jpg' }
  ];

  return (
    <div className="section container fade-in" style={{paddingTop: '100px'}}>
        <h2 className="glow-text" style={{marginBottom: 32}}>EXPERIENCIAS</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
            {promos.map(promo => (
                <div key={promo.id} className="promo-wide" style={{backgroundImage: `linear-gradient(90deg, #000 0%, transparent 100%), url(${promo.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                     <div className="promo-content">
                         <span className="promo-badge">{promo.type}</span>
                         <h3 style={{fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#fff', marginBottom: 8}}>{promo.title}</h3>
                         <p style={{color: '#ccc', maxWidth: '500px'}}>{promo.sub}</p>
                         <button className="btn-explore">
                             EXPLORAR <span>→</span>
                         </button>
                     </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default Otros;
