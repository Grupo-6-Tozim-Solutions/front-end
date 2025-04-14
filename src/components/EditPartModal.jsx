import React from 'react';
import CustomButton from './CustomButton';

const EditPartModal = ({ isOpen, onClose, partData, onSave }) => {
    if (!isOpen) return null;

    const handleSave = () => {
        onSave(partData);
        onClose();
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={nameContainer}>
                    <div style={idPartStyle}>
                        <span style={idTextStyle}>ID</span>
                        <span style={idStyle}>001</span>
                    </div>
                    <span style={NameStyle}>Nome da Peça</span>
                    <button style={buttonExitStyle} onClick={onClose}>
                        <img
                            src="public/assets/btnClose.png"
                            alt="btnClose"
                            style={{ width: '12px', height: '12px', padding: '0px' }}
                        />
                    </button>
                </div>
                <div style={editPartContainer}>
                    <div style={actions}>
                        <span style={tittleActions}>Ações</span>
                        <div style={containerActionStyle}>
                        <label style={labelStyle}>
                            <span style={textOperationStyle}>Digite a quantidade de peças que deseja adicionar:</span>
                            <div style={boxInputButton}>
                                <input
                                    type="number"
                                    defaultValue={partData.quantity}
                                    style={inputStyle}
                                    onChange={(e) => (partData.quantity = e.target.value)}
                                />
                                <CustomButton
                                    imageSrc="./assets/imagePlus.png"
                                    imageStyle={imageButtonPlus}
                                    text="Adicionar"
                                    buttonStyle={btnAddStyle}
                                    onClick={() => console.log('Adicionar clicado')}
                                />
                                <div style={{display:'flex', position:'absolute'}}>
                                    <img src="./assets/Line.png" alt="" style={{ width: '87%', height: '1.5px',  marginTop: '55px',}} />
                                </div>
                            </div>
                        </label>
                        <label style={labelStyle}>
                            <span style={textOperationStyle}>Digite a quantidade de peças que deseja retirar:</span>
                            <div style={boxInputButton}>
                                <input
                                    type="number"
                                    defaultValue={partData.quantity}
                                    style={inputStyle}
                                    onChange={(e) => (partData.quantity = e.target.value)}
                                />
                                <CustomButton
                                    imageSrc="./assets/imageSub.png"
                                    imageStyle={imageButtonSub}
                                    text="Remover"
                                    buttonStyle={btnRemoveStyle}
                                    onClick={() => console.log('Remover clicado')}
                                />
                                <div style={{display:'flex', position:'absolute'}}>
                                    <img src="./assets/Line.png" alt="" style={{ width: '87%', height: '1.5px',  marginTop: '55px',  }} />
                                </div>
                            </div>
                        </label>
                        <div style={containerButtons}>
                            <CustomButton
                                imageSrc="./assets/check.png"
                                text="Salvar"
                                buttonStyle={{ backgroundColor: '#B8FFAA', color: '#16BC00' }}
                                onClick={handleSave}
                            />
                            <CustomButton
                                imageSrc="./assets/trashCanImage.png"
                                text="Descartar Alterações"
                                buttonStyle={btnRemoveStyle}
                                onClick={() => console.log('Excluir clicado')}
                            />
                        </div>
                        </div>
                    </div>
                    <div style={summary}>
                        <span style={tittleSumaryStyle}>
                            Resumo
                        </span>
                        <img src="./assets/Line.png" alt="" style={{ width: '96%', height: '0.8px', marginTop: '4px' }} />
                        <div style={{ display: 'flex', gap: '5px', marginTop: '18px' }}>
                            <span style={{fontWeight:'600', fontSize: '16px'}} >Peça:</span>
                            <span style={{fontSize: '12px', marginTop:'5px'}} >Peça Sinistra</span> 
                        </div>
                        <div style={boxContainer}>
                            <div style={boxResult}>
                                <span style={informationOperationStyle}>Qtd Anterior:</span> 
                                <span style={PointsStyle}>..............................................</span>
                                <span style={resultOperationStyle}>40</span>   
                            </div>
                            <div style={boxResult}>
                                <span style={informationOperationStyle} >Entrada:</span> 
                                <span style={PointsStyle}>........................................................</span>
                                <span style={resultOperationStyle}>40</span>   
                            </div>
                            <div style={boxResult}>
                                <span style={informationOperationStyle}>Saída:</span> 
                                <span style={PointsStyle}>............................................................</span>
                                <span style={resultOperationStyle}>00</span>  
                            </div> 
                        </div>
                        <div style={{marginTop: '60px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                            <span style={{fontSize: '11px', fontFamily: 'Inter', lineHeight: '14px' }} >
                            Esse registro poderá ser encontrado no seu <span style={{color:'#0740DA', fontWeight:'bold', fontStyle:'italic', margin:'0' }}>Histórico</span>
                            </span>
                            <div style={{width:'100%'}}>
                            <img src="./assets/Line.png" alt="" style={{ width: '96%', height: '0.8px', margin:'0', display: 'block' }} />
                            </div>
                            <span style={{fontSize: '20px', fontFamily:'Inter', fontWeight:'600', marginRight:'65%', marginTop:'0px'}} >
                                Total:80
                            </span>
                        </div>
                
                    </div>
                </div>
            </div>
        </div>
    );
};

// Estilos
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const PointsStyle = {
    flexGrow: 1, 
    fontSize: '16px',
    marginLeft: '7px',
    display: 'flex',
    whiteSpace: 'nowrap', // Garante que os "..." fiquem em uma única linha
    overflow: 'hidden', // Esconde qualquer conteúdo que ultrapasse o limite
    textOverflow: 'ellipsis'
    
  };


const resultOperationStyle = {
    whiteSpace: 'nowrap', // Garante que o texto não quebre para a próxima linha
    fontSize: '12px', // Tamanho da fonte
    textAlign: 'right', // Alinha o texto à direita
    marginTop: '4px', // Margem superior
    
}

const boxContainer = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '14px',
}

const boxResult = {
    display: 'flex',
    width: '100%',
}

const informationOperationStyle = {
    fontWeight:'600',
     fontSize: '16px',
     whiteSpace: 'nowrap',
}
    


const tittleSumaryStyle = {
    fontSize: '14px',
    fontWeight: 'medium',
    marginRight: '100%',
}

const modalStyle = {
    background: 'white',
    borderRadius: '10px 10px 10px 10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    height: '75vh',
    width: '65vw',
};

const idPartStyle = {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    gap: '4px',
};

const idTextStyle = {
    fontSize: '10px',
    fontFamily: 'italic',
};

const idStyle = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white',
};

const textOperationStyle = {
    fontSize: '12px',
    fontWeight: 'regular',
    marginRight: '65px',
};

const editPartContainer = {
    display: 'flex',
    gap: '16px',
    padding: '2px 18px 2px 18px',
};


const boxInputButton = {
    display: 'flex',
    gap: '120px',
    alignItems: 'center',
    marginTop: '15px',
    width: '100%',
};

const imageButtonPlus = {
    display: 'flex',
    width: '13px',
    height: '13px',
    marginRight: '7px',
};

const imageButtonSub = {
    display: 'flex',
    width: '16px',
    height: '3px',
    marginRight: '7px',
};

const btnRemoveStyle = {
    backgroundColor: '#FFC9C9',
    color: '#FF0D0D',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
};

const containerButtons = {
    display: 'flex',
    gap: '10px',
    marginLeft: '30px',
    marginTop: '30px',

}

const btnAddStyle = {
    backgroundColor: '#C9E7FF',
    color: '#0740DA',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
};

const tittleActions = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#127ADC',
    height: '6.5vh',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '8px 8px 0px 0px',
};

const actions = { 
    width: '60%',
    border: '2px solid #127ADC',
    height: '63vh',
    borderRadius: '10px',
    position: 'relative',
};


const containerActionStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 20px 0px 20px',
  
}

const summary = {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    border: '1px solid #ccc',
    backgroundColor: '#D9D9D9',
    borderRadius: '10px',
    position: 'relative',
    color: 'black',
    height: '61vh',
    padding: '5px 10px 5px 10px',
    
};

const labelStyle = {
    padding: '0px 25px 14px 4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    width: '100%',
    marginTop: '10px',
};

const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1.5px solid #000',
    width: '2.5vw',
    height: '3vh',
    display: 'flex',
    
};

const nameContainer = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    width: '97.6%',
    height: '4vh',
    background: '#0740DA',
    padding: '8px',
    borderRadius: '10px 10px 0px 0px',
    justifyContent: 'space-between',
};

const buttonExitStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
};

const NameStyle = {
    fontSize: '13px',
    fontWeight: 'Bold',
    color: 'white',
    display: 'flex',
};

export default EditPartModal;