import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Cartelera from './pages/Cartelera';
import Alimentos from './pages/Alimentos';
import Otros from './pages/Otros';
import './App.css'; // New Bento Styles

function App() {
  return (
    <Router>
      <Header />
      <main style={{maxWidth: '1440px', margin: '0 auto', minHeight: '100vh'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cartelera" element={<Cartelera />} />
          <Route path="/alimentos" element={<Alimentos />} />
          <Route path="/otros" element={<Otros />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
