import React from 'react';
import '../components/Card.css';

const promos = [
    {
        id: 1,
        type: 'MEMBRESÍA',
        title: 'INVITADO ESPECIAL',
        sub: 'Acumula el 10% de tus compras en puntos. Refill gratis en palomitas y bebidas.',
        icon: 'fa-solid fa-star',
        color: '#C9A227',
        perks: ['10% en puntos por compra', 'Refill gratis', 'Acceso preferente', 'Premio de cumpleaños']
    },
    {
        id: 2,
        type: 'PROMO SEMANAL',
        title: 'MARTES 2×1',
        sub: 'Todos los martes, 2 boletos al precio de 1 en todas las salas y funciones.',
        icon: 'fa-solid fa-ticket-simple',
        color: '#E50914',
        perks: ['Aplica todas las salas', 'Válido todo el día', 'Sin límite de compras', 'Incluye IMAX y PREMIUM']
    },
    {
        id: 3,
        type: 'EXPERIENCIA',
        title: 'PLATINUM SUITE',
        sub: 'Reclinables eléctricos, servicio a la sala y pantalla 4K Laser. El lujo del cine.',
        icon: 'fa-solid fa-crown',
        color: '#7B68EE',
        perks: ['Butacas reclinables', 'Servicio a la sala', 'Pantalla 4K Laser', 'Sonido Dolby Atmos']
    }
];

function Otros() {
    return (
        <div className="fade-in" style={{ minHeight: '100vh', marginTop: '60px', background: 'transparent', color: '#fff' }}>

            {/* Header */}
            <div className="container" style={{ padding: '36px 32px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 3, height: 18, background: 'var(--accent-red)', borderRadius: 2 }}></div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>EXPERIENCIAS & PROMOS</h1>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888', marginLeft: 13 }}>Beneficios exclusivos Cinemex</p>
            </div>

            {/* Promos */}
            <div className="container" style={{ padding: '0 32px 60px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {promos.map(promo => (
                    <div key={promo.id} style={{
                        background: '#111',
                        border: '1px solid #1e1e1e',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'grid',
                        gridTemplateColumns: '200px 1fr',
                        transition: 'transform 0.25s'
                    }} className="movie-card-hover">

                        {/* Left accent panel */}
                        <div style={{
                            background: `linear-gradient(135deg, ${promo.color}22 0%, #111 100%)`,
                            borderRight: `1px solid ${promo.color}33`,
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            padding: '28px 16px', gap: 12
                        }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: '50%',
                                background: `${promo.color}22`,
                                border: `2px solid ${promo.color}55`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.4rem', color: promo.color
                            }}>
                                <i className={promo.icon}></i>
                            </div>
                            <span style={{
                                fontSize: '0.55rem', fontWeight: 800, letterSpacing: '2px',
                                color: promo.color, textAlign: 'center'
                            }}>{promo.type}</span>
                        </div>

                        {/* Right content */}
                        <div style={{ padding: '24px 28px' }}>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 8, color: '#fff' }}>
                                {promo.title}
                            </h2>
                            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: 16, lineHeight: 1.6 }}>
                                {promo.sub}
                            </p>

                            {/* Perks list */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                                {promo.perks.map(perk => (
                                    <span key={perk} style={{
                                        background: '#1a1a1a', color: '#bbb',
                                        padding: '4px 10px', borderRadius: '4px',
                                        fontSize: '0.65rem', fontWeight: 600,
                                        border: '1px solid #2a2a2a',
                                        display: 'flex', alignItems: 'center', gap: 5
                                    }}>
                                        <i className="fa-solid fa-check" style={{ color: promo.color, fontSize: '0.55rem' }}></i>
                                        {perk}
                                    </span>
                                ))}
                            </div>

                            <button style={{
                                background: promo.color, color: '#fff', border: 'none',
                                padding: '8px 20px', borderRadius: '6px',
                                fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.5px',
                                cursor: 'pointer'
                            }}>
                                EXPLORAR <i className="fa-solid fa-arrow-right" style={{ marginLeft: 6 }}></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Otros;
