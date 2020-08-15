import React,{useState,createContext} from 'react'
export const FiltrosContext=createContext()

export const FiltrosContextProvider=props=>{

    const [filtros,setFiltros]=useState([])
    return(
        <FiltrosContext.Provider value={{filtros,setFiltros}}>
            {props.children}
        </FiltrosContext.Provider>
    )

}