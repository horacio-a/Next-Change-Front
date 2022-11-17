import React from "react";
import { Link } from "react-router-dom";


const HeaderWhite = (props) => {

    return (
        <header className="Index">
            <div className='conteiner1Index'>
                <Link>
                    <img src="Logos/LogoMblue.png" height={'75%'} alt={'Next Change logo'} />
                </Link>
                <div className="separadorIndex"></div>
                <Link to={'/convertir'} className="Bloque-HeaderIndex">
                    <p>Convertir</p>
                    <p>dos divisas</p>
                </Link>
                <div className="separadorIndex"></div>
                <Link to={'/MultiConversion'} className="Bloque-HeaderIndex">
                    <p>Convertir</p>
                    <p>varias divisas</p>
                </Link>
                <div className="separadorIndex"></div>
            </div>
            <div className="conteiner2Index">
                <Link to={'/contacto'} >
                    <p>Contacto</p>
                </Link>
            </div>
        </header>
    )

}

export default HeaderWhite;