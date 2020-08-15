import React from 'react'
import ContenedorAvisos from '../components/Avisos/contenedorAvisos'
import { AvisosContextProvider } from '../context/AvisosContext'

const avisosTrueques =()=>{
    return(
        <AvisosContextProvider>
            <ContenedorAvisos idCategoria={'/4'}/>
        </AvisosContextProvider>
    )
}

export default avisosTrueques