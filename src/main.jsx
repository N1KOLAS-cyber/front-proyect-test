/**
 * main.jsx — PUNTO DE ENTRADA de la aplicación React.
 *
 * CONCEPTO CLAVE: React monta toda la app dentro de un solo elemento HTML (#root).
 * Esto es lo que hace que sea una SPA (Single Page Application).
 *
 * React.StrictMode activa verificaciones adicionales en desarrollo
 * (detecta efectos secundarios, hooks mal usados, etc.)
 *
 * TIP PREGUNTA: "¿Por qué usas StrictMode?"
 * → Ayuda a detectar problemas potenciales en desarrollo. En producción no tiene efecto.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
