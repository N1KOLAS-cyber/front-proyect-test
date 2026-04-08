import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import { getAlimentos, getUiConfig } from '../data/cinemaApi';

function Alimentos() {
    // Estado UI
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('TODOS');
    const [cart, setCart] = useState([]);
    const [purchaseSummary, setPurchaseSummary] = useState(null);
    const [categories, setCategories] = useState(['TODOS']);

    useEffect(() => {
        let cancelled = false;

        // Consumo JSON
        setLoading(true);
        Promise.all([getAlimentos(), getUiConfig()])
            .then(([data, config]) => {
                if (cancelled) return;
                setFoods(data);
                setCategories(config.categoriasAlimentos || ['TODOS']);
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

    const filtered = activeCategory === 'TODOS'
        ? foods
        : foods.filter(f => f.cat === activeCategory);

    const addToCart = (id) => setCart(prev =>
        // Carrito
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );

    const handlePurchase = () => {
        // Confirmación
        setPurchaseSummary(`¡Compra confirmada! Has preparado tu pedido de ${cart.length} producto(s).`);
        setCart([]);
        setTimeout(() => setPurchaseSummary(null), 5000);
    };

    return (
        <div className="fade-in page-shell">

            <div className="container page-container">
                <div className="section-title-row">
                    <div className="section-title-accent"></div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                        DULCERÍA &amp; ALIMENTOS
                    </h1>
                    {cart.length > 0 && (
                        <span style={{
                            background: 'var(--accent-red)', color: '#fff',
                            borderRadius: '50%', width: 22, height: 22,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.65rem', fontWeight: 800, marginLeft: 'auto'
                        }}>{cart.length}</span>
                    )}
                </div>
                <p className="section-subtitle">Ordena antes de entrar a tu sala</p>
            </div>

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

            <div className="container" style={{ padding: '0 32px 60px' }}>
                {loading ? (
                    <div className="loading-state">
                        <i className="fa-solid fa-spinner fa-spin"></i>
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
                                isInCart={cart.includes(food.id)}
                                onToggle={() => addToCart(food.id)}
                            />
                        ))}
                    </div>
                )}

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
