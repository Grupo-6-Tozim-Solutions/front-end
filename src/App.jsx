import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import PartsStorage from './pages/PartsStorage';
import CounchPage from './pages/CounchPage';
import AccessibilityButton from './components/AccessibilityButton';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';
import GeminiReports from './pages/GeminiReports';

function App() {
  useEffect(() => {
    // Inicializa o Hand Talk
    if (window.HT) {
      new window.HT({
        token: "SEU_TOKEN_AQUI", // Substitua pelo token fornecido pelo Hand Talk
      });
    }

    // Adiciona o script do UserWay dinamicamente
    const script = document.createElement("script");
    script.setAttribute("data-account", "SEU_ID_DE_CONTA"); // Substitua pelo ID da sua conta UserWay
    script.setAttribute("src", "https://cdn.userway.org/widget.js");
    document.body.appendChild(script);

    return () => {
      // Remove o script ao desmontar o componente
      document.body.removeChild(script);
    };
  }, []);


  return (
    <Router>
      <Routes>
        {/* Rota inicial para CadastroPage */}
        <Route path="/" element={<CadastroPage />} />

        {/* Rota para LoginPage */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rota para PartsStorage */}
        <Route path="/parts-storage" element={<PartsStorage />} />

        {/* Rota para CounchPage */}
        <Route path="/counch" element={<CounchPage />} />

        {/* Rota para CounchPage */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Rota para a GeminiReports */ }
        <Route path="/gemini-reports" element={<GeminiReports/>} />
      </Routes>
    </Router>
  );
}

export default App;