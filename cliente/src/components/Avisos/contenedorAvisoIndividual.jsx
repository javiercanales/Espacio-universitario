import React,{useEffect,useState} from 'react'
//import { AvisoIndividualContext } from '../../context/AvisoIndividualContext'
import apisAvisos from '../../apis/apisAvisos'
import CurrencyFormat from 'react-currency-format'
import { Link } from "react-router-dom"
import Comentarios from './comentarios'
import Carousel from './carousel'
import Estrellas from './estrellas'


const ContenedorAvisoIndividual=(props)=>{
    const idUsuario=1 //ID USUARIO FIJO
    const id=props.idAviso
    const [aviso,setAviso]=useState()
    const [cont,setCont]=useState(0)
    useEffect(()=>{
        
        const fetchData= async()=>{            
            try{
               
                const response=await apisAvisos.get(`/rev/${id}`) //llamo a la ruta /avisos/:categoria
                console.log('respuesta avisos',response)
                setAviso(Object.values(response.data.data.aviso)[0])
            
            }catch(err){}
        }
        fetchData()
    },[cont])
    
    console.log('recarga contenedor avisos')

    let imagenes
     ,titulo
     ,descripcion
     ,nombre
     ,apellido_pat
     ,apellido_mat
     ,correo
     ,valoracion_usuario
     ,valoracion_anuncio
     ,region
     ,comuna
     ,precio
     ,publicacion
     ,expiracion
     ,comentarios
     ,valoraciones
    if(aviso){
        valoraciones=Object.values(aviso.eu_valora_avisos)
        comentarios=Object.values(aviso.eu_comenta_avisos)
        console.log('comentarios enviados',comentarios)
        console.log('valoraciones enviadas',valoraciones)
        imagenes= Object.values(aviso.eu_imagene) 
        imagenes.splice(0,1)
        nombre=Object.values(aviso.eu_usuario.eus_nombre)
        apellido_pat=Object.values(aviso.eu_usuario.eus_apellido_pat)
        apellido_mat=Object.values(aviso.eu_usuario.eus_apellido_mat)
        correo=Object.values(aviso.eu_usuario.eus_correo)
        if(aviso.eu_usuario.eus_valoracion==null){
            valoracion_usuario=0
        }
        else{
            valoracion_usuario=Object.values(aviso.eu_usuario.eus_valoracion)
        
        }

        valoracion_anuncio=aviso.ea_valoracion
        titulo=Object.values(aviso.ea_titulo)
        descripcion=Object.values(aviso.ea_descrip)
        region=Object.values(aviso.eu_comuna.eu_region.er_nombre)
        comuna=Object.values(aviso.eu_comuna.ec_nombre)
        precio=aviso.ea_precio

        publicacion=Object.values(aviso.ea_fecha_public)
        expiracion=Object.values(aviso.ea_fecha_expir)
        

        
    }
        return(
            <div className="container">
            <div className="row mt-4">
                <div className="col-md-6 col-sm-12">
                    <div className="col-md-12 col-sm-12">
                        <div className="row h-50 mb-4">
                            <div className="col-md-12 col-sm-12">
                              <Carousel imagenes={imagenes}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="row d-flex justify-content-center">
                                    {nombre} {apellido_pat} {apellido_mat} 
                                </div>
                                <div className="row d-flex justify-content-center">
                                    <Estrellas puntaje={valoracion_anuncio}/>
                                </div>
                                <div className="btn btn-link row d-flex justify-content-center"> 
                                {correo}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    </div>

                    <div className=" col-md-6 col-sm-12 px-4 mb-4">
                        <div className="row d-flex justify-content-center">
                            <h1>{titulo}</h1>
                            </div>
                        <div className="row d-flex justify-content-center mb-4">
                        <Estrellas puntaje={valoracion_anuncio}/>
                        </div>
                        <div className="row border-bottom p-2 d-flex justify-content-center font-weight-bold"
                        style={{color:"#525252"}}
                        >
             
                        <CurrencyFormat value={precio} displayType={'text'}
                        thousandSeparator={true} prefix={' $ '} renderText={value => <h4 >{value} CLP</h4>} />
                        
                        </div>
                        <div className="row border-bottom p-2"><h5>{descripcion}</h5></div>
                        
                        <div className="row border-bottom p-2">{comuna}, {region}</div>
                    
                        <div className="row d-flex justify-content-end p-2 font-italic text-secondary" >Finaliza el {expiracion}
                        </div>
                        

                    </div>
                </div>
            <div className="row">
            <div className="col-6 mb-4"></div>
                <div className="col-md-6 col-sm-12 mb-4">
                    <Comentarios idAviso={id} 
                    idUsuario={idUsuario}
                    comentarios={comentarios}
                    valoraciones={valoraciones}
                    cont={cont}
                    setCont={setCont}
                    /></div>
            </div>
        </div>
  
           
        )
    
   

}


export default ContenedorAvisoIndividual