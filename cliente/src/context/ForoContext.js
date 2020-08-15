import React,{useState,createContext} from 'react'
export const ForoContext=createContext()
//Context provee una forma de pasar datos a través del árbol de componentes 
//sin tener que pasar props manualmente en cada nivel.

//Context proporciona una forma de compartir valores como 
//estos entre componentes sin tener que pasar explícitamente un prop a 
//través de cada nivel del árbol.

//Context está diseñado para compartir datos que pueden considerarse “globales” para un árbol de componentes en React,
// como el usuario autenticado actual, el tema o el idioma preferido. 
export const ForoContextProvider=props=>{

    const [comentariosForo,setComentariosForo]=useState([])
    
    return(
        <ForoContext.Provider value={{comentariosForo,setComentariosForo}}>
            {props.children}
        </ForoContext.Provider>
    )

}