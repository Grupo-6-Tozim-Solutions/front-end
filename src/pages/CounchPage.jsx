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
    <div className="Counch-Page">
      <SideBarCouch />
      <div className="main-container">
        <HeaderStorage
          title="Gerenciamento de Sofas"
          subtitle={"Tozine Solutions"}
          onHistory={() => alert("Histórico")}
        />
        <div className="sofa-grid" >
          {sofas.map((sofa) => (
            <SofaCard key={sofa.id} name={sofa.name} image={sofa.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounchPage;
