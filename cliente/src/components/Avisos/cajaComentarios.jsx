import React,{useState,useEffect} from 'react'
import apisAvisos from '../../apis/apisAvisos'
import { useForm } from "react-hook-form"
import CargarComentarios from './cargarComentarios'
import CargarValoraciones from './cargarValoraciones'
import moment from 'moment'
const CajaComentarios=({estado,idAviso,idUsuario,comentarios,valoraciones,cont,setCont})=>{
    //recarga para mostrar comentario insertado
    useEffect(()=>{
        console.log('recarga comentarios/valoraciones',cont)
    },[cont])
    //variables para el formulario de valoración
    const {register, errors, handleSubmit} = useForm() 
    
    //variables para el formulario de comentarios
    const {register: register2,
        errors:errors2,
        handleSubmit: handleSubmit2,reset: reset2} = useForm()
    

    const [claseVal,setClaseVal]=useState("row w-100 mb-4 align-top")  
    const [claseFormVal,setClaseFormVal]=useState("container")  
    //estado para manejar puntaje de la valoración
    const [estadoEstrella,setEstadoEstrella]=useState(
        {
            estrellas:[
            {
              valor:false,
              clase:"fa fa-star-o btn btn-link",
              puntaje:0
            },
            {
                valor:false,
                clase:"fa fa-star-o btn btn-link",
                puntaje:0
            },
            {
                valor:false,
                clase:"fa fa-star-o btn btn-link",
                puntaje:0
            },
            {
                valor:false,
                clase:"fa fa-star-o btn btn-link",
                puntaje:0
            }

            ]
        })

        const estrellaInicial={
            estrellas:[
            {
              valor:false,
              clase:"fa fa-star-o btn btn-link",
              puntaje:0
            },
            {
                valor:false,
                clase:"fa fa-star-o btn btn-link",
                puntaje:0
            },
            {
                valor:false,
                clase:"fa fa-star-o btn btn-link",
                puntaje:0
            },
            {
                valor:false,
                clase:"fa fa-star-o btn btn-link",
                puntaje:0
            }

            ]
        }   

    const puntaje=(indice)=>{
        const val=estadoEstrella.estrellas[indice].valor

        if(val==true){ //ya estaba presionada
            let newEstrella =  JSON.parse(JSON.stringify(estadoEstrella)) 
            newEstrella.estrellas[indice].valor=false
            newEstrella.estrellas[indice].clase="fa fa-star-o btn btn-link"
            newEstrella.estrellas[indice].puntaje=0
            setEstadoEstrella(newEstrella)
        }
        else if(val==false)
        {//no estaba presionada
            let newEstrella =  JSON.parse(JSON.stringify(estadoEstrella)) 
            newEstrella.estrellas[indice].valor=true
            newEstrella.estrellas[indice].clase="fa fa-star btn btn-link"
            newEstrella.estrellas[indice].puntaje=1
            setEstadoEstrella(newEstrella)
        }
      

    }  
    
 //console.log("estado estrella",estadoEstrella)
 const [resVal,setResVal]=useState()
 
 const valoracion=(data,e)=>{
 
    //CALCULO DEL PUNTAJE ENVIADO POR EL USUARIO
    const puntaje_valora= estadoEstrella.estrellas[0].puntaje+ 
    estadoEstrella.estrellas[1].puntaje+
    estadoEstrella.estrellas[2].puntaje+
    estadoEstrella.estrellas[3].puntaje;
    const fecha_valora=moment(Date.now()).format('YYYY-MM-DD')
    const comentario_valora=data.valoracion
    //console.log('recibido valoracion',comentario_valora,puntaje_valora,fecha_valora)
     
    if(puntaje_valora>0){
        //DEBE INGRESAR UN PUNTAJE MAYOR A 0
        const fetchData= async()=>{            
            try{
               
                const response=await apisAvisos.post(`/valora`,{
        
                        idUsuario:idUsuario,
                        idAviso:idAviso,
                        comentario:comentario_valora,
                        fecha:fecha_valora,
                        puntaje:puntaje_valora

                }) 
                //console.log('respuesta submit',response.data)
                if (response.data.error==''){
                    setResVal({
                        mensaje:response.data.mensaje,
                        clase:'alert alert-success col-md-12 col-sm-12  mt-3'
                    })

                }
                else{
                    setResVal({mensaje:response.data.error,
                        clase:'alert alert-danger col-md-12 col-sm-12  mt-3'
                    })
                }
                


                const actual=cont+1
                setCont(actual)
                
            }catch(err){}
        }

        fetchData()
        setClaseVal("d-none")
        setClaseFormVal("d-none")
    
    }
    else{
            setResVal({mensaje:'*Debes ingresar un puntaje entre 1-4 estrellas',
            clase:'alert alert-danger col-md-12 col-sm-12 mt-3'
        })
    }
        
        
  setEstadoEstrella(estrellaInicial)
  
  //e.target.reset()


 }




//console.log('cont',cont)
 const comentario=(data,e)=>{
    console.log('recibido comentario',data)
    const fecha_coment=moment(Date.now()).format('YYYY-MM-DD hh:mm:ss')
    const comentario_coment=data.comentario
          
        const fetchData= async()=>{            
            try{
               
                const response=await apisAvisos.post(`/coment`,{
        
                        idUsuario:idUsuario,
                        idAviso:idAviso,
                        comentario:comentario_coment,
                        fecha:fecha_coment
                }) 
                
                const actual=cont+1
                setCont(actual)
                //console.log('respuesta',response)
              
                
            }catch(err){}
        }

        fetchData()
   e.target.reset()
    

 }

if (estado==true){
    
return(
<div className="row d-flex justify-content-center m-4">
    <div className="row d-flex justify-content-center">
        <h5 className="card-title">Valora este anuncio</h5>
    </div>
    <CargarValoraciones valoraciones={valoraciones}/>
    
    
    <div className={claseVal}>
        
            <div className="row w-100 d-flex justify-content-center">
                <h5>Puntaje</h5>
            </div>
                <div className="row w-100 d-flex justify-content-center">
                    <button className={estadoEstrella.estrellas[0].clase} style={{fontSize:"24px"}} onClick={()=>{puntaje(0)}}/>
                    <button className={estadoEstrella.estrellas[1].clase} style={{fontSize:"24px"}}  onClick={()=>{puntaje(1)}}/>
                    <button className={estadoEstrella.estrellas[2].clase} style={{fontSize:"24px"}} onClick={()=>{puntaje(2)}}/>
                    <button className={estadoEstrella.estrellas[3].clase} style={{fontSize:"24px"}} onClick={()=>{puntaje(3)}}/>
                </div>
                
           
        </div>
  
        
    <form className={claseFormVal} onSubmit={handleSubmit(valoracion)}>
    <div className="row">
        <textarea placeholder="Ingresa un comentario a tu valoración..." className="col-12 rounded" id="valoracion" name="valoracion" rows="2" 
        ref={register(
            { required: true, maxLength: 300}
            )
            }/>
             {errors.valoracion && errors.valoracion.type==="required" &&<span className="alert alert-danger col-md-12 col-sm-12 mt-4">*No puedes registrar tu valoración sin un comentario</span>}
             {errors.valoracion && errors.valoracion.type==="maxLength" &&<span className="alert alert-danger col-md-12 col-sm-12 mt-4">*Tu comentario no puede superar los 300 caracteres </span>}

    </div>
    <div className="mt-2 row"> 
        <button type="submit" className="btn btn-block btn-primary disabled">Valorar</button>
    </div>
    </form>
    {resVal&&
    
    <div className={resVal.clase}>{resVal.mensaje}</div> 
    
    }
    </div>
)
}
else if(estado==false){
    return(
        <div className="row d-flex justify-content-center m-4">
            <div className="row">
                <h5 className="col-12 card-title">Deja tus dudas al anunciante</h5>
            </div>
            <CargarComentarios className="container d-flex justify-content-start"  comentarios={comentarios}/>
            <form className="container" onSubmit={handleSubmit2(comentario)}> 
            <div className="row mb-4">
                <textarea className="col-12 rounded" id="comentario" name="comentario" rows="2"
                 ref={register2(
                    { required: true, maxLength: 300}
                    )}/>
            </div>
            
            <div className="row">
                <button type="submit" className="btn btn-block btn-primary disabled">Enviar</button>
            </div>
            
        </form>
        {errors2.comentario && errors2.comentario.type==="required" &&<span className="alert alert-danger col-md-12 col-sm-12 mt-4">*Tu comentario está vacío, vuelve a intentarlo</span>}
             {errors2.comentario && errors2.comentario.type==="maxLength" &&<span className="alert alert-danger col-md-12 col-sm-12 mt-4">*Tu comentario no puede superar los 300 caracteres</span>}

        </div>
    )
}


}


export default CajaComentarios