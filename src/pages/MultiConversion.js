
import React, { useEffect, useState, useRef } from "react";
import Header from "../componets/header";
import '../componets/styles/index.css'
import axios from 'axios';

import Listadecomversion from "../componets/Registros";

import ListaComponet from "../componets/lista";

import ListaMonedas from "../componets/ListaMonedas";


const MultiConversionPage = (props) => {
    const imgDesde = useRef('')
    const [desdeValue, setDesde] = useState('')
    const [desdeName, setDesdeNames] = useState('')
    const [SignoDesde, SetSignoDesde] = useState('')
    const [Convertido, setConvertido] = useState(true)
    const [Conversiones, setConversiones] = useState([])
    const [recursos, setRecursos] = useState([])
    const [loading1, setLoading1] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ValorConvesion, setValor] = useState('')
    const [Moneda, setMoneda] = useState([])



    const traerConversion = async () => {
        setConvertido(false)
        setLoading1(true)
        let response = await axios.get(`${process.env.REACT_APP_PAGE}/especificall/${desdeValue}/${ValorConvesion}/${process.env.REACT_APP_API_KEY}`)
        setConversiones(response.data)
        setTimeout(() => {
            setLoading1(false)

        }, 1000);
    }
    const cambiarFotoDesde = (evn) => {
        let nombreFoto = evn.slice(1, evn.length)
        console.log(nombreFoto)
        imgDesde.current.setAttribute('src', 'imgMonedas/' + nombreFoto + '.png')
    }


    const cambiarDesde = (code, name, symbol_native) => {
        setDesde(code)
        setDesdeNames(name)
        SetSignoDesde(symbol_native)
        cambiarFotoDesde(code)
        inputDesde.current.value = ''
        openlist('desde')

    }




    useEffect(() => {
        const baseURL = `${process.env.REACT_APP_PAGE}/info/${process.env.REACT_APP_API_KEY} `

        const cargarRecursos = async () => {
            setLoading(true);
            axios.get(baseURL).then((response) => {
                setRecursos(response.data)
            });
            setLoading(false)
        }
        cargarRecursos();

    }, []);




    const [term, setTerm] = useState("");
    const [Symbolterm, setSymbolTerm] = useState("");
    const [termConversion, setTermConversion] = useState("");
    const [SymboltermConversion, setSymbolTermConversion] = useState("");
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
    const InputChangeConversion = (e) => {
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
        setTermConversion(Termino)
        setSymbolTermConversion(Termino.toUpperCase())
    }


    return (
        <>
            <Header />
            <main className="main-multi">
                <div className="conteiner-principal">
                    <div className="conteiner-opciones">
                        <div className="imgMulti">
                            <img src=" " alt="" ref={imgDesde} />
                        </div>

                        <div className="conteiner-select small">
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
                        <input className="number-conversionmulti" type={'number'} placeholder={'1'} value={ValorConvesion} onChange={(event) => setValor(event.target.value)}></input>


                    </div>

                    <div className="conteiner-info">
                        <div className="bloque-tituloInfo">
                            <input type={'text'} onChange={InputChangeConversion} placeholder={'Busqueda rapida'} />
                        </div>
                        <div className="bloque-tituloInfo">

                            <div className="unidad">Monedas</div>
                            <div className="unidad">Valor</div>
                        </div>
                        {
                            Convertido ? <div className="tituloPrevio" >ingrese una divisa</div> : (

                                loading1 ? (
                                    <div className="conteinerloader">
                                        <span className="loader2"></span>
                                    </div>
                                ) : (
                                    Conversiones.filter(element => {
                                        if (element.name !== null && element.symbol !== null)
                                            return element.name.includes(termConversion) || element.code.includes(SymboltermConversion)
                                    }).map(item => <Listadecomversion
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