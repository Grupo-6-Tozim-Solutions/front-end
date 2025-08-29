import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import "../LoginPage.css";
import LoginLeft from "../components/LoginLeft";
import TituloLogin from "../components/TituloLogin";
import CadastroForm from "../components/CadastroForm";
import LinkCadastro from "../components/LinkCadastro";
import { api } from "../Provider/apiProvider";

const CadastroPage = () => {
  const [loginStatus, setLoginStatus] = useState({ type: null, message: "" });
  const [senhaErrors, setSenhaErrors] = useState([]);
  const navigate = useNavigate();

  const validarSenha = (senha) => {
    const errors = [];

    if (senha.length < 8) {
      errors.push("Pelo menos 8 caracteres");
    }
    if (!/[A-Z]/.test(senha)) {
      errors.push("Pelo menos uma letra maiúscula");
    }
    if (!/[a-z]/.test(senha)) {
      errors.push("Pelo menos uma letra minúscula");
    }
    if (!/[0-9]/.test(senha)) {
      errors.push("Pelo menos um número");
    }
    if (!/[@$!%*?&]/.test(senha)) {
      errors.push("Pelo menos um caractere especial (@$!%*?&)");
    }

    return errors;
  };

  const handleCadastro = ({ nome, email, senha, senhaConfirmacao }) => {
    // Validação de senha robusta
    const errors = validarSenha(senha);

    if (errors.length > 0) {
      setSenhaErrors(errors);
      setLoginStatus({
        type: "erro",
        message: "A senha não atende aos requisitos de segurança.",
      });
      return;
    }

    if (senha !== senhaConfirmacao) {
      setLoginStatus({ type: "erro", message: "As senhas não coincidem." });
      return;
    }

    api
      .post("/usuario", { nome, email, senha })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setLoginStatus({
            type: "sucesso",
            message: "Cadastro realizado com sucesso!",
          });
          setSenhaErrors([]);
          navigate("/login");
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Erro ao realizar cadastro.";
        setLoginStatus({ type: "erro", message: errorMessage });
      });
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#f4f4f4">
      <LoginLeft />
      <Box
        className="right-panel"
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "3% 0 0 0",
          marginTop: "-5%",
        }}
      >
        <TituloLogin titulo="Cadastro" />
        <CadastroForm
          onCadastro={handleCadastro}
          loginStatus={loginStatus}
          senhaErrors={senhaErrors}
        />
        <Box className="div-link-cadastro" sx={{ marginTop: "-2%" }}>
          <Typography>
            Já possui conta?{" "}
            <LinkCadastro
              textoBase=""
              textoLink="Clique aqui."
              onClick={() => navigate("/login")}
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CadastroPage;
