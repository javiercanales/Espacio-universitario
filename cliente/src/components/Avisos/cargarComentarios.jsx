import React from 'react'
import moment from 'moment'
import Moment from 'react-moment';

const CargarComentarios=({comentarios})=>{
    let fecha
    return(
        <div className="container overflow-auto border mb-4 rounded" style={{maxHeight:"120px"}}>
        { comentarios  &&comentarios.map((com,i)=>{
            return(
            
            <div className="row  ml-1 border-bottom font-italic" key={i}>
                <div className="row ">
                <div className="col-md-7 col-sm-6 d-flex justify-content-start btn-link">{com.eu_usuario.eus_correo} </div>
               <div className="col-md-5 col-sm-6 ml-n2 text-secondary">comentó :</div>   
                </div>
                 
               
            <div className="row w-100">
                <div className="col-md-12 col-sm-12 d-flex justify-content-start">
                {com.eco_comentario}
                </div>
               
            </div>
            
            <div className="row w-100">
            <Moment date={com.eco_fecha_com} className="col-md-12 col-sm-12 d-flex justify-content-end text-secondary" format="DD-MM-YYYY HH:mm:ss"/>

            </div>
                
            
            
            </div>
            
            
            
            )
            })
        
        
        }
        </div>
        )
        





}


export default CargarComentarios