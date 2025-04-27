
import './App.css'
import Navbar from './components/SideBar'
import PartsStorage from './pages/PartsStorage'

import FilterModal from './components/FilterModal'
import CouchPage from './pages/CounchPage'


import './App.css';
import PartsStorage from './pages/PartsStorage';
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
    <div>

     <CouchPage/>

     {/* <LoginPage/> */}
     <PartsStorage/>


      <PartsStorage />

    </div>
  );
}

export default App;