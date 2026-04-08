import React, { useState } from 'react';

function Contacto() {
  // Formulario
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    // Input controlado
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    // Envío
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fade-in page-shell">
      <div className="container page-container" style={{ paddingBottom: 60, maxWidth: 560 }}>
        <div className="section-title-row" style={{ marginBottom: 8 }}>
          <div className="section-title-accent" />
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Contacto</h1>
        </div>
        <p className="section-subtitle" style={{ fontSize: '0.85rem', marginBottom: 28 }}>
          Dudas sobre funciones, reservas o experiencias premium. Te respondemos lo antes posible.
        </p>

        {sent ? (
          <div
            style={{
              background: 'rgba(76, 175, 80, 0.12)',
              border: '1px solid rgba(76, 175, 80, 0.35)',
              borderRadius: 10,
              padding: '20px 18px',
              color: '#a5d6a7',
              fontSize: '0.9rem',
            }}
          >
            <i className="fa-solid fa-circle-check" style={{ marginRight: 8 }} />
            Mensaje registrado (demo). En un entorno real se enviaría al servidor.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#888', marginBottom: 6, letterSpacing: '0.5px' }}>
                NOMBRE
              </label>
              <input
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoComplete="name"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: '#111',
                  border: '1px solid #2a2a2a',
                  borderRadius: 8,
                  padding: '12px 14px',
                  color: '#fff',
                  fontSize: '0.9rem',
                }}
              />
            </div>
            <div>
              <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#888', marginBottom: 6, letterSpacing: '0.5px' }}>
                CORREO
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: '#111',
                  border: '1px solid #2a2a2a',
                  borderRadius: 8,
                  padding: '12px 14px',
                  color: '#fff',
                  fontSize: '0.9rem',
                }}
              />
            </div>
            <div>
              <label htmlFor="contact-msg" style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#888', marginBottom: 6, letterSpacing: '0.5px' }}>
                MENSAJE
              </label>
              <textarea
                id="contact-msg"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: '#111',
                  border: '1px solid #2a2a2a',
                  borderRadius: 8,
                  padding: '12px 14px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                alignSelf: 'flex-start',
                background: 'var(--accent-red)',
                color: '#fff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: 6,
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                marginTop: 4,
              }}
            >
              Enviar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contacto;
