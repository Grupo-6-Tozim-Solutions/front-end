import "./HeaderStorageStyle.css";
import ButtonStorage from "./ButtonStorage.jsx";
import DividerPartsStorage from "./DividerPartsStorage.jsx";

const HeaderStorage = ({ 
  title, 
  subtitle, 
  filterText, 
  filterIcon, 
  filterWidth, 
  produceText, 
  produceCount, 
  historyText, 
  historyIcon, 
  historyWidth, 
  logoutText, 
  logoutIcon, 
  logoutWidth, 
  onFilter, 
  onProduce, 
  onHistory, 
  onLogout 
}) => {
  return (
    <div className="header-container">
      <div className="header-text">
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>
      <div className="header-actions">
        <DividerPartsStorage />
        <div className="buttons-group">
          <ButtonStorage
            icon={filterIcon}
            label={filterText}
            onClick={onFilter}
            backgroundColor="rgba(201, 231, 255, 1)"
            textColor="rgba(7, 64, 218, 1)"
            width={filterWidth}
          />
          <button className="produce-button" onClick={onProduce}>
            <span className="quantity">({produceCount})</span> Produzir <span className="arrow">▲</span>
          </button>
        </div>
        <DividerPartsStorage />
        <div className="buttons-group">
          <ButtonStorage
            icon={historyIcon}
            label={historyText}
            onClick={onHistory}
            backgroundColor="rgba(201, 231, 255, 1)"
            textColor="rgba(7, 64, 218, 1)"
            width={historyWidth}
          />
          <ButtonStorage
            icon={logoutIcon}
            label={logoutText}
            onClick={onLogout}
            backgroundColor="rgba(255, 201, 201, 1)"
            textColor="rgba(255, 13, 13, 1)"
            width={logoutWidth}
          />
        </div>
        <DividerPartsStorage />
      </div>
    </div>
  );
};

export default HeaderStorage;
