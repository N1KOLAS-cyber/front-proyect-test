import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Active link helper class logic provided automatically by NavLink
  const getLinkClass = ({ isActive }) => isActive ? 'active-link' : '';

  return (
    <header className="site-header">
      <div className="container header-container">
        <NavLink to="/" className="logo" style={{textDecoration: 'none'}}>
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
