import React from "react";



const ListaMonedas = (props) => {
    const { name, symbol_native, code, funtionChange } = props;

    if (name != null) {
        let img = code.slice(1, code.length)

        return (
            <div className="unitBlockLista" onClick={() => { funtionChange(code, name, symbol_native) }}>
                <img src={`imgMonedas/${img}.png`}></img>
                <div className="codeBlock">{code}</div>
                <div className="nameBlock">{name}</div>
            </div>
        );
    }



}

export default ListaMonedas;