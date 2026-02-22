import React, { useState } from 'react';
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
    // Implementación de Formulario Controlado
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [submittedData, setSubmittedData] = useState(null);

    // Evento onChange
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Evento onSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(formData);
        setFormData({ name: '', email: '' }); // Limpiar formulario al enviar
    };

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

            {/* Formulario Controlado - Registro de Promociones */}
            <div className="container" style={{ padding: '0 32px 60px', marginTop: '10px' }}>
                <div style={{ background: '#111', padding: '30px', borderRadius: '12px', border: '1px solid #1e1e1e' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px', color: '#E50914' }}>
                        <i className="fa-solid fa-envelope" style={{ marginRight: '10px' }}></i>
                        REGÍSTRATE PARA PROMOCIONES EXCLUSIVAS
                    </h2>
                    
                    {/* Renderizado condicional basado en el envío del formulario */}
                    {!submittedData ? (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#aaa' }}>Nombre completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Ej. Juan Pérez"
                                    required
                                    style={{
                                        width: '100%', padding: '10px 15px', borderRadius: '6px',
                                        border: '1px solid #333', background: '#222', color: '#fff', outline: 'none', transition: 'border 0.2s'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#aaa' }}>Correo electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="tu@email.com"
                                    required
                                    style={{
                                        width: '100%', padding: '10px 15px', borderRadius: '6px',
                                        border: '1px solid #333', background: '#222', color: '#fff', outline: 'none', transition: 'border 0.2s'
                                    }}
                                />
                            </div>
                            <button type="submit" style={{
                                marginTop: '10px', background: '#E50914', color: '#fff', border: 'none',
                                padding: '12px 20px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', letterSpacing: '0.5px'
                            }}>
                                SUSCRIBIRME
                            </button>
                        </form>
                    ) : (
                        <div style={{ background: 'rgba(76, 175, 80, 0.1)', border: '1px solid #4CAF50', padding: '20px', borderRadius: '8px', color: '#fff' }}>
                            <h3 style={{ color: '#4CAF50', marginBottom: '10px' }}><i className="fa-solid fa-circle-check" style={{ marginRight: 6 }}></i>¡Registro exitoso!</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc' }}>Gracias por registrarte, <strong style={{color: '#fff'}}>{submittedData.name}</strong>.</p>
                            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#ccc' }}>Enviaremos nuestras mejores promociones al correo: <strong style={{color: '#fff'}}>{submittedData.email}</strong></p>
                            <button 
                                onClick={() => setSubmittedData(null)} 
                                style={{ marginTop: '15px', background: 'transparent', border: '1px solid #4CAF50', color: '#4CAF50', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}
                            >
                                Registrar otro correo
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Otros;
