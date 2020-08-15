import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { MDBIcon } from "mdbreact";
import '../../App.css'
import Estrellas from './estrellas'
import CurrencyFormat from 'react-currency-format'
import { Link } from 'react-router-dom'
import MenuUsuario from '../Comun/menuUsuario'

const MisAvisos = () => {

    const path = "http://146.83.198.35:1074/"
    //FORM
    const { register, handleSubmit, errors } = useForm();

    //Para el modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [misAvisos, setMisAvisos] = useState([])
    const [aviso, setAviso] = useState([])//actual seleccionado editar-eliminar
    const [update, setUpdate] = useState(0)

    useEffect(() => {

        ObtenerMisAvisos()
        console.log("Rendeerizando")
        console.log(aviso)
    }, [update])

    const ObtenerMisAvisos = async () => {
        let res = await axios.get("http://146.83.198.35:1074/back/avisos/misAvisos")//http://localhost:3000/avisos/misAvisos
        const avisos = Object.values(res)[0]
        setMisAvisos(avisos.data)
        return null;
    }

    const Captura = (a) => {

        console.log("El aviso seleccionado es: ")
        let target = Object.values(a)[0]
        setAviso(target)
        setTimeout(() => {
            console.log(aviso)
            document.getElementById('checkbox').click()
        }, 500)
    }

    const onSubmit = async (data) => {
        handleClose()
        console.log(data)
        try {

            await axios.post('http://146.83.198.35:1074/back/avisos/editarAviso', data)//http://localhost:3000/avisos/editarAviso

                .then(res => {
                    console.log("Update exitoso :) ")
                    alert("Update exitoso :)")
                    setUpdate(update + 1)
                }).catch(() => {
                    alert("Error al actualizar :( ")
                })

        } catch (error) {

            console.log(error)
        }

    }

    const EliminarAviso = async (data) => {

        try {
            await axios.delete(`http://146.83.198.35:1074/back/avisos/eliminarAviso/${data}`)//`http://localhost:3000/avisos/eliminarAviso/${data}`

                .then(res => {
                    console.log("Deleteexitoso :) ")
                    alert("Ha sido eliminado exitosamente :)")
                    setUpdate(update + 1)
                }).catch(() => {

                    alert("Error al eliminar :( ")
                })

        } catch (error) {

            console.log(error)
        }
    }

    const Activo = "row  text-success font-weight-bold rounded p-2 justify-content-center"
    const Inactvo = "row text-danger font-weight-bold rounded p-2 justify-content-center"

    return (
        <Fragment>
            <div className="container-fluid mt-4" >
                <div className="row">
                    <div className="col-md-3">
                        <MenuUsuario />
                    </div>
                    <div className="col-md-9 overflow-auto" style={{ maxHeight: "500px" }}>
                        <div className="row border-bottom m-2">
                            <div className="col-md-6"><h3>Mis Publicaciones</h3></div>
                            <div className="col-md-2"></div>
                            <div className="d-flex justify-content-end col-md-4 mb-2">
                                <Link to='/avisos/nuevo' className="btn btn-primary btn-block">Publicar </Link>

                            </div>

                        </div>

                        {
                            misAvisos.length > 0 ?
                                misAvisos.map(miAviso => {
                                    const pathEntero = (Object.values(miAviso.eu_imagene).slice(1, 6)).find(im => im != null)
                                    const tamano = (Object.values(miAviso.eu_imagene).slice(1, 6)).find(im => im != null).length
                                    const urlImagen = pathEntero.slice(27, tamano)
                                    const urlFinal = path.concat(urlImagen)
                                    console.log('url', urlFinal)
                                    console.log(miAviso)
                                    return (

                                        <div className="row border-bottom  mb-2 p-4 m-2 " key={miAviso.ea_id} style={{
                                            backgroundColor: "#ebf6f7",
                                            borderRadius: "7px"
                                        }}>

                                            <div className="col-md-3" >
                                                <div className="row">

                                                    <img src={urlFinal} className="rounded border m-auto" alt="" width="180px" height="150px" />
                                                    {/* <img src={Imagen} alt="" />*/}
                                                </div>
                                                <div className="row d-flex justify-content-center mt-1">
                                                    <Estrellas puntaje={miAviso.ea_valoracion} />
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div className="row pl-1">
                                                    <div className="row w-100 border-bottom " >
                                                        <h5>{miAviso.ea_titulo}</h5>
                                                    </div>
                                                    <div className="row w-100 border-bottom  font-italic" style={{ color: "#313232" }}>
                                                        Precio:
                                                    <CurrencyFormat value={miAviso.ea_precio} displayType={'text'}
                                                            thousandSeparator={true} prefix={'$'} renderText={value => <p className="" >{value} CLP</p>} />
                                                        {/* parsea los valores de precio*/}


                                                    </div>
                                                    <div className="row w-100 font-italic border-bottom " style={{ color: "#313232" }}>
                                                        <p>Publicado el {miAviso.ea_fecha_public}</p>
                                                    </div>
                                                    <div className="row w-100 font-italic border-bottom " style={{ color: "#313232" }}>
                                                        <p>Expira el {miAviso.ea_fecha_expir}</p>
                                                    </div>
                                                </div>

                                            </div>


                                            <div className="col-md-1">


                                                {
                                                    miAviso.ea_estado
                                                        ? <div className="row d-flex justify-content-center">
                                                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="green" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                            </svg>
                                                        </div>
                                                        : <div className="row-100"><svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-pause-fill" fill="yellow" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                                                        </svg></div>
                                                }

                                            </div>
                                            <div className="col-md-1">

                                                <div className="row d-flex justify-content-center">
                                                    {/* <button className="btn btn-warning" value={miAviso.ea_id} onClick={Captura}>Modificar</button> */}
                                                    <button className="btn btn-warning btn-block mr-1" style={{ color: "white" }} value={miAviso.ea_id} onClick={
                                                        () => {
                                                            Captura({ miAviso })
                                                        }
                                                    }><MDBIcon icon="edit" /></button>
                                                    <input type="checkbox" id="checkbox" onClick={handleShow} value={miAviso} style={{ display: "none" }} />
                                                </div>

                                            </div>
                                            <div className="col-md-1">

                                                <div className="row d-flex justify-content-center">

                                                    {/* BOTON DE ELIMINAR */}{/* BOTON DE ELIMINAR */}
                                                    <button className="btn btn-danger btn-block" value={miAviso.ea_id} onClick={
                                                        () => {
                                                            EliminarAviso(miAviso.ea_id)
                                                        }

                                                    }>
                                                        <MDBIcon icon="trash" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    )



                                }) : (
                                    <h4>Cargando tus avisos, por favor espera un momento :)</h4>
                                )}
                    </div>

                </div>
            </div>



            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Edita tu publiación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="titulo"> Titulo del aviso</label>
                            <input type="text"
                                placeholder="titulo"
                                name="titulo"
                                id="titulo"
                                className="form-control"
                                defaultValue={aviso.ea_titulo}
                                ref={register({ required: true, min: 20, max: 50 })}
                            />
                            <input type="hidden" name="id_aviso" value={aviso.ea_id} ref={register} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="precio">Precio (CLP)</label>
                            <input type="number"
                                id="precio"
                                placeholder="precio"
                                name="precio"
                                className="form-control"
                                defaultValue={aviso.ea_precio}
                                ref={register({ min: 0 })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="precio">Estado</label>
                            <select name="estado" className="form-control" ref={register({ required: true })}>
                                <option value="abierto">Abierto</option>
                                <option value="cerrado">Cerrado</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcion"></label>
                            <textarea
                                className="form-control"
                                name="descripcion"
                                id="descripcion"
                                defaultValue={aviso.ea_descrip}
                                rows="4"
                                ref={register({ max: 300, min: 10, required: true })}
                            />
                        </div>
                        <div className="d-flex justify-content-around p-4">
                            <input type="submit"
                                value="Guardar cambios"
                                id="submit"
                                className="btn btn-primary  text-light"
                            />
                            <button type="reset"
                                value="Limpiar"
                                className="btn btn-danger"
                            >
                                Restablecer formulario </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </Fragment>




    );
}

export default MisAvisos