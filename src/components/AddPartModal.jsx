const AddPartModal = ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [lowStockThreshold, setLowStockThreshold] = useState(''); // Novo estado para o limite de estoque baixo

    const handleSave = () => {
        if (!name || !quantity || !lowStockThreshold) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Cria o objeto da nova peça com o limite de estoque baixo
        const newPart = {
            nome: name,
            quantidade: parseInt(quantity, 10), // Converte para número
            lowStockThreshold: parseInt(lowStockThreshold, 10), // Converte para número
        };

        onSave(newPart); // Passa o objeto para o componente pai
        onClose(); // Fecha o modal
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <TitleModal
                    modalName="Adicionar nova peça"
                    NameStyle={NameStyle}
                    onClose={onClose}
                    nameContainer={nameContainer}
                />
                <div style={containerModal}>
                    <label style={labelStyle}>
                        <span>Adicionar nome:</span>
                        <input
                            type="text"
                            style={inputNameStyle}
                            placeholder="Nome da peça"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label style={labelStyle}>
                        <span>Adicionar quantidade inicial:</span>
                        <input
                            type="number"
                            style={inputQtdStyle}
                            placeholder="00"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </label>
                    <label style={labelStyle}>
                        <span>Configurar alerta de estoque baixo:</span>
                        <input
                            type="number"
                            style={inputQtdStyle}
                            placeholder="00"
                            value={lowStockThreshold}
                            onChange={(e) => setLowStockThreshold(e.target.value)}
                        />
                    </label>
                </div>
                <div style={boxBtn}>
                    <CustomButton
                        imageSrc="./assets/imagePlus.png"
                        imageStyle={imageButtonPlus}
                        text="Adicionar"
                        buttonStyle={btnAddStyle}
                        onClick={handleSave}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddPartModal;