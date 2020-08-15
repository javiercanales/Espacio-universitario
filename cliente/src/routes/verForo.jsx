import React, {useState} from 'react'
import HiloForo from '../components/Foros/hiloForo'
import { useParams } from "react-router"
import { ForoContextProvider } from '../context/ForoContext'

const VerForo = () => {

    const parametros = useParams()
    const idForo = parametros.id
    
    return(
        <ForoContextProvider>
            <HiloForo id={idForo}/>
        </ForoContextProvider>
    )
}

export default VerForo