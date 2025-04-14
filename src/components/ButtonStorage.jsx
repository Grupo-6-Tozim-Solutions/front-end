import "./ButtonStorageStyle.css";

const ButtonStorage = ({ icon, label, onClick, backgroundColor = "#111", textColor = "white", width = "100px"}) => {
    const buttonStyle = {
      backgroundColor,
      color: textColor,
      width: width,
    };
  
  return (
    <button className="custom-button-storage" style={buttonStyle} onClick={onClick}>
      {icon && <img src={icon} alt={label} className="button-icon" />}
      {label}
    </button>
  );
};

export default ButtonStorage;
  