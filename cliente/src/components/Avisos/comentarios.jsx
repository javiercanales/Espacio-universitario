import React,{useState} from 'react'
import { useForm } from "react-hook-form"
import CajaComentarios from './cajaComentarios'
const Comentarios=({idAviso,idUsuario,comentarios,valoraciones,cont,setCont})=>{
    const [estadoValora,setEstadoValora]=useState(false)
    const [claseComenta,setClaseComenta]=useState("nav-link active")
    const [claseValora,setClaseValora]=useState("nav-link")


    //formulario valoración
    const {register: register2,
        handleSubmit: handleSubmit2} = useForm()

    //actualiza estado caja

    const activaComentario=(e)=>{
        setClaseComenta("nav-link active")
        setClaseValora("nav-link")
        setEstadoValora(false)
    }
    const activaValoracion=(e)=>{
       setEstadoValora(true)
        setClaseComenta("nav-link")
        setClaseValora("nav-link active")

    }

    

   

    //console.log('estado',estadoValora)
    return(

    <div className="card text-center border">
        <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
                    <div className="row">
                        <li className="nav-item col-5 mr-n1">
                            <button onClick={activaComentario} type="submit" name="bt_1" className={claseComenta}
                            ref={register2}
                            >Preguntas</button>
                        </li>
                        <li className="nav-item col-3 ml-n2">
                            <button  onClick={activaValoracion} type="submit" name="bt_2" className={claseValora}
                            ref={register2}
                            >Valoraciones</button>
                        </li>
                    </div>

        
            </ul>
        </div>
               <CajaComentarios estado={estadoValora} 
               idAviso={idAviso} 
               idUsuario={idUsuario}
               comentarios={comentarios}
               valoraciones={valoraciones}
               cont={cont}
               setCont={setCont}
               />  
    </div>
    )


}


export default Comentarios