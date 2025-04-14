import "./TableRowPartsStorageStyle.css";
import trashIcon from "../../public/assets/trashCanPartsStorage.png";
import editIcon from "../../public/assets/pencilPartsStorage.png";

const TableRowPartsStorage = ({ id, name, quantity, status, warningLevel, index, onEdit, onDelete }) => {
    const isEven = index % 2 === 0;

    const rowClass = `table-row ${isEven ? "even" : "odd"}`;
    const statusClass = warningLevel === "critical" ? "critical" :
        warningLevel === "warning" ? "warning" : "";

    return (
        <div className={rowClass}>
            <span className={`col-id ${statusClass}`}>{id}</span>
            <span className={`col-name ${statusClass}`}>{name}</span>
            <span className={`col-quantity ${statusClass}`}>{quantity}</span>
            <span className={`col-status ${statusClass}`}>{status}</span>
            <span className="col-actions">
                <div className="actions">
                    <img
                        src={trashIcon}
                        alt="Excluir"
                        onClick={onDelete}
                        className="action-icon trashcan"
                    />
                    <img
                        src={editIcon}
                        alt="Editar"
                        onClick={onEdit}
                        className="action-icon pencil"
                    />
                </div>
            </span>
        </div>
    );
};


export default TableRowPartsStorage;




