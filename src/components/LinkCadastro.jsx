import React from "react";

const LinkCadastro = (props) => {
    
    return (
    <span className="login-help">{props.textoBase} <a onClick={props.onClick}>{props.textoLink}</a></span>

        );
   
     
}

export default LinkCadastro;