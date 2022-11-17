import React from "react";



const ListaComponet = (props) => {
    const { name, symbol_native, code,  } = props;
    if (name != null){
        return (
            <option value={code} name={name} > {name} - {symbol_native}</option>
    
        );
    }



}

export default ListaComponet;