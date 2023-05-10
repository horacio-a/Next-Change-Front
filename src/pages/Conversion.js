
import React, { useEffect, useState, useRef } from "react";
import '../componets/styles/index.css'

import ListaMonedas from "../componets/ListaMonedas";
import axios from 'axios';
import Header from "../componets/header";


const baseURL = `${process.env.REACT_APP_PAGE}/info/${process.env.REACT_APP_API_KEY} `

const ConversionPage = () => {

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
        let nombreFoto = evn.slice(1, evn.length)
        imgDesde.current.setAttribute('src', 'imgMonedas/' + nombreFoto + '.png')
    }

    const cambiarfotoHasta = (evn) => {
        let nombreFoto = evn.slice(1, evn.length)
        imgHasta.current.setAttribute('src', 'imgMonedas/' + nombreFoto + '.png')
    }

    const cambiarDesde = (code, name, symbol_native) => {
        setDesde(code)
        setDesdeNames(name)
        SetSignoDesde(symbol_native)
        cambiarFotoDesde(code)
        inputDesde.current.value = ''
        openlist('desde')

    }

    const cambiarHasta = (code, name, symbol_native) => {
        setHasta(code)
        setHastaName(name)
        SetSignohasta(symbol_native)
        cambiarfotoHasta(code)
        inputHasta.current.value = ''
        openlist('hasta')

    }








    const [term, setTerm] = useState("");
    const [Symbolterm, setSymbolTerm] = useState("");
    const inputDesde = useRef('')
    const inputHasta = useRef('')
    const [listStateDesde, setListStateDesde] = useState(true)
    const [listStateHasta, setListStateHasta] = useState(true)

    const [search, setsearch] = useState('')

    const openlist = (option) => {
        if (option === 'desde') {
            if (listStateDesde === false) setListStateDesde(true); setTerm('')
            if (listStateDesde === true) setListStateDesde(false); setListStateHasta(true); setTerm('')
        }
        if (option === 'hasta') {
            if (listStateHasta === false) setListStateHasta(true); setTerm('')
            if (listStateHasta === true) setListStateHasta(false); setListStateDesde(true); setTerm('')
        }

    }

    useEffect(() => {
        const cargarRecursos = async () => {
            setLoading(true);
            const response = await axios.get(baseURL)
            setRecursos(response.data)
            setLoading(false)
        }
        cargarRecursos();

    }, []);


    const InputChange = (e) => {
        // se recibe el input para filtar las monedas
        const search = e.target.value
        let txtArr = search.split(' ');
        // se modifica el formato para que el texto tenga el formato necesario\
        // ejemplo "United Arab Emiratates"
        for (let i = 0; i < txtArr.length; i++) {
            const element = txtArr[i];
            txtArr[i] = element.charAt(0).toUpperCase() + element.slice(1);
        }
        const Termino = txtArr.join(' ')
        setTerm(Termino)
        setSymbolTerm(Termino.toUpperCase())
    }



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
                                    <div className="conteinerImgSelect">
                                        <img src='' alt="" ref={imgDesde} />
                                    </div>
                                    <div className="conteinerForPosition">
                                        <div className={`lista ${listStateDesde ? 'desactive' : 'active'}`} onClick={() => { openlist('desde') }}>
                                            <div className="textLista">
                                                {
                                                    desdeName === '' && SignoDesde === ''
                                                        ? <div>Selecciones una moneda</div>
                                                        : <div> {desdeName} - {SignoDesde}</div>
                                                }
                                            </div>

                                            <div className="conteinerTriangleLista">
                                                <i className={`fa-solid fa-play ${listStateDesde ? 'fa-rotate-90' : 'fa-rotate-270'}`}></i>
                                            </div>
                                        </div>
                                        <div className={`SearchLista ${listStateDesde ? 'desactive' : 'active'}`}>
                                            <input type="text" className="inputSearch" onChange={InputChange} ref={inputDesde} />
                                        </div>
                                        <div className={`blockLista ${listStateDesde ? 'desactive' : 'active'}`}>
                                            {
                                                loading ? (
                                                    <p>cargando</p>
                                                ) : (

                                                    recursos.filter(element => {
                                                        if (element.name !== null && element.symbol !== null)
                                                            return element.name.includes(term) || element.code.includes(Symbolterm)
                                                    }).map(item => <ListaMonedas
                                                        id={item.id}
                                                        name={item.name}
                                                        symbol={item.symbol}
                                                        symbol_native={item.symbol_native}
                                                        decimal_digits={item.decimal_digits}
                                                        rounding={item.rounding}
                                                        code={item.code}
                                                        name_plural={item.name_plural}
                                                        funtionChange={cambiarDesde}
                                                    />))

                                            }
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="conteiner-columna">
                                <div className="subtitulo">a</div>

                                <div className="conteiner-select">
                                    <div className="conteinerImgSelect">
                                        <img src='' alt="" ref={imgHasta} />
                                    </div>
                                    <div className="conteinerForPosition">
                                        <div className={`lista ${listStateHasta ? 'desactive' : 'active'}`} onClick={() => { openlist('hasta') }}>
                                            <div className="textLista">
                                                {
                                                    hastaName === '' && Signohasta === ''
                                                        ? <div>Selecciones una moneda</div>
                                                        : <div> {hastaName} - {Signohasta}</div>
                                                }
                                            </div>

                                            <div className="conteinerTriangleLista">
                                                <i className={`fa-solid fa-play ${listStateHasta ? 'fa-rotate-90' : 'fa-rotate-270'}`}></i>
                                            </div>
                                        </div>
                                        <div className={`SearchLista ${listStateHasta ? 'desactive' : 'active'}`}>
                                            <input type="text" className="inputSearch" onChange={InputChange} ref={inputHasta} />
                                        </div>
                                        <div className={`blockLista ${listStateHasta ? 'desactive' : 'active'}`}>
                                            {
                                                loading ? (
                                                    <p>cargando</p>
                                                ) : (

                                                    recursos.filter(element => {
                                                        if (element.name !== null && element.symbol !== null)
                                                            return element.name.includes(term) || element.code.includes(Symbolterm)
                                                    }).map(item => <ListaMonedas
                                                        id={item.id}
                                                        name={item.name}
                                                        symbol={item.symbol}
                                                        symbol_native={item.symbol_native}
                                                        decimal_digits={item.decimal_digits}
                                                        rounding={item.rounding}
                                                        code={item.code}
                                                        name_plural={item.name_plural}
                                                        funtionChange={cambiarHasta}
                                                    />))

                                            }
                                        </div>
                                    </div>


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