
import React, { useState, useEffect } from "react";
import '../componets/styles/index.css'

import HeaderWhite from "../componets/headerWhite";
import axios from 'axios';



const IndexPage = (props) => {

    const [DolarEuroValue, SetDolarEuro] = useState('')
    const [DolarRealValue, SetDolarReal] = useState('')
    const [DolarAEDValue, SetDolarAED] = useState('')
    const [EuroGPBValue, SetEuroGPB] = useState('')


    useEffect(() => {

        const cargarRecursos = async () => {
            axios.get(`${process.env.REACT_APP_PAGE}/dataindex/${process.env.REACT_APP_API_KEY}`).then((response) => {
                SetDolarEuro(response.data.UsdEur.toLocaleString('es-MX'))
                SetDolarAED(response.data.UsdAed.toLocaleString('es-MX'))
                SetDolarReal(response.data.UsdBrl.toLocaleString('es-MX'))
                SetEuroGPB(response.data.EurGBp.toLocaleString('es-MX'))
            })
        }
        console.log(process.env.REACT_APP_PAGE)
        cargarRecursos();

    }, []);



    return (
        <>
            <HeaderWhite />
            <main className="index">
                <div className="columna">
                    <img src="Logos/LogoLwhite.png" alt='Next change' className="imgLogo" />
                    <div className="tablaConversion">
                        <div className="ColumnaImgText">
                            <p> <img src="imgMonedas/USD.png" alt="USD" />USD<img src="imgMonedas/EUR.png" alt="EUR" />EUR</p>
                            <p> <img src="imgMonedas/USD.png" alt="USD" />USD<img src="imgMonedas/AED.png" alt="AED" />AED</p>
                            <p> <img src="imgMonedas/USD.png" alt="USD" />USD<img src="imgMonedas/BRL.png" alt="BRL" />BRL</p>
                            <p> <img src="imgMonedas/EUR.png" alt="EUR" />EUR<img src="imgMonedas/GBP.png" alt="GBP" />GBP</p>
                        </div>
                        <div className="ColumnaValue">
                            <p>{DolarEuroValue} € </p>
                            <p>{DolarAEDValue} د.إ </p>
                            <p>{DolarRealValue} R$</p>
                            <p>{EuroGPBValue} £</p>
                        </div>


                    </div>
                </div>
                <div className="columna">
                    <div className="conteiner-index">
                        <div className="TituloIndex">
                            ¿Quienes somos?
                        </div>
                        <p>
                            Cambia tus divisas de manera segura y eficiente con Next Change, tasas actualizadas y procesamiento rápido
                        </p>
                    </div>
                    <div className="conteiner-index">
                        <div className="TituloIndex">
                            ¿Quieres ponerte en contacto?
                        </div>
                        <p>
                        ¿Necesitas una solución de conversión de divisas automatizada? pregunta por nuestra API de Next Change, procesamiento rápido y seguro
                        </p>
                    </div>

                </div>
            </main>
        </>


    );
}
export default IndexPage;