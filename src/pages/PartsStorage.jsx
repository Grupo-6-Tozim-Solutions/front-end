import HeaderStorage from "../components/HeaderStorage";
import TableStructurePartsStorage from "../components/TableStructurePartsStorage";
import SideBar from "../components/SideBar";
import TableRowPartsStorage from "../components/TableRowPartsStorage";
import pecas from "../data/DataMock";
import "./PartsStorageStyle.css";

export function PartsStorage() {

  const handleEdit = (peca) => alert(`Editar peça ${peca.id}`);
  const handleDelete = (peca) => alert(`Excluir peça ${peca.id}`);

  return (
    <div className="SideBarContainer">
      <SideBar />
      <div className="main-container">
        <HeaderStorage
          title="Gerenciamento de Peças"
          subtitle="Tozine Solutions"
          onFilter={() => alert("Filtro")}
          onAdd={() => alert("Adicionar")}
          onHistory={() => alert("Histórico")}
          onLogout={() => alert("Logout")}
        />

        <div className="table-container">
          <TableStructurePartsStorage />

          {pecas.map((peca, index) => {

            const name = peca.nome;
            const quantity = peca.quantidade;

            let warningLevel = null;
            if (quantity < 6) warningLevel = "critical";
            else if (quantity < 15) warningLevel = "warning";

            const status =
              warningLevel === "critical"
                ? "Estoque próximo do fim!"
                : warningLevel === "warning"
                ? "Estoque baixo"
                : "Estoque OK";

            const formattedId = String(peca.id).padStart(3, "0");
            const formattedQty = String(quantity).padStart(2, "0");

            return (
              <TableRowPartsStorage
                key={peca.id}
                id={formattedId}
                name={name}
                quantity={formattedQty}
                status={status}
                warningLevel={warningLevel}
                index={index}
                onEdit={() => handleEdit(peca)}
                onDelete={() => handleDelete(peca)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PartsStorage;
