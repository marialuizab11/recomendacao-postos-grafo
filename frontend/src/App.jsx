import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Cadastro from './pages/Cadastro';
import Busca from './pages/Busca';
import Resultados from './pages/Resultados';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rota padrão redireciona para cadastro */}
            <Route path="/" element={<Navigate to="/cadastro" replace />} />
            
            {/* Página de cadastro/configuração do usuário */}
            <Route path="/cadastro" element={<Cadastro />} />
            
            {/* Página principal de busca */}
            <Route path="/busca" element={<Busca />} />
            
            {/* Página de resultados */}
            <Route path="/resultados" element={<Resultados />} />
            
            {/* Rota para páginas não encontradas */}
            <Route path="*" element={<Navigate to="/cadastro" replace />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

