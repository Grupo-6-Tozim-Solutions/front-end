import "./HeaderDashStyle.css";
import ButtonStorage from "./ButtonStorage.jsx";

const HeaderDash = ({ title, subtitle, onHistory, onLogout }) => {
  return (
    <div className="header-container">
      <div className="header-text">
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>

      <div className="header-actions">
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

export default HeaderDash;
