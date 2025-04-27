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

  ];

  return (
    <div className="Counch-Page" >
      <SideBarCouch />
      <div className="main-container">
        <HeaderStorage
          title="Gerenciamento de Sofás"
          subtitle="Tozine Solutions"
          filterText="adicionar"
          filterIcon="../../public/assets/addPartsStorage.png"
          filterWidth="19vw"
          historyText="Ver Histórico"
          historyIcon="../../public/assets/historyPartsStorage.png"
          historyWidth="250px"
          logoutText="Sair"
          logoutIcon="../../public/assets/logoutPartsStorage.png"
          logoutWidth="120px"
          onFilter={() => alert("Filtros")}
          onHistory={() => alert("Histórico")}
          onLogout={() => alert("Sair")}
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
