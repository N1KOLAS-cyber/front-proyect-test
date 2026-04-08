import React from 'react';

function PromoCard({ title, description, type, icon, color, perks }) {
  return (
    <div className="movie-card-hover otros-card" style={{
      background: '#111',
      border: '1px solid #1e1e1e',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      transition: 'transform 0.25s'
    }}>
      <div className="otros-icon-panel" style={{
        background: `linear-gradient(135deg, ${color}22 0%, #111 100%)`,
        borderRight: `1px solid ${color}33`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '28px 16px', gap: 12
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: `${color}22`,
          border: `2px solid ${color}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', color: color
        }}>
          <i className={icon}></i>
        </div>
        <span style={{
          fontSize: '0.55rem', fontWeight: 800, letterSpacing: '2px',
          color: color, textAlign: 'center'
        }}>{type}</span>
      </div>

      <div style={{ padding: '24px 28px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 8, color: '#fff' }}>
          {title}
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: 16, lineHeight: 1.6 }}>
          {description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {perks && perks.map(perk => (
            <span key={perk} style={{
              background: '#1a1a1a', color: '#bbb',
              padding: '4px 10px', borderRadius: '4px',
              fontSize: '0.65rem', fontWeight: 600,
              border: '1px solid #2a2a2a',
              display: 'flex', alignItems: 'center', gap: 5
            }}>
              <i className="fa-solid fa-check" style={{ color: color, fontSize: '0.55rem' }}></i>
              {perk}
            </span>
          ))}
        </div>

        <button style={{
          background: color, color: '#fff', border: 'none',
          padding: '8px 20px', borderRadius: '6px',
          fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.5px',
          cursor: 'pointer'
        }}>
          EXPLORAR <i className="fa-solid fa-arrow-right" style={{ marginLeft: 6 }}></i>
        </button>
      </div>
    </div>
  );
}

export default PromoCard;
