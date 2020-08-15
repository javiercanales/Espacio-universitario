import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import BreadCrumb from "../Comun/breadcrumb"
import axios from "axios"
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from "react-router-dom"
import vocabulario from "./palabrasProhibidas"

const items = ["Inicio", "Foros", "Generar tema"]

const CrearForo = () => {
  const { register, handleSubmit, errors } = useForm()
  let history = useHistory()
  const [fondo,setFondo]=useState("#303235")

  const onSubmit = (data, event) => {
    document.getElementById("alerta").hidden = true
    document.getElementById("alertaDescrip").hidden = true
    document.getElementById("alertaCateg").hidden = true
    console.log(data)
    //Se verifica si existen palabras groseras, obsenas... prohibidas, según un vocabulario dado
    let existenProhibidasTitulo = verificarPalabras(data.titulo)
    let existenProhibidasDescrip = verificarPalabras(data.descripcion)
    let seleccionarVacio = false
    if(data.idCategoria == ""){
      seleccionarVacio = true
    }
    if(existenProhibidasTitulo) {
      document.getElementById("alerta").hidden = false
    } else if(seleccionarVacio) {
      document.getElementById("alertaCateg").hidden = false
    } else if(existenProhibidasDescrip) {
      document.getElementById("alertaDescrip").hidden = false
    } else {
      axios
      .post("http://146.83.198.35:1074/back/foros/", {
        idCategoria: data.idCategoria,
        titulo: data.titulo,
        descripcion: data.descripcion
      })
      .then((response) => {
        toast.success(response.data.status, {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        })
        history.push("/foros")
      })
      .catch((err) => {
        toast.error("Ha ocurrido un error. Intente nuevamente.", {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        })
        event.target.reset()
      })
    }
  }

  const verificarPalabras = (texto) => {
    let cont = 0
    for(var i=0; i<vocabulario.length; i++) {
      if(texto.toLowerCase().includes(vocabulario[i])) {
        cont++
      }
    }
    return cont == 0 ? false : true
  }

  
  return (
    <div>
      <div>
        <div className="row mb-2 mt-2">
          <div className="col-md col-sm border-bottom ">
            <BreadCrumb items={items} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <div className="card">
              <div className="card-header">
                <img src="/images/user.png" width="45" height="45" className="mr-2"/>
                Mi cuenta
              </div>
              <div className="card-body">
                <div className="nav flex-column border-bottom">
                  <a className="nav-item mb-2">Perfil de usuario</a>
                  <a className="nav-link disabled" href="#">Datos</a>
                  <a className="nav-link mb-3 disabled" href="#">Modificar contraseña</a>
                </div>
                <div className="nav flex-column mt-3">
                  <a className="nav-item mb-2">Avisos</a>
                  <Link className="nav-link" to="/avisos/misAvisos">Mis Publicaciones</Link>
                  <a className="nav-link disabled" href="#">Preguntas</a>
                  <a className="nav-link disabled" href="#">Valoraciones</a>
                </div>
              </div>
              <div className="card-footer">
                <a className="nav-link disabled" href="#">Cerrar sesión</a>
              </div>
            </div>
          </div>

          <div className="col-md-9 col-sm-12 mb-2">
            <div className="card">
              <h4 className="card-header text-white" style={{backgroundColor: fondo}}>
                Crear nuevo tema de discusión en Foros
              </h4>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">
                      Título
                    </label>
                    <span className="font-weight-bold text-danger">*</span>
                    <input
                      type="text"
                      className="form-control"
                      id="titulo"
                      name="titulo"
                      placeholder="Ingrese aquí un título para su espacio/temática"
                      ref={register}
                      minLength="10"
                      maxLength="80"
                      required
                    />
                    <div hidden className="alert alert-warning" role="alert" id="alerta">
                      Por favor, verifica tu título, tiene palabras prohibidas.
                    </div>
                    <small id="caracteresTituloMax" className="text-muted">
                      Su título puede incluir desde 10 hasta 80 caracteres.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">
                      Categoría
                    </label>
                    <span className="font-weight-bold text-danger">*</span>
                    <select className="form-control" id="idCategoria" name="idCategoria"  ref={register}>
                      <option value="" defaultValue>Seleccionar...</option>
                      <option value="1">Tecnología</option>
                      <option value="2">Educación</option>
                      <option value="3">Comida</option>
                      <option value="4">Ocio</option>
                      <option value="5">Deportes</option>
                    </select>
                    <div hidden className="alert alert-warning" role="alert" id="alertaCateg">
                      Por favor, seleccione una categoría.
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">
                      Descripción
                    </label>
                    <span className="font-weight-bold text-danger">*</span>
                    <textarea
                      className="form-control"
                      id="descripcion"
                      name="descripcion"
                      rows="6"
                      ref={register}
                      minLength="10"
                      maxLength="2500"
                      required
                    >
                    </textarea>
                    <div hidden className="alert alert-warning" role="alert" id="alertaDescrip">
                      Por favor, verifica tu descripción!
                    </div>
                    <small id="caracteresMax" className="text-muted">
                      Su descripción puede incluir desde 10 hasta 2500 caracteres.
                    </small>
                  </div>
                  <div className="form-group" align="center">
                    <button type="submit" className="btn text-white btn-lg" style={{backgroundColor:fondo}}>
                      Publicar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearForo