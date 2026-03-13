/**
 * Otros.jsx — PÁGINA DE EXPERIENCIAS Y PROMOS (ruta "/otros")
 *
 * CONCEPTOS CLAVE DEMOSTRADOS EN ESTA PÁGINA:
 *
 * ┌────────────────────────────────────────────────────────────────┐
 * │ useEffect + fetch       → Consume promos.json                  │
 * │ useState (4 estados)    → promos, loading, formData,           │
 * │                            submittedData                       │
 * │ Componente reutiliz.    → Usa <PromoCard> con 6 props          │
 * │ FORMULARIO CONTROLADO   → value + onChange + onSubmit           │
 * │ preventDefault()        → Evita recarga del navegador          │
 * │ Estado tipo OBJETO      → formData { name, email }             │
 * │ Visualización dinámica  → Muestra datos ingresados post-envío  │
 * └────────────────────────────────────────────────────────────────┘
 *
 * ═══════════════════════════════════════════════════════════════
 *  FORMULARIO CONTROLADO — Concepto más importante de esta página
 * ═══════════════════════════════════════════════════════════════
 *
 * Un formulario "controlado" significa que React CONTROLA el valor de los inputs.
 * El valor del input NO vive en el DOM, vive en el ESTADO de React.
 *
 * ¿Cómo funciona?
 * 1. El input tiene value={formData.name} → React dicta lo que se muestra
 * 2. Cuando el usuario teclea → se dispara onChange → handleInputChange
 * 3. handleInputChange actualiza el estado formData con el nuevo valor
 * 4. React re-renderiza → el input muestra el nuevo valor desde el estado
 *
 * ¿Por qué controlado y no dejar que el DOM maneje el input?
 * → Porque así React es la "single source of truth" (fuente única de verdad).
 *   Podemos validar, transformar o usar el valor en cualquier momento.
 *
 * FLUJO FORMULARIO:
 * 1. Usuario teclea → onChange → handleInputChange(e)
 * 2. e.target.name = "email", e.target.value = "hola@mail.com"
 * 3. setFormData(prev => ({...prev, [name]: value})) → actualiza solo ese campo
 * 4. React re-renderiza → el input muestra el nuevo valor
 * 5. Usuario click "SUSCRIBIRME" → onSubmit → handleSubmit(e)
 * 6. e.preventDefault() → evita que el navegador recargue la página
 * 7. setSubmittedData(formData) → guarda los datos enviados
 * 8. setFormData({name: '', email: ''}) → limpia el formulario
 * 9. React re-renderiza → muestra el mensaje de éxito con los datos guardados
 *
 * TIP PREGUNTA: "¿Qué es un formulario controlado?"
 * → Es cuando el valor de cada input está vinculado a un estado de React
 *   mediante value={estado} y onChange={actualizarEstado}. React controla
 *   lo que el input muestra en todo momento.
 *
 * TIP PREGUNTA: "¿Para qué sirve preventDefault()?"
 * → Por defecto, un <form> al enviarse (submit) recarga la página completa.
 *   preventDefault() cancela ese comportamiento default del navegador,
 *   permitiendo que React maneje el envío sin perder el estado de la app.
 *
 * TIP PREGUNTA: "¿Cómo se muestra la información después de enviar?"
 * → submittedData guarda una copia de formData al momento del envío.
 *   Luego formData se limpia (para el formulario), pero submittedData
 *   conserva los valores y los muestra en el mensaje de confirmación.
 *   Es renderizado condicional: {!submittedData ? <Form> : <Mensaje>}
 *
 * TIP PREGUNTA: "¿Por qué [name]: value con corchetes?"
 * → Es "computed property name" de ES6. El valor de la variable name
 *   se usa como nombre de la propiedad. Si name="email", entonces
 *   {[name]: value} es equivalente a {email: "valor"}. Esto permite
 *   que UN solo handler maneje TODOS los inputs del formulario.
 */
import React, { useState, useEffect } from 'react';
import PromoCard from '../components/PromoCard';
import '../components/Card.css';

function Otros() {
    // ═══ ESTADOS ═══
    const [promos, setPromos] = useState([]);              // Datos de promos.json
    const [loading, setLoading] = useState(true);           // Loading spinner
    // Estado OBJETO para el formulario controlado
    const [formData, setFormData] = useState({ name: '', email: '' });
    // Guarda los datos del último envío para mostrarlos en pantalla
    const [submittedData, setSubmittedData] = useState(null);

    // ═══ useEffect — FETCH DE PROMOS ═══
    useEffect(() => {
        fetch('/promos.json')
            .then(res => res.json())
            .then(data => {
                setPromos(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching promos:", err);
                setLoading(false);
            });
    }, []);

    // ═══ EVENTO onChange — Actualiza el campo correspondiente del formulario ═══
    // Usa destructuring de e.target y computed property names [name]
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ═══ EVENTO onSubmit — Maneja el envío del formulario ═══
    const handleSubmit = (e) => {
        e.preventDefault();                       // Evita recarga de página
        setSubmittedData(formData);                // Guarda datos para mostrar
        setFormData({ name: '', email: '' });      // Limpia el formulario
    };

    return (
        <div className="fade-in" style={{ minHeight: '100vh', marginTop: '60px', background: 'transparent', color: '#fff' }}>

            {/* Encabezado */}
            <div className="container" style={{ padding: '36px 32px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 3, height: 18, background: 'var(--accent-red)', borderRadius: 2 }}></div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>EXPERIENCIAS & PROMOS</h1>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888', marginLeft: 13 }}>Beneficios exclusivos Cinemex</p>
            </div>

            {/* ═══ PROMOS — Usa <PromoCard> pasando cada campo como prop ═══ */}
            <div className="container" style={{ padding: '0 32px 60px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
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

            {/* ═══════════════════════════════════════════════════════
                 FORMULARIO CONTROLADO — Registro de promociones
                 ═══════════════════════════════════════════════════════ */}
            <div className="container" style={{ padding: '0 32px 60px', marginTop: '10px' }}>
                <div style={{ background: '#111', padding: '30px', borderRadius: '12px', border: '1px solid #1e1e1e' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px', color: '#E50914' }}>
                        <i className="fa-solid fa-envelope" style={{ marginRight: '10px' }}></i>
                        REGÍSTRATE PARA PROMOCIONES EXCLUSIVAS
                    </h2>

                    {/* Renderizado condicional: Form O Mensaje de éxito */}
                    {!submittedData ? (
                        // ═══ FORMULARIO con onSubmit ═══
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#aaa' }}>Nombre completo</label>
                                {/* INPUT CONTROLADO: value vinculado a estado + onChange actualiza estado */}
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
                                {/* INPUT CONTROLADO: mismo patrón value + onChange */}
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
                            {/* type="submit" dispara el evento onSubmit del <form> */}
                            <button type="submit" style={{
                                marginTop: '10px', background: '#E50914', color: '#fff', border: 'none',
                                padding: '12px 20px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', letterSpacing: '0.5px'
                            }}>
                                SUSCRIBIRME
                            </button>
                        </form>
                    ) : (
                        // ═══ VISUALIZACIÓN DINÁMICA de los datos ingresados ═══
                        <div style={{ background: 'rgba(76, 175, 80, 0.1)', border: '1px solid #4CAF50', padding: '20px', borderRadius: '8px', color: '#fff' }}>
                            <h3 style={{ color: '#4CAF50', marginBottom: '10px' }}>
                                <i className="fa-solid fa-circle-check" style={{ marginRight: 6 }}></i>¡Registro exitoso!
                            </h3>
                            {/* Muestra dinámicamente el nombre y email que se ingresaron */}
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
