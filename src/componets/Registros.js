import React from "react";

const Listadecomversion = (props) => {
    const { code, value, symbol_native, name } = props;

    let img = code.slice(1, code.length)
    let valor = parseFloat(value.toFixed(3))

    return (

        <div className="unidad-registros">
            <div className="bloque-ImgAndCode">
                <img src={`imgMonedas/${img}.png`} height={'50px'} width={'50px'} alt="" />
                <div className="nombres codigo">{code}</div>
                <div className="nombres"> {name}</div>

            </div>
            <div className="Conteiner-value">
                {valor}{symbol_native}
            </div>

        </div>

    );

}

export default Listadecomversion;