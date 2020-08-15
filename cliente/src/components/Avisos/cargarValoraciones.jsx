import React from 'react'
import Estrellas from './estrellas'

const CargarValoraciones=({valoraciones})=>{



return(
<div className="container overflow-auto border mb-4 rounded" style={{maxHeight:"120px"}}>
{ valoraciones  &&valoraciones.map((val,i)=>{
    //console.log('val',val,'com',Object.values(val))
    return(
    
    <div className="col-12 border-bottom" key={i}>

    <div className="row">
        <div className="col-4"> 
        
        <Estrellas  puntaje={val.eva_valorac}/>
        </div>
        <div className="col-8 font-italic">{val.eva_comentario}</div>
    </div>
    <div className="row">
        <div className="col-6">        
        <div className="row btn-link">{val.eu_usuario.eus_correo}</div>
        </div>
        <div className="col-6">
        <div className="row d-flex justify-content-end text-secondary font-italic">{val.eva_fecha_valorac}</div>

        </div>

    </div>

    </div>
    
    
    
    )
    })


}
</div>
)

}


export default CargarValoraciones