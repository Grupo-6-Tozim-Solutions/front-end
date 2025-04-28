import HeaderStorage from "../components/HeaderStorage";
import SideBarCouch from "../components/SideBarCounch";
import SofaCard from "../components/SofaCard";
import '../styles/counchPageStyle.css';

const CounchPage = () => {
  const genericImage = "../../public/assets/generic-sofa.png"; // Imagem genérica
  const sofas = [
    { id: 1, name: "Sofá Tipo 1", image: genericImage },
    { id: 2, name: "Sofá Tipo 2", image: genericImage },
    { id: 3, name: "Sofá Tipo 3", image: genericImage },
    { id: 4, name: "Sofá Tipo 4", image: genericImage },
    { id: 5, name: "Sofá Tipo 5", image: genericImage },
    { id: 6, name: "Sofá Tipo 1", image: genericImage },
    { id: 7, name: "Sofá Tipo 2", image: genericImage },
    { id: 8, name: "Sofá Tipo 3", image: genericImage },
    { id: 1, name: "Sofá Tipo 1", image: genericImage },
    { id: 2, name: "Sofá Tipo 2", image: genericImage },
    { id: 3, name: "Sofá Tipo 3", image: genericImage },
    { id: 4, name: "Sofá Tipo 4", image: genericImage },
    { id: 5, name: "Sofá Tipo 5", image: genericImage },
    { id: 6, name: "Sofá Tipo 1", image: genericImage },
    { id: 7, name: "Sofá Tipo 2", image: genericImage },
    { id: 8, name: "Sofá Tipo 3", image: genericImage },

  ];

  return (
    <div className="Counch-Page" >
      <SideBarCouch />
      <div className="main-container">
        <HeaderStorage
          title="Gerenciamento de Sofás"
          subtitle="Tozine Solutions"
          filterText="Adicionar"
          filterIcon="../../public/assets/addPartsStorage.png"
          filterWidth="10vw"
          filterBackgroundColor="#C9E7FF"
          filterTextColor="rgba(7, 64, 218, 1)"
          addText="() Produzir"
          addWidth="15vw"
          addBackgroundColor="rgba(201, 231, 255, 1)"
          addTextColor="rgba(7, 64, 218, 1)"
          historyText="Histórico de Sofás"
          historyIcon="../../public/assets/historyPartsStorage.png"
          historyWidth="18vw"
          historyBackgroundColor="rgba(201, 231, 255, 1)"
          historyTextColor="rgba(7, 64, 218, 1)"
          logoutText="Sair"
          logoutIcon="../../public/assets/logoutPartsStorage.png"
          logoutWidth="7vw"
          logoutBackgroundColor="rgba(255, 201, 201, 1)"
          logoutTextColor="rgba(255, 13, 13, 1)"
          buttonMarginLeft="20px" 
          // buttonMarginRight="25px" 
          onFilter={() => alert("Filtros aplicados")}
          onAdd={() => alert("Adicionar Sofá")}
          onHistory={() => alert("Histórico de Sofás")}
          onLogout={() => alert("Sair do sistema")}
        />
        <div className="sofa-grid">
          {sofas.map((sofa) => (
            <SofaCard key={sofa.id} name={sofa.name} image={sofa.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounchPage;
