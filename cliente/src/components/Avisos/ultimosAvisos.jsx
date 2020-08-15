import React from 'react'
import Estrellas from './estrellas'
import CurrencyFormat from 'react-currency-format'
import { Link } from "react-router-dom"


const AvisosUltimos=({avisos})=>{

 console.log('recibidos en contenedor',avisos)
 const path="/avisos/rev/"
 const url='http://146.83.198.35:1074/'
 
 return(

        <div className="row m-4 w-100">
            <div className="row w-100"><h5>Últimos avisos publicados</h5></div>
            <div className="row card-deck w-100">
            {
                avisos.map((aviso,i)=>{
                    const pathEntero=(Object.values(aviso.eu_imagene).slice(1,6)).find(im=>im!=null)
                    const tamano=(Object.values(aviso.eu_imagene).slice(1,6)).find(im=>im!=null).length
                     const urlImagen=pathEntero.slice(27,tamano)
                     const urlFinal=url.concat(urlImagen)
                   console.log('final',urlFinal)
                    return(
                        <div key={i} className="col-md-3 col-sm-12 card p-0">
                            <img className="card-img-top rounded mx-auto d-block mt-2" src={urlFinal} style={{height:"200px",maxWidth:"220px"}} alt="..."/>
                            <div className="row d-flex justify-content-center mb-2">                            
                            <Estrellas puntaje={aviso.ea_valoracion}/> {/*calcula cantidad de estrellas*/}
                            </div>

                            
                            <div className="card-body border-top m-0">
                            <div className="card-title w-100 text-truncate">
                           
                           
                            <Link  className="link" style={{maxWidth: "100px"}} to={path.concat(aviso.ea_id.toString(10))}>
                                {aviso.ea_titulo}
                            </Link>
                            </div>
                            <CurrencyFormat value={aviso.ea_precio} displayType={'text'}
                                thousandSeparator={true} prefix={'$'} renderText={value =>
                                 <h5 className="row border-bottom py-2 border-top d-flex justify-content-center font-weight-bold" 
                                 style={{color:"#525252"}}>{value} CLP</h5>} />
                  
                            <p className="card-text overflow-auto m-0" style={{maxHeight:"70px"}}>{aviso.ea_descrip}</p>
                           
                            </div>
                            <div className="card-footer w-100 d-flex justify-content-end">
                            <small className="text-muted">{aviso.ea_fecha_public}</small>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default AvisosUltimos