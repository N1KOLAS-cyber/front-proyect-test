/**
 * Header.jsx — COMPONENTE REUTILIZABLE del encabezado/navegación.
 *
 * CONCEPTOS CLAVE DEMOSTRADOS:
 *
 * 1) useState → isMenuOpen controla si el menú móvil está abierto o cerrado.
 *    FLUJO: onClick del botón hamburguesa → setIsMenuOpen(!isMenuOpen) → React re-renderiza
 *    → la clase CSS 'open' se añade/quita del <nav> → el menú se muestra/oculta.
 *
 * 2) NavLink (de React Router) → Similar a <Link> pero añade automáticamente
 *    una clase CSS al enlace activo. Usamos getLinkClass para asignar 'active-link'.
 *
 * 3) Renderizado condicional con template literals:
 *    className={`main-nav ${isMenuOpen ? 'open' : ''}`}
 *    → Si isMenuOpen es true, se añade la clase 'open'; si es false, queda vacío.
 *
 * TIP PREGUNTA: "¿Cómo funciona el menú hamburguesa?"
 * → El estado isMenuOpen (booleano) se alterna con cada click.
 *   Cuando es true, se agrega la clase CSS 'open' al nav, que en Header.css
 *   tiene transform: translateY(0) para mostrarlo. Es un ejemplo de
 *   Evento (onClick) → Estado (setIsMenuOpen) → Re-renderizado (clase CSS cambia).
 *
 * TIP PREGUNTA: "¿Por qué usas NavLink en vez de Link?"
 * → NavLink permite saber cuál es la ruta activa y aplicar estilos diferentes.
 *   Link es para navegación simple sin indicador visual de ruta activa.
 */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  // Estado booleano: controla visibilidad del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // NavLink pasa automáticamente { isActive } al className cuando es función
  const getLinkClass = ({ isActive }) => isActive ? 'active-link' : '';

  return (
    <header className="site-header">
      <div className="container header-container">
        <NavLink to="/" className="logo" style={{textDecoration: 'none'}}>
          Cine<span className="logo-accent">mex</span>
        </NavLink>

        {/* Evento onClick → alterna el estado isMenuOpen */}
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="bar" style={{height: '2px', marginBottom: '4px'}}></span>
          <span className="bar" style={{height: '2px', marginBottom: '4px'}}></span>
          <span className="bar" style={{height: '2px'}}></span>
        </button>

        {/* Renderizado condicional: la clase 'open' depende del estado */}
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
                <NavLink to="/" className={getLinkClass} onClick={() => setIsMenuOpen(false)}>
                    Inicio
                </NavLink>
            </li>
            <li>
                <NavLink to="/cartelera" className={getLinkClass} onClick={() => setIsMenuOpen(false)}>
                    Cartelera
                </NavLink>
            </li>
            <li>
                <NavLink to="/alimentos" className={getLinkClass} onClick={() => setIsMenuOpen(false)}>
                    Alimentos
                </NavLink>
            </li>
            <li>
                <NavLink to="/otros" className={getLinkClass} onClick={() => setIsMenuOpen(false)}>
                    Otros
                </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
