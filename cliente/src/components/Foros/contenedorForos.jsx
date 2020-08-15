import React, { useEffect } from "react"
import { useContext } from "react"
import apisForos from "../../apis/apisForos"
import { useState } from "react"
import Paginacion from "./paginacionForos"
import BreadCrumb from "../Comun/breadcrumb"
import OrdenarForos from "./ordenarForos"
import Filtro from "./filtro"
import Foros from "./foros2"
import 'react-toastify/dist/ReactToastify.css'
import { Link } from "react-router-dom"

const items = ["Inicio", "Foros"]

const ContenedorForos = () => {
  const [foros, setForos] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [forosPorPagina] = useState(9)
  const [forosOriginal, setForosOriginal] = useState([])
  const [cambio, setCambio]=useState(1)
  const [fondo,setFondo]=useState("#303235")

  //Sin datos asociados: Permite actualizar datos en el renderizado general del componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apisForos.get("/")
        console.log(response)
        setForos(response.data.data.todosForos.rows)
        setForosOriginal(response.data.data.todosForos.rows)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  //Con datos asociados: Permite actualizar cuando el dato asociado vea cambiado su estado
  useEffect(() => {
    console.log('recarga')
  },[cambio])

  const indiceUltimoForo = paginaActual * forosPorPagina
  const indicePrimerForo = indiceUltimoForo - forosPorPagina
  const forosActual = foros.slice(indicePrimerForo, indiceUltimoForo)

  //Este método permite paginar la lista de foros
  //Esto es posible porque el método es pasado como parámetro a Paginación
  const paginacion = (numeroPagina) => {
    setPaginaActual(numeroPagina)
  }

  /**
   * Función para filtrar los foros desplegados según información indicada
   * @param {*} idCategoria   : id de la categoría o tema del foro a filtrar
   * @param {*} estado        : estado activo o inactivo (true o false) a filtrar
   * @param {*} palabrasClave : palabras clave en el título del foro para filtrar
   */
  const filtrador = (idCategoria, estado, palabrasClave) => {
    console.log("idcat: "+idCategoria +" estado: "+estado)
    
    //Caso: no viene nada que filtrar
    if(idCategoria == "Seleccionar..." && estado == "Seleccionar..." && palabrasClave == "") {
      setForos(forosOriginal)
    }
    //Caso: sólo vienen palabras clave
    else if(idCategoria == "Seleccionar..." && estado == "Seleccionar...") {
      setForos(forosOriginal.filter(foro => {
        return foro.ef_titulo.toLowerCase().includes(palabrasClave.toLowerCase())
      }))
    }
    //Caso: sólo viene categoría
    else if(estado == "Seleccionar..." && palabrasClave == "") {
      setForos(forosOriginal.filter(foro => {
        return foro.ef_id_tema == idCategoria
      }))
    }
    //Caso: sólo viene estado
    else if(idCategoria == "Seleccionar..." && palabrasClave == "") {
      setForos(forosOriginal.filter(foro => {
        if (estado == "true") {
          return foro.ef_estado
        } else {
          return !foro.ef_estado
        }
      }))
    }
    //Caso: viene estado y palabras clave
    else if(idCategoria == "Seleccionar...") {
      setForos(forosOriginal.filter(foro => {
        if (estado == "true") {
          return foro.ef_estado && foro.ef_titulo.toLowerCase().includes(palabrasClave.toLowerCase())
        } else {
          return !foro.ef_estado && foro.ef_titulo.toLowerCase().includes(palabrasClave.toLowerCase())
        }
      }))
    }
    //Caso: viene categoría y palabras clave
    else if(estado == "Seleccionar...") {
      setForos(forosOriginal.filter(foro => {
        return foro.ef_id_tema == idCategoria && foro.ef_titulo.toLowerCase().includes(palabrasClave.toLowerCase())
      }))
    }
    //Caso: viene categoría y estado
    else if(palabrasClave == "") {
      setForos(forosOriginal.filter(foro => {
        if (estado == "true") {
          return foro.ef_id_tema == idCategoria && foro.ef_estado
        } else {
          return foro.ef_id_tema == idCategoria && !foro.ef_estado
        }
      }))
    }
    //Caso: viene todo
    else {
      setForos(forosOriginal.filter(foro => {
        if (estado == "true") {
          return foro.ef_id_tema == idCategoria && foro.ef_estado && foro.ef_titulo.toLowerCase().includes(palabrasClave.toLowerCase())
        } else {
          return foro.ef_id_tema == idCategoria && !foro.ef_estado && foro.ef_titulo.toLowerCase().includes(palabrasClave.toLowerCase())
        }
      }))
    }
    console.log(foros)
  }

  return (
    <div>
      <div className="row mb-3 mt-3">
        <div className="col-md-4 col-sm-4 border-bottom ">
          <BreadCrumb items={items} />
        </div>
        <div className="col-md col-sm-4 border-bottom ">
          <Link to="/foros/crear" className="btn btn-md text-white p-2" style={{backgroundColor:fondo}}>
            Crear Foro
          </Link>
        </div>
        
        <div className="col-md-7 col-sm-3 border-bottom ">
          <OrdenarForos
            foros={foros}
            setForos={setForos}
            setCambio={setCambio}
          />
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-3 col-sm-12">
          <Filtro
            filtrador={filtrador}
          />
        </div>
        <div className="col-md-9 col-sm-12">
          <Foros
            foros={forosActual}
          />
          <Paginacion
            forosPorPagina={forosPorPagina}
            totalForos={foros.length}
            paginacion={paginacion}
          />
        </div>
      </div>
    </div>
  )
}

export default ContenedorForos
