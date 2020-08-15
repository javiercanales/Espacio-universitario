import React, { useState }from "react"
import { useForm } from "react-hook-form"

const Filtro = ({filtrador}) => {
  const { register, handleSubmit, errors } = useForm()
  const [fondo,setFondo]=useState("#303235")

  const handleCategoria = (event) => {
    console.log(event.target.value)
    //filtracion(event.target.value)
  }
  const onSubmit = (filtro, event) => {
    filtrador(filtro.idCategoria, filtro.estado, filtro.palabrasClave)
    console.log(filtro)
    event.target.reset()
  }

  return (
    <div className="container card">
      <div className="card-header bg-transparent" align="center">Filtros</div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <div className="form-group" align="center">
              <label htmlFor="id_region">Categoría</label>
              <select className="custom-select my-1 mr-sm-2" id="cat" name="idCategoria" ref={register}>
                <option defaultValue>Seleccionar...</option>
                <option value="1">Tecnología</option>
                <option value="2">Educación</option>
                <option value="3">Comida</option>
                <option value="4">Ocio</option>
                <option value="5">Deporte</option>
              </select>
            </div>
            <div className="form-group" align="center">
              <label htmlFor="id_comuna">Estado</label>
              <select className="custom-select my-1 mr-sm-2" name="estado" ref={register}>
                <option defaultValue>Seleccionar...</option>
                <option value="true">Activo</option>
                <option value="false">Cerrado</option>
              </select>
            </div>
            <div className="form-group" align="center">
              <label htmlFor="id_comuna">Palabras clave</label>
              <input
                name="palabrasClave"
                className="form-control mr-sm-2"
                type="search"
                placeholder="¿Qué buscas?"
                aria-label="Search"
                ref={register}
              />
            </div>
            <div className="form-group" align="center">
              <button className="btn text-white btn-block" type="submit" style={{backgroundColor:fondo}}>
                Buscar
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Filtro
