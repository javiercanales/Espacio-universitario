import React from 'react'
import { useForm } from "react-hook-form"

const OrdenarPor=({setAvisos,avisos,setCambio})=>{
    const {register, errors,handleSubmit} = useForm() //para manejar el formulario

    const ordenar=(data,e)=>{
        console.log('envío',avisos)
        const opcion=data.id_sort
        if(opcion==1){
            //+recientes
            const ordenados=avisos.sort(function (a, b) {
                    if (a.ea_fecha_public> b.ea_fecha_public) {
                    return -1
                    }
                    if (a.ea_fecha_public < b.ea_fecha_public) {
                    return 1
                    }
                    return 0
                })
            setAvisos(ordenados)
            setCambio(opcion)
            //console.log('ordenados más recientes',avisos)
        }
        else if (opcion==2){
            //+antiguos
            
            const ordenados=avisos.sort(function (a, b) {
                if (a.ea_fecha_public> b.ea_fecha_public) {
                    return 1
                }
                if (a.ea_fecha_public < b.ea_fecha_public) {
                    return -1
                }
                return 0
            })
            setAvisos(ordenados)
            setCambio(opcion)
            //console.log('ordenados más antiguos',avisos)

        }
        else if (opcion==3){
            //+caros
            
            const ordenados=avisos.sort(function (a, b) {
                return b.ea_precio-a.ea_precio
            })
            setAvisos(ordenados)
            setCambio(opcion)

        }
        
        else if (opcion==4){
           // console.log('menor precio',avisos)
           const ordenados=avisos.sort(function (a, b) {
            
            return a.ea_precio- b.ea_precio
        })
           setAvisos(ordenados)
           setCambio(opcion)

        }
        else if (opcion==5){
            //console.log('calificación',avisos)
            const ordenados=avisos.sort(function (a, b) {
               //para ordenar números es a-b asc, b-a desc
                return b.ea_valoracion-a.ea_valoracion
            })
            setCambio(opcion)
        }
        
    }

  

    return(
        <form  className="form col-10 d-flex justify-content-end">
            <label className="col-md-3 col-sm-4" htmlFor="id_sort">Ordenar por</label>
            <select onChange={handleSubmit(ordenar)} ref={register} className="custom-select col-sm-8 col-md-4 ml-0" name="id_sort" id="id_sort" >
                        <option defaultValue>Seleccionar...</option>    
                        <option value="1">Más recientes</option>
                        <option value="2">Más antiguos</option>
                        <option value="3">Mayor precio</option>
                        <option value="4">Menor precio</option>
                        <option value="5">Mejor calificación</option>
                    </select>
      </form>
    )

}

export default OrdenarPor