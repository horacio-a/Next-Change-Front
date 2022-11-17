
import React, { useEffect, useState, useRef } from "react";
import Header from "../componets/header";
import '../componets/styles/index.css'
import axios from 'axios';

import Listadecomversion from "../componets/Registros";

import ListaComponet from "../componets/lista";




const MultiConversionPage = (props) => {
    const imgDesde = useRef('')

    const [Convertido, setConvertido] = useState(true)
    const [Conversiones, setConversiones] = useState([])
    const [recursos, setRecursos] = useState([])
    const [loading1, setLoading1] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ValorConvesion, setValor] = useState('')
    const [Moneda, setMoneda] = useState([])

    const baseURL = `${process.env.REACT_APP_PAGE}/info/${process.env.REACT_APP_API_KEY} `

    const traerConversion = async () => {
        setConvertido(false)
        setLoading1(true)
        axios.get(`${process.env.REACT_APP_PAGE}/especificall/${Moneda}/${ValorConvesion}/${process.env.REACT_APP_API_KEY}`).then((response) => {
            setConversiones(response.data)
            console.log(response.data)

        })
        setLoading1(false)

    }
    const cambiarFotoDesde = (evn) => {
        let nombreFoto = evn.slice(1, evn.length)
        console.log(nombreFoto)
        imgDesde.current.setAttribute('src', 'imgMonedas/' + nombreFoto + '.png')
    }


    const cambiarDesde = (event) => {
        cambiarFotoDesde(event.target.value)
        setMoneda(event.target.value)
    }




    useEffect(() => {

        const cargarRecursos = async () => {
            setLoading(true);
            axios.get(baseURL).then((response) => {
                setRecursos(response.data)
            });
            setLoading(false)
        }
        cargarRecursos();

    }, []);



    return (
        <>
            <Header />
            <main className="main-multi">
                <div className="conteiner-principal">
                    <div className="conteiner-opciones">
                        <img src=" " alt="" ref={imgDesde} height={'50% '} />

                        <select value={Moneda} onChange={cambiarDesde} className='multi'>
                            <option value={'test'} className='optionDefault'>Seleciones una moneda</option>
                            {
                                loading ? (
                                    <p>cargando</p>
                                ) : (
                                    recursos.map(item => <ListaComponet
                                        id={item.id}
                                        name={item.name}
                                        symbol={item.symbol}
                                        symbol_native={item.symbol_native}
                                        decimal_digits={item.decimal_digits}
                                        rounding={item.rounding}
                                        code={item.code}
                                        name_plural={item.name_plural}
                                    />))

                            }
                        </select>
                        <input className="number-conversionmulti" type={'number'} placeholder={'1'} value={ValorConvesion} onChange={(event) => setValor(event.target.value)}></input>


                    </div>
                    <div className="conteiner-info">
                        <div className="bloque-tituloInfo">

                            <div className="unidad">Monedas</div>
                            <div className="unidad">Valor</div>
                        </div>
                        {
                            Convertido ? (
                                <p>ingrese una divisa</p>
                            ) : (

                                loading1 ? (
                                    <p>cargando</p>
                                ) : (
                                    Conversiones.map(item => <Listadecomversion
                                        code={item.code}
                                        value={item.value}
                                        name={item.name}
                                        symbol_native={item.symbol_native}

                                    />))


                            )
                        }

                    </div>
                    <div className="conteiner-button">
                        <button onClick={traerConversion} className='buttonConversionmulti'>Convertir</button>
                    </div>

                </div>








            </main>
        </>


    );
}
export default MultiConversionPage;