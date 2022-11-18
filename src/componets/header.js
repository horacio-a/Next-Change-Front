import React, { useState } from "react";
import { Link } from "react-router-dom";


const Header = (props) => {
    const [activeNav, SetactiveNav] = useState(false)


    const OpenHeader = () => {
        if (activeNav === false) {
            SetactiveNav(true)
        } else (
            SetactiveNav(false)
        )
    }


    return (
        <>
            <header className="other pc">
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

            <header className="conteiner-header movil">
                <div className="icono-menu" id="header" >
                    <div className="conteiner1header">
                        <img src="header-movil.png" onClick={OpenHeader} alt='/' />
                    </div>

                    <div className="conteiner2header">
                        <Link to={'/'}>
                        <img src="Logos/LogoSwhite.png" alt='/' />
                        </Link>
                    </div>

                </div>
                <div className={`cont-menu ${activeNav ? "active" : ""}`} id="menu">
                    <div className="conteiner-back">
                        <img src="header-movil-active.png" onClick={OpenHeader} alt='/' />
                    </div>
                    <ul>
                        <li>
                            <Link to={'/convertir'}>
                                Convertir dos divisas
                            </Link>
                        </li>
                        <li>
                            <Link  to={'/MultiConversion'}> 
                                Convertir varias divisas
                            </Link>
                        </li>
                        <li>
                            <Link to={'/contacto'}>
                                Contacto
                            </Link>
                        </li>


                    </ul>

                </div>
            </header>
        </>



    )

}

export default Header;