import React from 'react'
import ContenedorAvisoIndividual from '../components/Avisos/contenedorAvisoIndividual'
import { useParams} from "react-router"
import { AvisoIndividualContextProvider } from '../context/AvisoIndividualContext'

const AvisoIndividual=()=>{
    const parametros=useParams()
    const idAviso=parametros.id
    
    return(
        <AvisoIndividualContextProvider>
            <ContenedorAvisoIndividual idAviso={idAviso}/>
        </AvisoIndividualContextProvider>

    )

}


export default  AvisoIndividual