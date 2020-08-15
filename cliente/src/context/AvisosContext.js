import React,{useState,createContext} from 'react'
export const AvisosContext=createContext()
//Context provee una forma de pasar datos a través del árbol de componentes 
//sin tener que pasar props manualmente en cada nivel.

//Context proporciona una forma de compartir valores como 
//estos entre componentes sin tener que pasar explícitamente un prop a 
//través de cada nivel del árbol.

//Context está diseñado para compartir datos que pueden considerarse “globales” para un árbol de componentes en React,
// como el usuario autenticado actual, el tema o el idioma preferido. 
export const AvisosContextProvider=props=>{

    const [avisos,setAvisos]=useState([])
    const [filtros,setFiltros]=useState([])
    const [originales,setOriginales]=useState([])
    const [aviso,setAviso]=useState([])
    
    return(
        <AvisosContext.Provider value={{avisos,setAvisos,filtros,setFiltros,originales,setOriginales,aviso,setAviso}}>
            {props.children}
        </AvisosContext.Provider>
    )

}