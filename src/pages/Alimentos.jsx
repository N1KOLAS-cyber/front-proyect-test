/**
 * Alimentos.jsx — PÁGINA DE DULCERÍA Y ALIMENTOS (ruta "/alimentos")
 *
 * CONCEPTOS CLAVE DEMOSTRADOS EN ESTA PÁGINA:
 *
 * ┌────────────────────────────────────────────────────────────┐
 * │ useEffect + fetch     → Consume alimentos.json             │
 * │ useState (5 estados)  → foods, loading, activeCategory,    │
 * │                          cart, purchaseSummary              │
 * │ Componente reutiliz.  → Usa <FoodCard> con 7 props          │
 * │ Estado tipo ARRAY     → cart[] como carrito de compras      │
 * │ Callback hijo→padre   → onToggle pasa addToCart a FoodCard  │
 * │ Renderizado dinámico  → Contador, filtro, confirmación      │
 * │ Eventos onClick       → Filtros, agregar al carrito, pagar  │
 * └────────────────────────────────────────────────────────────┘
 *
 * FLUJO CARRITO (Evento → Estado → Re-renderizado):
 * 1. Usuario click "AGREGAR" en FoodCard → onToggle() se ejecuta
 * 2. onToggle llama a addToCart(food.id) en este componente padre
 * 3. addToCart usa setCart con prev => ... para agregar/quitar el id
 * 4. React re-renderiza → FoodCard recibe isInCart actualizado
 * 5. El botón cambia de "AGREGAR" a "LISTO", el fondo cambia, el contador se actualiza
 *
 * FLUJO COMPRA:
 * 1. Click "PAGAR AHORA" → handlePurchase()
 * 2. setPurchaseSummary(mensaje) → muestra mensaje de éxito
 * 3. setCart([]) → vacía el carrito (nuevo array vacío, no mutación)
 * 4. setTimeout → oculta el mensaje después de 5 segundos
 *
 * TIP PREGUNTA: "¿Cómo se comunica FoodCard con Alimentos?"
 * → Via la prop onToggle. FoodCard llama a onToggle cuando se hace click.
 *   onToggle es realmente addToCart(food.id) del padre. El hijo no sabe
 *   qué hace la función, solo la ejecuta. El padre maneja el estado.
 *
 * TIP PREGUNTA: "¿Por qué isInCart es una prop y no un estado de FoodCard?"
 * → Porque el carrito es estado del padre (Alimentos). FoodCard es un
 *   componente presentacional. Si cada FoodCard tuviera su propio estado,
 *   no podríamos contar el total ni hacer la compra desde el padre.
 */
import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import '../components/Card.css';

const categories = ['TODOS', 'SNACKS', 'BEBIDAS', 'COMIDA', 'DULCES'];

function Alimentos() {
    // ═══ ESTADOS ═══
    const [foods, setFoods] = useState([]);                // Datos del JSON
    const [loading, setLoading] = useState(true);           // Loading spinner
    const [activeCategory, setActiveCategory] = useState('TODOS');  // Filtro activo
    const [cart, setCart] = useState([]);                   // Array de IDs en carrito
    const [purchaseSummary, setPurchaseSummary] = useState(null);   // Mensaje post-compra

    // ═══ useEffect — FETCH ═══
    useEffect(() => {
        fetch('/alimentos.json')
            .then(res => res.json())
            .then(data => {
                setFoods(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching alimentos:", err);
                setLoading(false);
            });
    }, []);

    // Filtrado dinámico basado en categoría seleccionada
    const filtered = activeCategory === 'TODOS'
        ? foods
        : foods.filter(f => f.cat === activeCategory);

    // ═══ MANEJO DE ARRAY — Agregar/quitar del carrito sin mutación ═══
    const addToCart = (id) => setCart(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );

    // ═══ MANEJO DE COMPRA — Limpia carrito y muestra mensaje temporal ═══
    const handlePurchase = () => {
        setPurchaseSummary(`¡Compra confirmada! Has preparado tu pedido de ${cart.length} producto(s).`);
        setCart([]);  // Resetear a array vacío (no mutamos, reemplazamos)
        setTimeout(() => setPurchaseSummary(null), 5000);
    };

    return (
        <div className="fade-in" style={{ minHeight: '100vh', marginTop: '60px', background: 'transparent', color: '#fff' }}>

            {/* Encabezado con contador dinámico del carrito */}
            <div className="container" style={{ padding: '36px 32px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 3, height: 18, background: 'var(--accent-red)', borderRadius: 2 }}></div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                        DULCERÍA &amp; ALIMENTOS
                    </h1>
                    {/* Renderizado condicional: badge del carrito solo si hay items */}
                    {cart.length > 0 && (
                        <span style={{
                            background: 'var(--accent-red)', color: '#fff',
                            borderRadius: '50%', width: 22, height: 22,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.65rem', fontWeight: 800, marginLeft: 'auto'
                        }}>{cart.length}</span>
                    )}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888', marginLeft: 13 }}>Ordena antes de entrar a tu sala</p>
            </div>

            {/* Filtro de categorías — onClick cambia activeCategory → filtered se recalcula */}
            <div style={{ borderBottom: '1px solid #1a1a1a', padding: '14px 0', marginBottom: 28 }}>
                <div className="container" style={{ padding: '0 32px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                            background: activeCategory === cat ? 'var(--accent-red)' : 'transparent',
                            color: activeCategory === cat ? '#fff' : '#777',
                            border: activeCategory === cat ? 'none' : '1px solid #2a2a2a',
                            padding: '6px 16px', borderRadius: '20px', fontWeight: 700,
                            fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
                        }}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* ═══ GRID — Usa <FoodCard> pasando datos + estado + callback como props ═══ */}
            <div className="container" style={{ padding: '0 32px 60px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                        <p>Cargando menú...</p>
                    </div>
                ) : (
                    <div className="food-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                        gap: '16px'
                    }}>
                        {filtered.map(food => (
                            <FoodCard
                                key={food.id}
                                title={food.title}
                                price={food.price}
                                category={food.cat}
                                description={food.desc}
                                icon={food.icon}
                                isInCart={cart.includes(food.id)}    // Estado del padre como prop
                                onToggle={() => addToCart(food.id)}  // Callback del padre como prop
                            />
                        ))}
                    </div>
                )}

                {/* Resumen de compra — solo visible si hay items en cart */}
                {cart.length > 0 && (
                    <div style={{ marginTop: '30px', textAlign: 'center', padding: '24px', background: 'rgba(229, 9, 20, 0.05)', border: '1px solid rgba(229, 9, 20, 0.2)', borderRadius: '12px' }}>
                        <h3 style={{ color: '#fff', marginBottom: '8px', fontSize: '1.2rem', fontWeight: 800 }}>Tu Pedido ({cart.length} artículos)</h3>
                        <p style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '16px' }}>Revisa tus productos y finaliza la compra para recoger en dulcería.</p>
                        <button onClick={handlePurchase} style={{
                            background: 'var(--accent-red)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 800, cursor: 'pointer', transition: 'background 0.2s', letterSpacing: '0.5px'
                        }}>
                            <i className="fa-solid fa-credit-card" style={{ marginRight: 8 }}></i> PAGAR AHORA
                        </button>
                    </div>
                )}

                {/* Mensaje de éxito post-compra — renderizado condicional */}
                {purchaseSummary && (
                    <div style={{ marginTop: '30px', textAlign: 'center', padding: '20px', background: 'rgba(76, 175, 80, 0.1)', border: '1px solid #4CAF50', borderRadius: '12px', animation: 'fadeIn 0.5s' }}>
                        <i className="fa-solid fa-circle-check" style={{ color: '#4CAF50', fontSize: '2.5rem', marginBottom: '12px' }}></i>
                        <h3 style={{ color: '#4CAF50', fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>{purchaseSummary}</h3>
                        <p style={{ color: '#ccc', fontSize: '0.85rem' }}>Podrás recoger tu pedido en la fila rápida presentando este dispositivo.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Alimentos;
