import "./HeaderStorageStyle.css";
import ButtonStorage from "./ButtonStorage.jsx";
import DividerPartsStorage from "./DividerPartsStorage.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HeaderStorage = ({ 
  title, 
  subtitle, 
  filterText, 
  filterIcon, 
  filterWidth, 
  filterBackgroundColor, 
  filterTextColor, 
  addText, 
  addIcon, 
  addWidth, 
  addBackgroundColor, 
  addTextColor, 
  historyText, 
  historyIcon, 
  historyWidth, 
  historyBackgroundColor, 
  historyTextColor, 
  logoutText, 
  logoutIcon, 
  logoutWidth, 
  logoutBackgroundColor, 
  logoutTextColor, 
  buttonMarginLeft, 
  buttonMarginRight, 
  headerMarginBottom, // New prop for bottom margin
  onFilter, 
  onAdd, 
  onHistory, 
  onLogout // Update to use onLogout for modal confirmation
}) => {
  const navigate = useNavigate(); // Add useNavigate hook

  return (
    <div className="header-container" style={{ marginBottom: headerMarginBottom }}>
      <div className="header-text">
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>
      <div className="header-actions">
        <DividerPartsStorage className="divider-left" />
        <div className="buttons-group" style={{ marginLeft: buttonMarginLeft, marginRight: buttonMarginRight }}>
          <ButtonStorage
            icon={filterIcon}
            label={filterText}
            onClick={onFilter}
            backgroundColor={filterBackgroundColor}
            textColor={filterTextColor}
            width={filterWidth}
          />
          <ButtonStorage
            icon={addIcon}
            label={addText}
            onClick={onAdd}
            backgroundColor={addBackgroundColor}
            textColor={addTextColor}
            width={addWidth}
          />
        </div>
        <DividerPartsStorage />
        <div className="buttons-group" style={{ marginLeft: buttonMarginLeft, marginRight: buttonMarginRight }}>
          <ButtonStorage
            icon={historyIcon}
            label={historyText}
            onClick={onHistory}
            backgroundColor={historyBackgroundColor}
            textColor={historyTextColor}
            width={historyWidth}
          />
          <ButtonStorage
            icon={logoutIcon}
            label={logoutText}
            onClick={onLogout} // Update to use onLogout for modal confirmation
            backgroundColor={logoutBackgroundColor}
            textColor={logoutTextColor}
            width={logoutWidth}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderStorage;
