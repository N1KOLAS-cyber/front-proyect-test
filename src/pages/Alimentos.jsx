import React from 'react';
import '../components/Card.css'; // Reuse existing styles or adjust

function Alimentos() {
  const foods = [
    { id: 1, title: 'Palomitas Mantequilla', price: '$110', cat: 'SNACKS', icon: 'fa-solid fa-cloud-meatball' }, // Generic 'popcorn' using cloud-meatball or similar if popcorn icon unavailable in free set, usually fa-corn isn't free. Let's use generic food icons. Actually fa-bowl-food is good. Or fa-box-open for bucket. Let's stick to generic food icons.
    { id: 2, title: 'Hot Dog Jumbo', price: '$85', cat: 'COMIDA', icon: 'fa-solid fa-hotdog' },
    { id: 3, title: 'Icee Blue Raspberry', price: '$95', cat: 'BEBIDAS', icon: 'fa-solid fa-glass-water' }, // Or fa-wine-glass is weird. fa-mug-hot? No. fa-glass-water is safe.
    { id: 4, title: 'Nachos Especiales', price: '$120', cat: 'COMIDA', icon: 'fa-solid fa-play' }, // Triangle shape for nachos? Or fa-triangle-exclamation? Let's use fa-cheese.
    { id: 5, title: 'Refresco Grande', price: '$89', cat: 'BEBIDAS', icon: 'fa-solid fa-bottle-water' },
    { id: 6, title: 'Chocolate Crunch', price: '$45', cat: 'DULCES', icon: 'fa-solid fa-cookie-bite' }
  ];

  return (
    <div className="section container fade-in" style={{paddingTop: '100px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 24, marginBottom: 48}}>
         <h2 className="glow-text">DULCERÍA & ALIMENTOS</h2>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px 24px'}}>
         {foods.map(food => (
             <div key={food.id} className="food-card">
                 <span className="price-tag">{food.price}</span>
                 
                 <div style={{position: 'relative', height: '140px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {/* Placeholder halo */}
                    <div style={{position: 'absolute', width: '100px', height: '100px', borderRadius: '50%', background: 'radial-gradient(circle, #333 0%, transparent 70%)'}}></div>
                    {/* FontAwesome Icon instead of Image */}
                    <i className={food.icon} style={{fontSize: '5rem', color: '#fff', zIndex: 10, filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))'}}></i>
                 </div>
                 
                 <div style={{textAlign: 'center', width: '100%', marginTop: '30px', zIndex: 5}}>
                     <h4 style={{fontSize: '1.1rem', marginBottom: 4}}>{food.title}</h4>
                     <p style={{color: '#666', fontSize: '0.8rem', letterSpacing: 1, textTransform: 'uppercase'}}>{food.cat}</p>
                     <button className="btn-add">AGREGAR +</button>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
}

export default Alimentos;
