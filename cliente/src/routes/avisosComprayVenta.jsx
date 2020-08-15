import React from 'react'
import ContenedorAvisos from '../components/Avisos/contenedorAvisos'
import { AvisosContextProvider } from '../context/AvisosContext'

const avisosComprayVenta =()=>{
    return(
        <AvisosContextProvider>
            <ContenedorAvisos idCategoria={'/3'}/>
        </AvisosContextProvider>    
    )

}


export default avisosComprayVenta