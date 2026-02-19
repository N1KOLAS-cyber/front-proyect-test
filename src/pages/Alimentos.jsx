import React, { useState } from 'react';
import '../components/Card.css';

const categories = ['TODOS', 'SNACKS', 'BEBIDAS', 'COMIDA', 'DULCES'];

const foods = [
    // ── SNACKS ────────────────────────────────────────
    { id: 1,  title: 'Palomitas Mantequilla',  price: '$110', cat: 'SNACKS',  icon: 'fa-solid fa-bowl-food',    desc: 'El clásico del cine, tamaño jumbo.' },
    { id: 2,  title: 'Palomitas Caramelo',     price: '$115', cat: 'SNACKS',  icon: 'fa-solid fa-bowl-food',    desc: 'Dulces y crujientes, irresistibles.' },
    { id: 3,  title: 'Nachos Especiales',      price: '$120', cat: 'SNACKS',  icon: 'fa-solid fa-pepper-hot',   desc: 'Con queso derretido y jalapeños.' },
    { id: 4,  title: 'Papas Fritas',           price: '$75',  cat: 'SNACKS',  icon: 'fa-solid fa-utensils',     desc: 'Crujientes con sal y kétchup.' },
    // ── BEBIDAS ───────────────────────────────────────
    { id: 5,  title: 'Icee Blue Raspberry',   price: '$95',  cat: 'BEBIDAS', icon: 'fa-solid fa-glass-water',  desc: 'Bebida frozen refrescante.' },
    { id: 6,  title: 'Refresco Grande',        price: '$89',  cat: 'BEBIDAS', icon: 'fa-solid fa-bottle-water', desc: 'Pepsi, 7Up o Mirinda. 32oz.' },
    { id: 7,  title: 'Agua Natural',           price: '$45',  cat: 'BEBIDAS', icon: 'fa-solid fa-droplet',      desc: 'Agua embotellada 600ml.' },
    { id: 8,  title: 'Café Americano',         price: '$65',  cat: 'BEBIDAS', icon: 'fa-solid fa-mug-hot',      desc: 'Café negro, caliente o frío.' },
    // ── COMIDA ────────────────────────────────────────
    { id: 9,  title: 'Hot Dog Jumbo',          price: '$85',  cat: 'COMIDA',  icon: 'fa-solid fa-hotdog',       desc: 'Con salsa especial de la casa.' },
    { id: 10, title: 'Combo Clásico',          price: '$185', cat: 'COMIDA',  icon: 'fa-solid fa-burger',       desc: 'Palomitas + Refresco grande.' },
    { id: 11, title: 'Pizza Personal',         price: '$140', cat: 'COMIDA',  icon: 'fa-solid fa-pizza-slice',  desc: 'Queso o pepperoni, recién horneada.' },
    { id: 12, title: 'Sandwich de Pollo',      price: '$110', cat: 'COMIDA',  icon: 'fa-solid fa-bread-slice',  desc: 'Pollo a la plancha con lechuga.' },
    // ── DULCES ────────────────────────────────────────
    { id: 13, title: 'Chocolate Crunch',       price: '$45',  cat: 'DULCES',  icon: 'fa-solid fa-cookie',       desc: 'Barrita de chocolate con cereal.' },
    { id: 14, title: 'Paleta de Hielo',        price: '$35',  cat: 'DULCES',  icon: 'fa-solid fa-ice-cream',    desc: 'Sabores: fresa, mango y limón.' },
    { id: 15, title: 'Gomitas Surtidas',       price: '$50',  cat: 'DULCES',  icon: 'fa-solid fa-candy-cane',   desc: 'Mix de gomitas de colores.' },
    { id: 16, title: 'Palomitas Caramelo Sal', price: '$130', cat: 'DULCES',  icon: 'fa-solid fa-bowl-food',    desc: 'Sabor dulce-salado inigualable.' },
];

function Alimentos() {
    const [activeCategory, setActiveCategory] = useState('TODOS');
    const [cart, setCart] = useState([]);

    const filtered = activeCategory === 'TODOS'
        ? foods
        : foods.filter(f => f.cat === activeCategory);

    const addToCart = (id) => setCart(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );

    return (
        <div className="fade-in" style={{ minHeight: '100vh', marginTop: '60px', background: 'transparent', color: '#fff' }}>

            {/* Header */}
            <div className="container" style={{ padding: '36px 32px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 3, height: 18, background: 'var(--accent-red)', borderRadius: 2 }}></div>
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
                <p style={{ fontSize: '0.8rem', color: '#888', marginLeft: 13 }}>Ordena antes de entrar a tu sala</p>
            </div>

            {/* Category Filter */}
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

            {/* Food Grid */}
            <div className="container" style={{ padding: '0 32px 60px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                    gap: '16px'
                }}>
                    {filtered.map(food => (
                        <div key={food.id} style={{
                            background: '#111',
                            border: '1px solid #1e1e1e',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            transition: 'transform 0.2s ease',
                            cursor: 'pointer',
                        }} className="movie-card-hover">

                            {/* Icon */}
                            <div style={{
                                height: '86px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'linear-gradient(135deg, #1a1a1a, #222)',
                            }}>
                                {food.icon
                                    ? <i className={food.icon} style={{ fontSize: '2rem', color: 'var(--accent-red)' }}></i>
                                    : <span style={{ fontSize: '2rem', opacity: 0.1 }}>—</span>
                                }
                            </div>

                            {/* Content */}
                            <div style={{ padding: '12px' }}>
                                <span style={{
                                    fontSize: '0.55rem', fontWeight: 800, letterSpacing: '1px',
                                    color: '#555', textTransform: 'uppercase'
                                }}>{food.cat}</span>
                                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginTop: 2, marginBottom: 4 }}>
                                    {food.title}
                                </h4>
                                <p style={{ fontSize: '0.62rem', color: '#666', marginBottom: 12, lineHeight: 1.4 }}>
                                    {food.desc}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>{food.price}</span>
                                    <button onClick={() => addToCart(food.id)} style={{
                                        background: cart.includes(food.id) ? '#1e1e1e' : 'var(--accent-red)',
                                        color: cart.includes(food.id) ? '#888' : '#fff',
                                        border: 'none', borderRadius: '4px', padding: '5px 10px',
                                        fontSize: '0.6rem', fontWeight: 700, cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}>
                                        {cart.includes(food.id) ? '✓ LISTO' : '+ AGREGAR'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Alimentos;
