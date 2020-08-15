import React,{useEffect,useContext,useState }  from 'react'
import { useForm } from "react-hook-form"
import { AvisosContext } from '../../context/AvisosContext'
import apisAvisos from '../../apis/apisAvisos'
import SelectDependiente from './selectDependiente'


const Filtro=({setAvisos,avisos,originales})=>{
    //consultando datos filtros
    //console.log('avisos recibidos',avisos,'originales',originales)
    const {filtros,setFiltros}=useContext(AvisosContext) //para cargar parámetros del form
 
    const {register, handleSubmit} = useForm() //para manejar el formulario
    
    const [cancel,setCancel]=useState() //para poder limpiar el formulario con el botón limpiar filtros
    useEffect(()=>{
        const fetchFiltros= async()=>{            
            try{
                const response=await apisAvisos.get('/filtros') 
                setFiltros(response.data.data)
                //console.log(filtros)
            }catch(err){}
        }
        fetchFiltros()
    },[])

    let regiones
        ,comunas
        ,universidades 

    //cargando los datos para los selects
    if(filtros){
        Object.values(filtros).map(filtro=>{
        comunas=filtro.comunas
        regiones=filtro.regiones
        universidades=filtro.universidades
        })
    }

    
    /* Esto serviría si quiero dos forms diferentes en un mismo componente
     const {register: register2,
        errors:errors2,
        handleSubmit: handleSubmit2,reset: reset2} = useForm()
    */
    const [idRegion,setIdRegion]=useState(false) //para detectar región seleccionada y cargar comunas
    
    const [fondo,setFondo]=useState("#FFFFFF")
    const filtrado = (data,e) => {
        //console.log('avisos',avisos)
        //console.log('entro a filtros',data)
        if(cancel==true){
            //console.log('usuario quitó los filtros')
            setAvisos(originales) //se vuelve a tener los avisos originales sin filtro
            e.target.reset() //se limpian los campos

            
        }
        else{
            //console.log('usuario aplicó filtros')
            
            let resultado
            if(data.id_comuna!="" && data.id_region!="" && data.id_univ==""){
                if(data.palabras_claves!=''){
                    resultado=Object.values(avisos).filter(aviso=>(aviso.ea_id_comuna==data.id_comuna &&
                        aviso.ea_titulo.toLowerCase().includes(data.palabras_claves.toLowerCase())
                        ))
                }
                else{
                    resultado=Object.values(avisos).filter(aviso=>(aviso.ea_id_comuna==data.id_comuna))

                }
                
                setAvisos(resultado) //envío de vuelta los datos filtrados
                //console.log('solo comuna')
            }
            else if(data.id_region!=="" && data.id_comuna===""  && data.id_univ===""){
                if(data.palabras_claves!=''){
                    resultado=Object.values(avisos).filter(aviso=>(aviso.eu_comuna.eu_region.er_id==data.id_region
                        && aviso.ea_titulo.toLowerCase().includes(data.palabras_claves.toLowerCase())
                        ))

                }
                else{
                    resultado=Object.values(avisos).filter(aviso=>(aviso.eu_comuna.eu_region.er_id==data.id_region))

                }
                setAvisos(resultado) //envío de vuelta los datos filtrados
                //console.log('solo región')
            }
            else if(data.id_region==="" && data.id_comuna==="" && data.id_univ!==""){
                if(data.palabras_claves!=''){
                    resultado=Object.values(avisos).filter(aviso=>(aviso.eu_usuario.eu_universidad.eun_id==data.id_univ  
                        &&aviso.ea_titulo.toLowerCase().includes(data.palabras_claves.toLowerCase())
                        ))
                
                }
                else{
                    resultado=Object.values(avisos).filter(aviso=>(aviso.eu_usuario.eu_universidad.eun_id==data.id_univ))
                }
                setAvisos(resultado) //envío de vuelta los datos filtrados
                //console.log('solo universidad')

            }
            else if( data.id_comuna!=="" && data.id_univ!=="" && data.id_region!==""){
                if(data.palabras_claves!=''){
                    resultado=Object.values(avisos).filter(aviso=>(aviso.ea_id_comuna==data.id_comuna &&
                        aviso.eu_usuario.eu_universidad.eun_id==data.id_univ
                        &&aviso.ea_titulo.toLowerCase().includes(data.palabras_claves.toLowerCase())
                        ))
                }
                else{
                    resultado=Object.values(avisos).filter(aviso=>(aviso.ea_id_comuna==data.id_comuna &&
                        aviso.eu_usuario.eu_universidad.eun_id==data.id_univ))
                }
              
                setAvisos(resultado) //envío de vuelta los datos filtrados
                //console.log('comuna + universidad')
            }
            else if(data.id_comuna==="" && data.id_region!=="" && data.id_univ!==""){
                if(data.palabras_claves!=''){
                    resultado=Object.values(avisos).filter(aviso=>(aviso.eu_comuna.eu_region.er_id==data.id_region &&
                        aviso.eu_usuario.eu_universidad.eun_id==data.id_univ
                        &&aviso.ea_titulo.toLowerCase().includes(data.palabras_claves.toLowerCase())
                        ))

                }
                else{
                    resultado=Object.values(avisos).filter(aviso=>(aviso.eu_comuna.eu_region.er_id==data.id_region &&
                        aviso.eu_usuario.eu_universidad.eun_id==data.id_univ))
                }
                
                setAvisos(resultado) //envío de vuelta los datos filtrados
                //console.log('region + universidad')


            }
        
            else if( data.id_comuna=="" && data.id_univ=="" && data.id_region=="" ){
                if(data.palabras_claves!=""){
                    resultado=Object.values(avisos).filter(aviso=>(aviso.ea_titulo.toLowerCase().includes(data.palabras_claves.toLowerCase())))
                    setAvisos(resultado) 
                }
                else{
                    setAvisos(originales) //se vuelve a tener los avisos originales sin filtro
                    e.target.reset() //se limpian los campos
                }
                
                

            }


        }
        setCancel(false) //cambio el estado para no volver a limpiar
    }


    const activarReset=(e)=>{
        //Con esto activo puedo hacer que se eliminen los filtros
        setCancel(true)
    }

    
    //actualizando el id de la región seleccionada para filtrar las comunas correspondientes
    const regionSeleccionada=(event)=>{
       setIdRegion(event.target.value)
    }


    return(
        
            <div id="filtro" name="filtro" className="container card d-flex justify-content-center" style={{backgroundColor:fondo}}> 
                <div className="card-header bg-transparent d-flex justify-content-center">Filtros
                </div>

                <div className="card-body border-bottom w-100">
                    <form onSubmit={handleSubmit(filtrado)} className="form-inline d-flex justify-content-center">
                    <fieldset>
                        
                    <div className="row form-group d-flex justify-content-center mb-3">
                        <input style={{backgroundColor:fondo}} id="palabras_claves" name="palabras_claves" 
                        className="row w-100 form-control" type="search" 
                        placeholder="Palabras contenidas en el título" 
                        aria-label="Search"
                        defaultValue=""
                        
                        ref={register} />
                    </div>
                
                    <div className="row form-group d-flex justify-content-center mb-3">
                        <label htmlFor="id_region" className="mb-2">Región</label>
                        <select style={{backgroundColor:fondo}} style={{backgroundColor:fondo}} onChange={regionSeleccionada} className="custom-select row w-100" 
                        id="id_region" name="id_region" ref={register}
                       
                        >
                            <option style={{backgroundColor:fondo}} style={{backgroundColor:fondo}} value="" defaultValue>Seleccionar...</option>
                          {regiones &&regiones.map(region=>{
                                return(
                                    <option value={region.er_id} key={region.er_id}>{region.er_nombre}</option>
                                )
                            })
    
                            }
                            
                         
                           
                        </select>
                    </div>
                    <div className="row form-group d-flex justify-content-center mb-3">
                    <label htmlFor="id_comuna" className="mb-2">Comuna</label>
                    <SelectDependiente fondo={fondo} data={comunas} idregion={idRegion} label={"id_comuna"} name="id_comuna" register={register}/>
                     </div>  

                    <div className="row form-group d-flex justify-content-center mb-3">
                        <label htmlFor="id_univ" className="mb-2">Universidad</label>
                        <select  className="custom-select row w-100" 
                        id="id_univ" name="id_univ" ref={register}>
                            <option value="" defaultValue>Seleccionar...</option>
                            {universidades && universidades.map(universidad=>{
                                return(
                                    <option value={universidad.eun_id} key={universidad.eun_id}>{universidad.eun_nombre}</option>
                                )
                            })
    
                            }
                        </select>
                    </div>
                    <div className="card-footer bg-transparent row">
                    <button type="submit" value="submit" className="btn btn-primary btn-block disabled">Filtrar</button>
                    <button onClick={activarReset} type="submit" value="cancel" type="cancel" className="btn btn-secondary btn-block">Limpiar Filtros</button>
                    </div>
                    
                    </fieldset>
    
                    </form>
    
                </div>
                </div>
                        
          

      
    )

}


export default Filtro

 