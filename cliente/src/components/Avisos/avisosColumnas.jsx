import React from 'react'
import Estrellas from './estrellas'
import CurrencyFormat from 'react-currency-format'
import { Link } from "react-router-dom"


const AvisosColumnas=(avisosActual)=>{
    const avs=Object.values(avisosActual)[0]
    const path="/avisos/rev/"
    //const filas=Math.ceil(largo/columnas)
    const url='http://146.83.198.35:1074/'
    //avisos.map(aviso=>console.log('aviso',aviso))
    
    return(
        <div className="row overflow-auto border">
           { avs.map(aviso=>{
               
                const pathEntero=(Object.values(aviso.eu_imagene).slice(1,6)).find(im=>im!=null)
                const tamano=(Object.values(aviso.eu_imagene).slice(1,6)).find(im=>im!=null).length
                const urlImagen=pathEntero.slice(27,tamano)
                const urlFinal=url.concat(urlImagen)  
               

               return(
                <div key={aviso.ea_id} className="col-md-4 border-bottom border-right">
                    <div className="row justify-content-center mt-2">
                            <Link  className="link text-truncate" style={{maxWidth: "180px"}} to={path.concat(aviso.ea_id.toString(10))}>
                                {aviso.ea_titulo}
                            </Link>
                    </div>
                    
                    <div className="row justify-content-center my-2">
                        <img className="rounded" src={urlFinal} height="114px" width="121px"  alt="..."/>
                    </div>

                    <div className="row justify-content-center">
                    <Estrellas puntaje={aviso.ea_valoracion}/> {/*calcula cantidad de estrellas*/}
                    </div>

                    <div className="row justify-content-center font-weight-bold" style={{color:"grey"}}>
                        <CurrencyFormat value={aviso.ea_precio} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} renderText={value => <h5 className="font-weight-bold" style={{color:"#525252"}}>{value} CLP</h5>} />
                    </div>
                    
                    <div className="row justify-content-center">
                    {aviso.eu_comuna.ec_nombre}
                    </div>
                    <div className="row justify-content-center mb-2">
                    {aviso.eu_comuna.eu_region.er_nombre}
                    </div>
                    <div className="row justify-content-center">
                    {aviso.eu_usuario.eu_universidad.eun_nombre}
                        </div>
                    <div className="row justify-content-center mb-2">
                    {aviso.ea_fecha_public}

                    </div>

                </div>
                )
           })}

        </div>
    ) 

   
}


export default AvisosColumnas