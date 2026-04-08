import React, { useState, useEffect } from 'react';
import PromoCard from '../components/PromoCard';
import { getPromos } from '../data/cinemaApi';

function Otros() {
    const [promos, setPromos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [submittedData, setSubmittedData] = useState(null);

    useEffect(() => {
        let cancelled = false;

        setLoading(true);
        getPromos()
            .then((data) => {
                if (cancelled) return;
                setPromos(data);
                setLoading(false);
            })
            .catch(() => {
                if (cancelled) return;
                setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(formData);
        setFormData({ name: '', email: '' });
    };

    return (
        <div className="fade-in page-shell">

            <div className="container page-container" style={{ paddingBottom: 28 }}>
                <div className="section-title-row">
                    <div className="section-title-accent"></div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>EXPERIENCIAS & PROMOS</h1>
                </div>
                <p className="section-subtitle">Beneficios exclusivos Cinemex</p>
            </div>

            <div className="container" style={{ padding: '0 32px 60px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {loading ? (
                    <div className="loading-state">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <p>Cargando promociones...</p>
                    </div>
                ) : (
                    promos.map(promo => (
                        <PromoCard
                            key={promo.id}
                            title={promo.title}
                            description={promo.sub}
                            type={promo.type}
                            icon={promo.icon}
                            color={promo.color}
                            perks={promo.perks}
                        />
                    ))
                )}
            </div>

            <div className="container" style={{ padding: '0 32px 60px', marginTop: '10px' }}>
                <div style={{ background: '#111', padding: '30px', borderRadius: '12px', border: '1px solid #1e1e1e' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px', color: '#E50914' }}>
                        <i className="fa-solid fa-envelope" style={{ marginRight: '10px' }}></i>
                        REGÍSTRATE PARA PROMOCIONES EXCLUSIVAS
                    </h2>

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
                            <h3 style={{ color: '#4CAF50', marginBottom: '10px' }}>
                                <i className="fa-solid fa-circle-check" style={{ marginRight: 6 }}></i>¡Registro exitoso!
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc' }}>
                                Gracias por registrarte, <strong style={{ color: '#fff' }}>{submittedData.name}</strong>.
                            </p>
                            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#ccc' }}>
                                Enviaremos nuestras mejores promociones al correo: <strong style={{ color: '#fff' }}>{submittedData.email}</strong>
                            </p>
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
