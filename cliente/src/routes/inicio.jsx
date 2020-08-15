import React from 'react'
import InicioContenedor from '../components/Comun/inicioContenedor'
import { AvisosContextProvider } from '../context/AvisosContext'


const Inicio=()=>{
return(
    <AvisosContextProvider>
    <InicioContenedor />
    </AvisosContextProvider>

)


}

export default Inicio
