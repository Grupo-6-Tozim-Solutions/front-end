import React, { useState } from 'react';
import HeaderStorage from "../components/HeaderStorage";
import SideBarCouch from "../components/SideBarCounch";
import SofaCard from "../components/SofaCard";
import AddSofaModal from "../components/AddSofaModal"; // Importe o modal
import '../styles/counchPageStyle.css';

const CounchPage = () => {
  const [isAddSofaModalOpen, setAddSofaModalOpen] = useState(false); // Estado para controlar o modal
  const [sofas, setSofas] = useState([
    { id: 1, name: "Sofá Tipo 1", image: "../../public/assets/generic-sofa.png", pecas: [] },
    { id: 2, name: "Sofá Tipo 2", image: "../../public/assets/generic-sofa.png", pecas: []  },
    { id: 3, name: "Sofá Tipo 3", image: "../../public/assets/generic-sofa.png", pecas: []  },
    { id: 4, name: "Sofá Tipo 4", image: "../../public/assets/generic-sofa.png", pecas: []  },
    { id: 5, name: "Sofá Tipo 5", image: "../../public/assets/generic-sofa.png", pecas: []  },
    { id: 6, name: "Sofá Tipo 6", image: "../../public/assets/generic-sofa.png", pecas: []  },
  ]); // Estado inicial para o array de sofás

  const handleSaveSofa = (newSofa) => {
    const nextId = Math.max(...sofas.map((sofa) => sofa.id), 0) + 1;
    const sofaWithId = { id: nextId, ...newSofa };
    setSofas((prevSofas) => [...prevSofas, sofaWithId]);
    setAddSofaModalOpen(false);
  };

  return (
    <div className="Counch-Page">
      <SideBarCouch />
      <div className="main-container">
        <HeaderStorage
          title="Gerenciamento de Sofás"
          subtitle="Tozine Solutions"
          filterText="Adicionar Sofá"
          filterIcon="../../public/assets/addPartsStorage.png"
          filterWidth="10vw"
          filterBackgroundColor="#C9E7FF"
          filterTextColor="rgba(7, 64, 218, 1)"
          onFilter={() => setAddSofaModalOpen(true)}
          addText="Produzir"
          addWidth="15vw"
          addBackgroundColor="rgba(201, 231, 255, 1)"
          addTextColor="rgba(7, 64, 218, 1)"
          onAdd={() => alert("Produzir Sofá")}
          historyText="Histórico de Sofás"
          historyIcon="../../public/assets/historyPartsStorage.png"
          historyWidth="18vw"
          historyBackgroundColor="rgba(201, 231, 255, 1)"
          historyTextColor="rgba(7, 64, 218, 1)"
          logoutText="Sair"
          logoutIcon="../../public/assets/logoutPartsStorage.png"
          logoutWidth="10vw"
          logoutBackgroundColor="rgba(255, 201, 201, 1)"
          logoutTextColor="rgba(255, 13, 13, 1)"
          onHistory={() => alert("Histórico de Sofás")}
          onLogout={() => alert("Sair do sistema")}
        />
        <div className="sofa-grid">
          {sofas.map((sofa) => (
            <SofaCard
              key={sofa.id}
              name={sofa.name}
              image={sofa.image}
              pecas={sofa.pecas} // Passa as peças associadas ao sofá
            />
          ))}
        </div>
      </div>

      <AddSofaModal
        isOpen={isAddSofaModalOpen}
        onClose={() => setAddSofaModalOpen(false)}
        onSave={handleSaveSofa}
      />
    </div>
  );
};

export default CounchPage;