
import React, { useEffect, useState, useRef } from "react";
import '../componets/styles/index.css'

import axios from 'axios';
import ListaComponet from "../componets/lista";
import Header from "../componets/header";


const baseURL = `${process.env.REACT_APP_PAGE}/info/${process.env.REACT_APP_API_KEY} `

const ConversionPage = (props) => {
    const imgDesde = useRef(null)
    const imgHasta = useRef(null)
    const [loading, setLoading] = useState(false)
    const [Signohasta, SetSignohasta] = useState('')
    const [SignoDesde, SetSignoDesde] = useState('')
    const [recursos, setRecursos] = useState([])
    const [desdeValue, setDesde] = useState('')
    const [desdeName, setDesdeNames] = useState('')
    const [hastaValue, setHasta] = useState('')
    const [hastaName, setHastaName] = useState('')
    const [cantidValue, setCantid] = useState('')
    const [converLoadind, setConverLoading] = useState(false)
    const [ValorConvesion, setValor] = useState('')


    const traerConversion = async () => {
        setConverLoading(true)
        console.log(converLoadind)
        let response = await axios.get(`${process.env.REACT_APP_PAGE}/conver/${desdeValue}/${hastaValue}/${cantidValue}/${process.env.REACT_APP_API_KEY}`)
        if (response.data.conversion === 'error') {
            setValor('Error')
        } else {
            let respuesta = parseFloat(response.data.conversion.toFixed(2))
            setValor(respuesta.toLocaleString('es-MX') + Signohasta)
        }

        setConverLoading(false)


    }



    const cambiarFotoDesde = (evn) => {
        console.log(evn)
        let nombreFoto = evn.slice(1, evn.length)
        console.log(nombreFoto)
        imgDesde.current.setAttribute('src', 'imgMonedas/' + nombreFoto + '.png')
    }

    const cambiarfotoHasta = (evn) => {
        let nombreFoto = evn.slice(1, evn.length)
        imgHasta.current.setAttribute('src', 'imgMonedas/' + nombreFoto + '.png')
    }

    const cambiarDesde = (event) => {
        setDesde(event.target.value)
        fijarNameDesde(event.target.selectedIndex, event.target)
        cambiarFotoDesde(event.target.value)

    }

    const fijarNameDesde = (i, a) => {
        if (a.options[i].text !== 'Seleciones una moneda') {
            let resultado = (a.options[i].text).split('-')

            setDesdeNames(resultado[0])
            SetSignoDesde(resultado[1])

        } else (
            setDesdeNames('')
        )
    }
    const fijarNameHasta = (i, a) => {
        if (a.options[i].text !== 'Seleciones una moneda') {
            let resultado = ('a ' + a.options[i].text).split('-')
            setHastaName(resultado[0])
            SetSignohasta(resultado[1])
        } else (
            setHastaName('')
        )
    }

    const CambiarHasta = (event) => {
        setHasta(event.target.value)
        fijarNameHasta(event.target.selectedIndex, event.target)
        cambiarfotoHasta(event.target.value)
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
            <main className="other">
                <div className="conteiner-Conversion">
                    <div className="Titulo"> {cantidValue} {SignoDesde} {desdeName} {hastaName}  </div>

                    <div className="conteineres-columnas">

                        <div className="columna">
                            <div className="conteiner-columna">
                                <div className="subtitulo">Desde</div>
                                <div className="conteiner-select">

                                    <img src='' alt="" ref={imgDesde} />
                                    <select value={desdeValue} onChange={cambiarDesde} className='one'>
                                        <option value={'test'}>Seleciones una moneda</option>
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
                                </div>
                            </div>
                            <div className="conteiner-columna">
                                <div className="subtitulo">a</div>

                                <div className="conteiner-select">
                                    <img src="" alt="" ref={imgHasta} ></img>
                                    <select value={hastaValue} onChange={CambiarHasta} className='one'>
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
                                </div>
                            </div>

                        </div>

                        <div className="columna">
                            <div className="conteiner-valores">
                                <div className="subtitulo">Monto</div>
                                <input className="number-conversion" placeholder={`1 ${SignoDesde}`} type={'number'} value={cantidValue} onChange={(event) => setCantid(event.target.value)}></input>
                            </div>
                            <div className="conteiner-valores">
                                <div className="subtitulo">Conversion</div>
                                <div className="resultado">
                                {converLoadind ? <span class="loader"></span> : ValorConvesion}

                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="conteiner-boton">

                        <button className="buttonConversion" onClick={traerConversion} >Convertir</button>

                    </div>

                </div>


            </main>
        </>
    );
}
export default ConversionPage;