import React,{useEffect, useContext, useState} from 'react'
import apisAvisos from '../../apis/apisAvisos'
import { AvisosContext } from '../../context/AvisosContext'
import Paginacion from '../Comun/paginacion'
import BreadCrumb from '../Comun/breadcrumb'
import OrdenarPor from '../Comun/ordenarPor'
import Avisos from './avisos'
import Filtro from './filtro'
import AvisosColumnas from './avisosColumnas'

const ContenedorAvisos=(id)=>{

    const categoria=id.idCategoria
    const {avisos,setAvisos}=useContext(AvisosContext)
    const {originales,setOriginales}=useContext(AvisosContext)//para revertir filtro y ordenarPor
   // const [paginaActual,setPaginaActual]=useState(1) //página actual parte en 1 
   // const [avisosPorPagina]=useState(4) //máximo 4 avisos por página
    const [cambio,setCambio]=useState(1)
    const [alineacion,setAlineacion]=useState({
        clase:'bi bi-grip-vertical',
        vertical:true,
        path: 'M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'

    }


    )

    useEffect(()=>{
        const fetchData= async()=>{            
            try{
                const response=await apisAvisos.get(`${categoria}`) //llamo a la ruta /avisos/:categoria
                setAvisos(response.data.data.todosAvisos)
                setOriginales(response.data.data.todosAvisos)
                
            
            }catch(err){}
        }
        fetchData()
    },[])

    
    useEffect(()=>{
        console.log('recarga')
    },[cambio])

    const cambiarAlineacion=()=>{
        if(alineacion.vertical==true){
            console.log('cambiando a horizontal')
            setAlineacion({
                vertical:false,
                clase:'bi bi-grip-horizontal',
                path:'M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z'
            })
        }
        else{
            console.log('cambiando a vertical')
            setAlineacion({
                vertical:true,
                clase:'bi bi-grip-vertical',
                path: 'M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'

            })
        }

    }
   
    /*
 
    const indiceUltimoAviso=paginaActual*avisosPorPagina 
    const indicePrimerAviso=indiceUltimoAviso-avisosPorPagina
    const avisosActual=avisos.slice(indicePrimerAviso,indiceUltimoAviso)
   
    
    
    const paginacion=(numeroPagina)=>{setPaginaActual(numeroPagina)} //cambia el número de la página actual
    */
    const items=['Inicio','Avisos','Categoría']

    
    return(
        <div className="p-4">
            
        <div className="row mb-3 mt-2">
            <div className="col-md-6 col-sm-12 border-bottom ">
                <BreadCrumb items={items} idCategoria={categoria}/>
            </div>
            <div className="col-md-6 col-sm-12 border-bottom ">
                <div className="row">
                <button  className="col-md-2 btn col-sm-12 border border-primary" type="button" onClick={cambiarAlineacion}>
                    <svg width="30px" height="30px" viewBox="0 0 16 16" className={alineacion.clase} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d={alineacion.path}/>
                    </svg>
                </button>

                <OrdenarPor 
                className="col-md-10 col-sm-12"
                setAvisos={setAvisos}
                avisos={avisos}
                setCambio={setCambio}
                />

                </div>
            </div>
        
        </div>
        
        <div className="row">
         <div className="col-md-4 col-sm-12 mb-4">
         <Filtro  
         setAvisos={setAvisos}
         categoria={categoria}
         avisos={avisos}
         originales={originales}
         /> 
        
         </div>

         <div className="col-md-8 col-sm-12" > 
         <div className="container overflow-auto" style={{maxHeight:"500px"}}>
             {
                 alineacion.vertical?<Avisos avisosActual={avisos}/>:<AvisosColumnas avisosActual={avisos}/>
             }
            
         </div>
          
            {/* 
          <Avisos avisosActual={avisosActual}/>
          <Paginacion 
          avisosPorPagina={avisosPorPagina} 
          totalAvisos={avisos.length} 
          paginacion={paginacion} />
            */}    
         
         </div>

        </div>
        </div>
    )
}

export default ContenedorAvisos
