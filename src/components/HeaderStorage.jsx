import "./HeaderStorageStyle.css";
import ButtonStorage from "./ButtonStorage.jsx";
import DividerPartsStorage from "./DividerPartsStorage.jsx";

const HeaderStorage = ({ title, subtitle, onFilter, onAdd, onHistory, onLogout }) => {
  return (
    <div className="header-container">
      <div className="header-text">
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>

        <DividerPartsStorage/>
      <div className="header-actions">

        <div className="buttons-group">
          <ButtonStorage
            icon="../../public/assets/filterPartsStorage.png"
            label="Filtros"
            onClick={onFilter}
            backgroundColor="rgba(201, 231, 255, 1)"
            textColor="rgba(7, 64, 218, 1)"
            width="190px"
          />
          <ButtonStorage
            icon="../../public/assets/addPartsStorage.png"
            label="Adicionar"
            onClick={onAdd}
            backgroundColor="rgba(201, 231, 255, 1)"
            textColor="rgba(7, 64, 218, 1)"
            width="220px"
          />
        </div>

        <DividerPartsStorage/>

        <div className="buttons-group">
          <ButtonStorage
            icon="../../public/assets/historyPartsStorage.png"
            label="Ver Histórico"
            onClick={onHistory}
            backgroundColor="rgba(201, 231, 255, 1)"
            textColor="rgba(7, 64, 218, 1)"
            width="250px"
          />
          <ButtonStorage
            icon="../../public/assets/logoutPartsStorage.png"
            label="Sair"
            onClick={onLogout}
            backgroundColor="rgba(255, 201, 201, 1)"
            textColor="rgba(255, 13, 13, 1)"
            width="100px"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderStorage;
