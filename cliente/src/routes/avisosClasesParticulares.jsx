import React from 'react'
import ContenedorAvisos from '../components/Avisos/contenedorAvisos'
import { AvisosContextProvider } from '../context/AvisosContext'


const avisosClasesParticulares =()=>{
    return(
        <AvisosContextProvider>
            <ContenedorAvisos idCategoria={'/1'}/>
        </AvisosContextProvider>    
    )

}


export default avisosClasesParticulares