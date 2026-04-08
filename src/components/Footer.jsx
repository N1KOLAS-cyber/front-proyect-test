import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/Footer.css';

function Footer() {
  const year = new Date().getFullYear();
  const getLinkClass = ({ isActive }) => (isActive ? 'active-link' : '');

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <NavLink to="/" end className="footer-logo">
            Cine<span>mex</span>
          </NavLink>
          <p className="footer-copy">Experiencia cinematografica premium en cada funcion.</p>
        </div>

        <nav className="footer-nav" aria-label="Navegacion del pie de pagina">
          <NavLink to="/cartelera" className={getLinkClass}>Cartelera</NavLink>
          <NavLink to="/alimentos" className={getLinkClass}>Alimentos</NavLink>
          <NavLink to="/otros" className={getLinkClass}>Otros</NavLink>
          <NavLink to="/contacto" className={getLinkClass}>Contacto</NavLink>
        </nav>

        <p className="footer-legal">© {year} Cinemex UI. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
