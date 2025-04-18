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
                    <div style={boxNameContainer}>
                    <div style={idPartStyle}>
                        <span style={idTextStyle}>ID</span>
                        <span style={idStyle}>001</span>
                    </div>
                    <span style={NameStyle}>Nome da Peça</span>
                    <button style={buttonExitStyle} onClick={onClose}>
                        <img
                            src="public/assets/btnClose.png"
                            alt="btnClose"
                            style={{ width: '16px', height: '16px' }}
                        />
                    </button>
                    </div>
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
                                    <img src="./assets/Line.png" alt="" style={{ width: '94%', height: '1.5px',  marginTop: '55px',}} />
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
                                    <img src="./assets/Line.png" alt="" style={{ width: '94%', height: '1.5px',  marginTop: '55px',  }} />
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
                        <div style={{ display: 'flex', gap: '5px', marginTop: '22px' }}>
                            <span style={{fontWeight:'600', fontSize: '17px'}} >Peça:</span>
                            <span style={{fontSize: '13px', marginTop:'5px', fontWeight:'500'}} >Peça Sinistra</span> 
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
                        <div style={{marginTop: '35%', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                            <span style={{fontSize: '12px', fontFamily: 'Inter', lineHeight: '14px' }} >
                            Esse registro poderá ser encontrado no seu <span style={{color:'#0740DA', fontWeight:'bold', fontStyle:'italic', margin:'0' }}>Histórico</span>
                            </span>
                            <div style={{width:'100%'}}>
                            <img src="./assets/Line.png" alt="" style={{ width: '100%', height: '0.8px', margin:'0', display: 'block' }} />
                            </div>
                            <span style={{fontSize: '20px', fontFamily:'Inter', fontWeight:'600', marginRight:'75%', marginTop:'0px'}} >
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
    fontSize: '14px', // Tamanho da fonte
    textAlign: 'right', // Alinha o texto à direita
    marginTop: '4px',
    fontWeight:'500' // Margem superior
    
}

const boxContainer = {
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '17px',
    marginTop: '16px',
}

const boxResult = {
    display: 'flex',
    width: '100%',
}

const informationOperationStyle = {
    fontWeight:'600',
     fontSize: '17px',
     whiteSpace: 'nowrap',
}

const tittleSumaryStyle = {
    fontSize: '17px',
    fontWeight: '500',
}

const modalStyle = {
    background: 'white',
    borderRadius: '10px 10px 10px 10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    height: '62vh',
    width: '55vw',
    display:'flex',
    alignItems:'center',
    flexDirection:'column'
};

const boxNameContainer = {
    display:'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding:'5px 17px 5px 17px'

}

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
    fontWeight: '400',
};

const editPartContainer = {
    display: 'flex',
    gap: '16px',
    height:'85%',
    width:'95%',
};



const boxInputButton = {
    display: 'flex',
    gap: '50%',
    alignItems: 'center',
    marginTop: '15px',
    width: '100%',
  
};

const imageButtonPlus = {
    display: 'flex',
    width: '16px',
    height: '16px',
    marginRight: '7px',
};

const imageButtonSub = {
    display: 'flex',
    width: '18px',
    height: '4px',
    marginRight: '7px',
};

const btnRemoveStyle = {
    backgroundColor: '#FFC9C9',
    color: '#FF0D0D',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
};

const containerButtons = {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',

}

const btnAddStyle = {
    backgroundColor: '#C9E7FF',
    color: '#0740DA',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
};

const tittleActions = {
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#127ADC',
    height: '6.5vh',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width:'100%',
    borderRadius: '8px 8px 0px 0px',
};

const actions = { 
    width: '60%',
    border: '2px solid #127ADC',
    height: '100%',
    borderRadius: '10px',
    position: 'relative',
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center'

};


const containerActionStyle = {
    width: '90%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    gap:'2%',
    marginTop:'7px'
   
  
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
    height: '97.5%',
    padding: '7px 12px 5px 12px',
    
};

const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    width: '100%',
    marginTop: '10px',
};

const inputStyle = {
 
    borderRadius: '5px',
    border: '2px solid back',
    width: '4vw',
    height: '6vh',
    display: 'flex',
    marginBottom:'20px'
    
};

const nameContainer = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    width: '100%',
    height: '6vh',
    background: '#0740DA',
    borderRadius: '10px 10px 0px 0px',
};

const buttonExitStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding:'0px'
};

const NameStyle = {
    fontWeight: 'Bold',
    color: 'white',
    display: 'flex',
};

export default EditPartModal;