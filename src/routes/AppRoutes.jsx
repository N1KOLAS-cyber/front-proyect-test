import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Cartelera from '../pages/Cartelera';
import Alimentos from '../pages/Alimentos';
import Otros from '../pages/Otros';
import PeliculaDetalle from '../pages/PeliculaDetalle';
import Contacto from '../pages/Contacto';

/**
 * AppRoutes: centraliza las definiciones de rutas.
 * Así App.jsx queda solo como “envoltorio” (Header + contenedor principal).
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cartelera" element={<Cartelera />} />
      <Route path="/alimentos" element={<Alimentos />} />
      <Route path="/otros" element={<Otros />} />
      <Route path="/pelicula/:id" element={<PeliculaDetalle />} />
      <Route path="/contacto" element={<Contacto />} />
    </Routes>
  );
}

