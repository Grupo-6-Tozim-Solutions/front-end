import React from "react";

const LinkCadastro = (props) => {
    
    return (
    <span class="login-help">{props.textoBase} <a href="#">{props.textoLink}</a></span>

        );
   
     
}

export default LinkCadastro;