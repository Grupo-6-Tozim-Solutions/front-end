import React from "react";

const LinkCadastro = (props) => {
    
    return (
    <span className="login-help">{props.textoBase} <a href="#">{props.textoLink}</a></span>

        );
   
     
}

export default LinkCadastro;