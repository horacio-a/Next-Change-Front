import React from "react";
import { Link } from "react-router-dom";


const Header = (props) => {

    return (
        <header className="other">
            <div className='conteiner1'>
                <Link to={'/'}>
                <img src="Logos/LogoMwhite.png" height={'75%'} alt={'Next Change logo'} />
                </Link>
                <div className="separador"></div>
                <Link to={'/convertir'} className="Bloque-Header">
                    <p>Convertir</p>
                    <p>dos divisas</p>
                </Link>
                <div className="separador"></div>
                <Link to={'/MultiConversion'} className="Bloque-Header">
                    <p>Convertir</p>
                    <p>varias divisas</p>
                </Link>
                <div className="separador"></div>
            </div>
            <div className="conteiner2">
                <Link to={'/contacto'} >
                    <p>Contacto</p>
                </Link>
            </div>
        </header>
    )

}

export default Header;