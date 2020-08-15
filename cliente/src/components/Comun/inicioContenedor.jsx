import React,{useEffect,useContext,useState} from 'react'
import apisInicio from '../../apis/apisInicio'
import { AvisosContext } from '../../context/AvisosContext'
import AvisosUltimos from '../Avisos/ultimosAvisos'

const InicioContenedor=()=>{
    //const {avisos,setAvisos}=useContext(AvisosContext)
 ///para pintar los últimos avisos
 const {avisos,setAvisos}=useContext(AvisosContext)

 useEffect(()=>{
    const fetchData= async()=>{            
        try{
            const response=await apisInicio.get("/")
            setAvisos(response.data.data.todosAvisos)
        }catch(err){}
    }
    fetchData()
},[])


if(avisos){
    console.log('avisos',avisos)
}

return(
    
    <div >
       {avisos?<AvisosUltimos avisos={avisos}/>:<div></div>}
    </div>
    
    
)


}

export default InicioContenedor
