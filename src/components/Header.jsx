import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = ({ isActive }) => isActive ? 'active-link' : '';

  return (
    <header className="site-header">
      <div className="container header-container">
        <NavLink to="/" end className="logo" style={{textDecoration: 'none'}}>
          Cine<span className="logo-accent">mex</span>
        </NavLink>

        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="bar" style={{height: '2px', marginBottom: '4px'}}></span>
          <span className="bar" style={{height: '2px', marginBottom: '4px'}}></span>
          <span className="bar" style={{height: '2px'}}></span>
        </button>

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
                <NavLink to="/" end className={getLinkClass} onClick={() => setIsMenuOpen(false)}>
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
            <li>
                <NavLink to="/contacto" className={getLinkClass} onClick={() => setIsMenuOpen(false)}>
                    Contacto
                </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
