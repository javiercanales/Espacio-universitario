import React from 'react'
import Estrellas from './estrellas'
import CurrencyFormat from 'react-currency-format'
import { Link } from 'react-router-dom'

const Avisos=(avisosActual)=>{
  const avs=Object.values(avisosActual)[0] //para que lo tome como array la función map
  const path="/avisos/rev/"
  const url='http://146.83.198.35:1074/'
 //console.log('aviso actual',avisosActual)
 //let pathImagen
//console.log('aviso act',avisosActual)
//avs.map(aviso=>{aviso.})

 // pathImagen=paths<.find(im=>im!=null)

  //onsole.log('path',pathImagen,'completo',paths)

  return(
    <div className="container">
  { 
    avs.map(aviso=>{
      //console.log((Object.values(aviso.eu_imagene).slice(1,6)).find(im=>im!=null))
        const pathEntero=(Object.values(aviso.eu_imagene).slice(1,6)).find(im=>im!=null)
       const tamano=(Object.values(aviso.eu_imagene).slice(1,6)).find(im=>im!=null).length
       const urlImagen=pathEntero.slice(27,tamano)
       const urlFinal=url.concat(urlImagen)  
      
      return(

        <div className="row border-bottom" key={aviso.ea_id}>
        <div className="col-md-4 col-sm-12 my-2">
           
           <div className="row justify-content-center">
             
             <img className="rounded border border-light" src={urlFinal} height="114px" width="121px"  alt="..."/>
             
           </div>
           <div className="row justify-content-center">
              <Estrellas puntaje={aviso.ea_valoracion}/> {/*calcula cantidad de estrellas*/}
           </div>
       </div>
       <div className="col-md-8 col-sm-12 my-2">
        <Link  className="row link"  to={path.concat(aviso.ea_id.toString(10))}>
        {aviso.ea_titulo}
        </Link>

        <div className="row" >
        <CurrencyFormat value={aviso.ea_precio} displayType={'text'}
         thousandSeparator={true} prefix={'$'} renderText={value => <h5 className="font-weight-bold" style={{color:"#525252"}}>{value} CLP</h5>} />
        {/* parsea los valores de precio*/}
        </div>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row">{aviso.eu_comuna.ec_nombre}, {aviso.eu_comuna.eu_region.er_nombre}</div>
              <div className="row">{aviso.eu_usuario.eu_universidad.eun_nombre}</div>    
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">Publicación: {aviso.ea_fecha_public}</div>
              <div className="row"></div>
            </div>
          </div>


        
        </div>
       
       
      </div>

   )
   
   }
   )
  }
  
  </div>
  )
//<AvisosColumnas className="d-none" 
//avisosActual={avisosActual}
///>
}

export default Avisos

