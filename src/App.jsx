import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import PartsStorage from './pages/PartsStorage';
import CounchPage from './pages/CounchPage';
import AccessibilityButton from './components/AccessibilityButton';
import { useEffect } from 'react';
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
        <Route path="/" element={<PartsStorage />} /> {/* Default route */}
        <Route path="/counch" element={<CounchPage />} /> {/* Route for CounchPage */}
      </Routes>
    </Router>
  );
}

export default App;