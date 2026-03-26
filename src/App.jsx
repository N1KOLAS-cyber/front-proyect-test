/**
 * App.jsx — COMPONENTE RAÍZ que define la estructura general y las rutas.
 *
 * CONCEPTO CLAVE: React Router (BrowserRouter + Routes + Route)
 * Permite navegación entre páginas SIN recargar el navegador.
 * Cada <Route> mapea una URL a un componente/página.
 *
 * ARQUITECTURA:
 * - <Header /> se renderiza FUERA de <Routes>, por eso aparece en TODAS las páginas.
 * - Cada <Route> carga solo el componente de esa página.
 *
 * TIP PREGUNTA: "¿Por qué Header está fuera de Routes?"
 * → Porque queremos que el header sea persistente en todas las páginas.
 *   Solo el contenido dentro de <Routes> cambia al navegar.
 *
 * TIP PREGUNTA: "¿Qué es BrowserRouter?"
 * → Es el proveedor de contexto de React Router. Envuelve toda la app
 *   para que los componentes hijos puedan usar Link, NavLink, useNavigate, etc.
 */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '100vh', width: '100%' }}>
        <AppRoutes />
      </main>
    </Router>
  );
}

export default App;
