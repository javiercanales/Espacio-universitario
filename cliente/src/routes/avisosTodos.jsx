import React from 'react'
import ContenedorAvisos from '../components/Avisos/contenedorAvisos'
import { AvisosContextProvider } from '../context/AvisosContext'

const avisosTodos =()=>{
    return(
        <AvisosContextProvider>
            <ContenedorAvisos idCategoria={'/'}/>
        </AvisosContextProvider>    
    )

}


export default avisosTodos