import React from 'react'
import ContenedorAvisos from '../components/Avisos/contenedorAvisos'
import { AvisosContextProvider } from '../context/AvisosContext'

const avisosArriendos=()=>{
    return(
        <AvisosContextProvider>
            <ContenedorAvisos idCategoria={'/2'}/>
        </AvisosContextProvider>    
    )

}


export default avisosArriendos