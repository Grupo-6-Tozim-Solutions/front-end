import React, { useState, useEffect } from "react";
import { Box, Modal, Typography, Divider } from "@mui/material";
import SofaRowModal from "./SofaRowModal";
import SofaSummaryRowModal from "./SofaSummaryRowModal";
import TitleModal from "./TittleModal";
import CustomButton from "./CustomButton";
import LeftWrapper from "./LeftWrapper";
import RightContainer from "./RightContainer";
import { api } from '../Provider/apiProvider';

const EditSofaModal = ({ isOpen, onClose, onSave, sofa, title }) => {
  const [leftItems, setLeftItems] = useState([]); // Todas as peças do estoque
  const [rightItems, setRightItems] = useState([]); // Peças associadas ao sofá
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
    if (!isOpen || !sofa?.id) return;

    const loadPecas = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [estoqueResponse, sofaPecasResponse] = await Promise.all([
                api.get('/peca/listarTodas'),
                api.get(`/sofa/listarPecas/${sofa.id}`) // Certifique-se de que este endpoint está correto
            ]);

            const todasPecas = Array.isArray(estoqueResponse.data) ? estoqueResponse.data : [];
            const pecasSofa = Array.isArray(sofaPecasResponse.data) ? sofaPecasResponse.data : [];

            // Verifique o que está sendo retornado na resposta da API
            console.log('Todas as peças do estoque:', todasPecas);
            console.log('Peças do sofá:', pecasSofa);

            // Mapeia as peças associadas ao sofá
            setRightItems(pecasSofa.map(peca => ({
                id: peca.Peca, // ID da peça associada
                nome: peca.nome,  // Nome da peça
                quantidade: peca.quantidade || 0 // A quantidade associada ao sofá
            })));

            // Filtra as peças disponíveis no estoque que não estão associadas ao sofá
            setLeftItems(todasPecas.filter(peca =>
                !pecasSofa.some(item => item.idPeca === peca.id) // Verifica se a peça já está associada
            ));

        } catch (error) {
            console.error('Erro ao carregar peças:', error);
            setError('Erro ao carregar peças. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    loadPecas();
}, [isOpen, sofa?.id]);

  const handleFastForward = (peca) => {
    setRightItems(prev => {
      // Verifica se a peça já está na lista
      const exists = prev.some(item => item.id === peca.id);
      if (!exists) {
        return [...prev, {
          ...peca,
          quantidade: 1, // quantidade inicial ao adicionar
          quantidadePeca: 1 // compatibilidade com o backend
        }];
      }
      return prev; // Se já existir, não adiciona
    });
  };

  const handleUpdateQuantity = (pecaId, newQuantity) => {
    setRightItems(prev =>
      prev.map(item =>
        item.id === pecaId ? {
          ...item,
          quantidade: newQuantity,
          quantidadePeca: newQuantity
        } : item
      ) 
    );
  };

  const handleDelete = (pecaId) => {
    setRightItems(prev => prev.filter(item => item.id !== pecaId));
  };

  const handleSave = async () => {
    if (!sofa?.id) return;

    try {
      // Prepara os dados para enviar ao backend
      const pecasParaAtualizar = rightItems.map(item => ({
        idPeca: item.id,
        quantidade: item.quantidade
      }));

      // Atualiza as peças do sofá no backend
      await api.put(`/sofa/adicionarPeca/${sofa.id}`, pecasParaAtualizar);

      // Chama a função onSave com os dados atualizados
      onSave({
        ...sofa,
        pecas: rightItems
      });

      onClose();
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      alert('Erro ao salvar alterações. Tente novamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          borderRadius: "10px",
          width: "70%",
          height: "72%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      >
        <TitleModal
          modalName={title}
          isEditable={false}
          onClose={onClose}
        />

        {isLoading ? (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
            <Typography>Carregando peças...</Typography>
          </Box>
        ) : error ? (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography color="error">{error}</Typography>
            <CustomButton
              text="Tentar novamente"
              onClick={() => window.location.reload()}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "2%",
              height: "100%",
              width: "100%",
              overflow: "hidden",
              padding: "20px",
            }}
          >
            {/* Lista esquerda - Todas as peças do estoque */}
            <LeftWrapper>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "10px 16px 0 0",
                }}
              >
                Peças do estoque
              </Typography>
              {leftItems
                .filter(peca => !rightItems.some(item => item.id === peca.id)) // Filtra peças já adicionadas
                .map((peca, index) => (
                  <SofaRowModal
                    key={`estoque-${peca.id}`}
                    text={peca.nome}
                    quantity={peca.quantidadeEstoque || 0}
                    onFastForward={() => handleFastForward(peca)}
                    isEven={index % 2 === 0}
                  />
                ))}
            </LeftWrapper>

            {/* Lista direita - Peças do sofá */}
            <RightContainer>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "10px 16px 0 0",
                }}
              >
                Peças do sofá
              </Typography>
              <Divider />
              <Box
                sx={{
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                }}
              >
                {rightItems.map((peca) => (
                  <SofaSummaryRowModal
                    key={`sofa-${peca.id}`}
                    text={peca.nome}
                    quantidade={peca.quantidade} // A quantidade agora deve ser corretamente atribuída
                    isEditMode={true}
                    onDelete={() => handleDelete(peca.id)}
                    onQuantityChange={(newQty) => handleUpdateQuantity(peca.id, newQty)}
                  />
                ))}
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  gap: "5%",
                  padding: "12px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CustomButton
                  imageSrc="./assets/check.png"
                  text="Salvar"
                  buttonStyle={{
                    display: "flex",
                    alignItems: "center",
                    background: "#B8FFAA",
                    border: "none",
                    borderRadius: "10px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    color: "#16BC00",
                    fontWeight: "bold",
                    width: "100%",
                    justifyContent: "center",
                    height: "100%",
                    "&:hover": {
                      backgroundColor: "#A8FF88",
                    },
                  }}
                  imageStyle={{ width: "25px", height: "25px" }}
                  onClick={handleSave}
                  enableHover={true}
                />
              </Box>
            </RightContainer>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default EditSofaModal;