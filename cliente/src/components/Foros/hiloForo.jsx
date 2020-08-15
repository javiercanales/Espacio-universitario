import React, { useEffect, useContext, useState } from "react";
import apisForos from "../../apis/apisForos";
import Paginacion from "./paginacionForos";
import BreadCrumb from "../Comun/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ComentariosForo from "./comentariosForo";
import { ForoContext } from "../../context/ForoContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import vocabulario from "./palabrasProhibidas"

const items = ["Inicio", "Foros"];

const HiloForo = (props) => {
  const [idUsuario, setIdUsuario] = useState(3);
  const [idForo, setIdForo] = useState(props.id);
  const [foro, setForo] = useState([]);
  const [comentariosForo, setComentariosForo] = useState();
  const [paginaActual, setPaginaActual] = useState(1);
  const [comentariosPorPagina] = useState(9);
  const [comentariosForoOriginal, setComentariosForoOriginal] = useState();
  const [cambio, setCambio] = useState(0);
  const [cambio2, setCambio2] = useState(0);
  const [comentariosMontados, setComentariosMontados] = useState(false);
  const [foroMontado, setForoMontado] = useState(false);
  const [respuestas, setRespuestas] = useState();
  const [breadCrumbListo, setBreadCrumbListo] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [fondo, setFondo] = useState("#303235");
  const [listoIconoTema, setListoIconoTema] = useState(false)

  const fetchDataComentarios = async () => {
    try {
      const response = await axios.get(
        `http://146.83.198.35:1074/back/foros/comentarios/${idForo}`
      );
      console.log(response);
      console.log(response.data.data.todosComentarios);
      setComentariosForo(response.data.data.todosComentarios);
      setComentariosForoOriginal(response.data.data.todosComentarios);
      setComentariosMontados(true);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDataForo = async () => {
    try {
      const response = await axios.get(
        `http://146.83.198.35:1074/back/foros/${idForo}`
      );
      console.log(response);
      setForo(response.data.data.foro);
      setRespuestas(response.data.data.respuestas);
      setForoMontado(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataForo();
    console.log("idForo: " + idForo);
  }, [cambio2]);

  useEffect(() => {
    console.log("a verrrrrrrrrrrr");
    fetchDataComentarios();
  }, [cambio]);

  const cerrarForo = async () => {
    if (idUsuario == idUsuarioCreaForo) {
      const response = await axios
        .post("http://146.83.198.35:1074/back/foros/cerrar/", {
          idForo: idForo,
          idUsuarioCierraForo: idUsuario,
        })
        .then((response) => {
          toast.warn(response.data.status, {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          });
          //history.push(`/foros/hilo/${idForo}`)
        })
        .catch((err) => {
          toast.error("Ha ocurrido un extraño error. Intente nuevamente.", {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          });
        });
      cambio == 0 ? setCambio(1) : setCambio(0);
      cambio2 == 0 ? setCambio2(1) : setCambio2(0);
    }
  };

  const onSubmit = async (data, event) => {
    console.log(data);
    console.log(idForo);
    console.log(idUsuario);

    document.getElementById("alerta").hidden = true;
    let existenProhibidas = verificarPalabras(data.comentario);

    if (existenProhibidas) {
      document.getElementById("alerta").hidden = false;
    } else {
      const response = await axios
        .post("http://146.83.198.35:1074/back/foros/comentarios/", {
          idForo: idForo,
          idUsuario: idUsuario,
          comentario: data.comentario,
        })
        .then((response) => {
          toast.success(response.data.status, {
            position: "bottom-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          });
          //history.push(`/foros/hilo/${idForo}`)
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
          });
        });
      cambio == 0 ? setCambio(1) : setCambio(0);
      event.target.reset();
    }
  };

  //Este método permite paginar la lista de foros
  //Esto es posible porque el método es pasado como parámetro a Paginación
  const paginacion = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const indiceUltimoComentario = paginaActual * comentariosPorPagina;
  const indicePrimerComentario = indiceUltimoComentario - comentariosPorPagina;

  let comentariosActual;
  let totalComentarios;
  if (comentariosMontados) {
    totalComentarios = comentariosForo.length;
    comentariosActual = comentariosForo.slice(
      indicePrimerComentario,
      indiceUltimoComentario
    );
  }

  let titulo;
  let fechaCreacion;
  let estado;
  let estadoBooleano;
  let nombreUsuario;
  let temaForo;
  let idUsuarioCreaForo;
  let imagenTemaPath
  if (foroMontado) {
    titulo = foro[0].ef_titulo;
    fechaCreacion = foro[0].ef_fecha_creacion;
    estadoBooleano = foro[0].ef_estado;
    temaForo = foro[0].eu_tema_foro.etf_nombre;
    if(temaForo == "Tecnología") {
      imagenTemaPath = "/images/tecnologia.png"
    } else if (temaForo == "Comida") {
      imagenTemaPath = "/images/comida.png"
    } else if (temaForo == "Educación") {
      imagenTemaPath = "/images/educacion.png"
    } else if (temaForo == "Ocio") {
      imagenTemaPath = "/images/ocio.png"
    } else {
      imagenTemaPath = "/images/deporte.png"
    }
    idUsuarioCreaForo = foro[0].eu_usuario.eus_id;
    if (estadoBooleano) {
      estado = "activo";
    } else {
      estado = "cerrado";
    }
    nombreUsuario =
      foro[0].eu_usuario.eus_nombre +
      " " +
      foro[0].eu_usuario.eus_apellido_pat +
      " " +
      foro[0].eu_usuario.eus_apellido_mat;
    if (!breadCrumbListo && items.length < 3) {
      items.push(titulo);
      setBreadCrumbListo(true);
    }
    console.log(
      "idUsuario: " + idUsuario + " y idUsuarioCreaForo: " + idUsuarioCreaForo
    );
  }

  const verificarPalabras = (texto) => {
    let cont = 0;
    for (var i = 0; i < vocabulario.length; i++) {
      if (texto.toLowerCase().includes(vocabulario[i])) {
        cont++;
      }
    }
    return cont == 0 ? false : true;
  };

  return (
    <div>
      <div className="row justify-content-between mb-3 mt-3">
        <div className="col-sm-10 border-bottom">
          <BreadCrumb items={items} />
        </div>
        <div className="col-sm-2 border-bottom">
          <Link
            to="/foros/crear"
            className="btn text-white btn-md p-2"
            style={{ backgroundColor: fondo }}
          >
            Crear Foro
          </Link>
        </div>
      </div>
      <div className="row container" align="center">
        <h4 align="center">{titulo}</h4>
        {estadoBooleano ? (
          <img
            src="/images/confirmed.png"
            width="45"
            height="45"
            align="center"
          />
        ) : (
          <img src="/images/nope.png" width="45" height="45" />
        )}
        {idUsuario == idUsuarioCreaForo && estadoBooleano ? (
          <div className="col-2">
            <button className="btn btn-warning btn-sm" onClick={cerrarForo}>
              Cerrar hilo de foro
            </button>
          </div>
        ) : null}
      </div>
      <div className="row text-muted medium bg-light" align="center">
        <div className="col border-bottom mt-3">
          <h6>
            Creado por {nombreUsuario} el {fechaCreacion}
          </h6>
        </div>
        <div className="col border-bottom mt-3">
          <h6>{temaForo}</h6>
            <img
              src={imagenTemaPath}
              width="50"
              height="50"
              align="center"
              id="imagenTema"
            />
        </div>
        <div className="col border-bottom mt-3">
          <h6>
            {"Foro " + estado + " con " + respuestas}
            {respuestas == 1 ? " respuesta" : " respuestas"}
          </h6>
        </div>
      </div>
      <div className="container" align="center">
        <Link className="link" to="/avisos">
          ¿Buscando algún producto en venta? ¿Arriendo universitario? ¡Pasa por
          nuestros Avisos!
        </Link>
      </div>

      <div className="col" align="center">
        {comentariosMontados ? (
          <ComentariosForo
            comentarios={comentariosActual}
            setCambio={setCambio}
            idForo={idForo}
          />
        ) : (
          "Cargando..."
        )}
        <Paginacion
          forosPorPagina={comentariosPorPagina}
          totalForos={totalComentarios}
          paginacion={paginacion}
        />
        {comentariosMontados && estadoBooleano ? (
          <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
            <textarea
              type="text"
              className="form-control bg-light"
              id="comentario"
              name="comentario"
              placeholder="Deja tu comentario!"
              ref={register}
              minLength="1"
              maxLength="1000"
              required
            />
            <div
              hidden
              className="alert alert-warning"
              role="alert"
              id="alerta"
            >
              Revisa tu comentario, ¡tiene palabras prohibidas!
            </div>
            <div className="container" align="center">
              <div className="row-6 mt-3">
                <button
                  type="submit"
                  className="btn text-white btn-lg"
                  align="center"
                  style={{ backgroundColor: fondo }}
                >
                  Comentar
                </button>
              </div>
              <div className="row-6">
                <small id="caracteresMax" className="text-muted" align="center">
                  Máximo: 1000 caracteres.
                </small>
              </div>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default HiloForo;
