import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import apisAvisos from '../../apis/apisAvisos'
import { useForm, errors } from 'react-hook-form';
import SelectDependiente from './selectDependiente'
import Moment from 'moment';
import MenuUsuario from '../Comun/menuUsuario'
import { Redirect } from 'react-router-dom'

//------------------------------------------------------------------------------------
//1 debo rescatar las regiones y guardarlas en un array.
//2 colocar esas regiones en un select con .map
//3 capturar la region seleccionada con CapturaRegion
//4 rescatar el id de la region
//5 consultar comunas pertenecientes a esa region y setearlas en el state de Comunas
//6 listar las comunas en el select de comunas
//------------------------------------------------------------------------------------

const NuevoAviso = () => {
    const [idUsuario, setIdUsuario] = useState(1)
    const { register, handleSubmit, errors } = useForm();
    const [categoria, setCategoria] = useState([])
    const [comuna, setComuna] = useState([])
    const [regiones, setRegion] = useState([])
    const [idRegion, setIdRegion] = useState(false) //para detectar ide de region y cargar las comunas, se envian al componente <SelectDependiente>
    const [image, setImage] = useState(null)
    const [cont, setCont] = useState(0)
    const [visible, setVisible] = useState("card")
    const [redirect, setRedirect] = useState(false)
    const ObtenerCategorias = async () => {
        //console.log("Obteniendo categorias...")
        let res = await axios.get("http://146.83.198.35:1074/back/avisos/obtenerCategorias")
        //http://146.83.198.35:1074/back/avisos/obtenerCategorias
        const categorias = Object.values(res)[0]
        setCategoria(categorias.categorias)
        return null;
    }
    const ObtenerDatosRegion = async () => {
        //console.log("Obteniendo regiones...")
        let res = await axios.get("http://146.83.198.35:1074/back/avisos/listarRegiones")
        //http://146.83.198.35:1074/back/avisos/listarRegiones
        const regiones = Object.values(res)[0]
        //console.log(regiones.regiones)
        setRegion(regiones.regiones)
        return null;
    }
    const ObtenerDatosComuna = async () => {
        //console.log("Obteniendo Comunas...")
        let res = await axios.get("http://146.83.198.35:1074/back/avisos/listarComunas")
        //http://146.83.198.35:1074/back/avisos/listarComunas
        const comunas = Object.values(res)[0]
        //console.log(comunas.comunas)
        setComuna(comunas.comunas)
        //console.log("La comuna seleccionada es "+ comunas.comunas[1].ec_nombre)//una vez obtenidas las comunas actualizamos el state
        return null;
    }

    /* este useEffect se activa cada vez que cambia la region entonces,la funcion
     ObtenerDatosRegion hace la consulta al backend para tarer las regiones
     luego que las obtiene, actualiza el state de regiones y quiero que estos datos
     se obtenga en el primer render, es decir en el useEffect*/

    useEffect(() => {

        document.getElementById("myFieldSet").disabled = true;
        ObtenerDatosRegion()
        ObtenerDatosComuna()
        ObtenerCategorias()
        console.log("render")
    }, [])


    const ObtenerIdCategoria = (event) => {
        if (event.target.value == 1) {

            document.getElementById("myFieldSet").disabled = false;

        } else {

            document.getElementById("myFieldSet").disabled = true;

        }
    }

    const CapturarRegion = (event) => {

        setIdRegion(event.target.value)//rescato el id de la region y la seteo

        if (event.target.value != "") {

            let res = comuna.filter(comuna => comuna.ec_id_region == event.target.value)

            if (res == "" || res === undefined) {

                alert("No hay comunas asociadas a esta región");

            }
        }
    }
    const ValidarFiles = (event) => {
        document.getElementById("submit").disabled = true
        let num = event.target.files.length
        console.log("Ha cambiado el numero de imagenes " + num)
        if (num >= 1 && num <= 5) {
            setImage(event.target.files)//setImage(event.target.files[0])
            document.getElementById("submit").disabled = false
        } else {
            document.getElementById("mensaje").innerHTML = "Sólo se permite hasta un máximo de 5 imagenes"
        }
    }

    const Disabled = (e) => {
        document.getElementById("submit").disabled = true
        document.getElementById("mensaje").innerHTML = ""
    }

    const onSubmit = async (data) => {   // al apretar en submit del formulario llama a esta función
        let titulo = data.titulo

        //Manejando las fechas con moment
        let fechaIni = Moment(data.fecha_inicio)
        let fechaTerm = Moment(data.fecha_termino)

        console.log(fechaIni)
        console.log(fechaTerm)

        let id_cat = data.id_categoria
        let id_comu = data.id_comuna
        let id_reg = data.id_region
        let materia = data.materia
        let precio = data.precio
        let descr = data.descripcion

        if (precio % 1 === 0) {

            alert("El precio es entero")
            if (precio >= 0 && titulo.length > 10 && titulo.length < 50 && descr.length > 20 && descr.length <= 300) {
                if (fechaTerm.isBefore(fechaIni)) {
                    alert("La fecha de inicio debe ser menor a la de termino")
                } else {
                    const formdata = new FormData()
                    for (let i = 0; i < image.length; i++) {
                        formdata.append('image', image[i])
                    }

                    formdata.append('id_usuario', idUsuario)
                    formdata.append('titulo', titulo)
                    formdata.append('fecha_inicio', fechaIni)
                    formdata.append('fecha_termino', fechaTerm)
                    formdata.append('id_categoria', id_cat)
                    formdata.append('id_comuna', id_comu)
                    formdata.append('id_region', id_reg)
                    formdata.append('materia', materia)
                    formdata.append('precio', precio)
                    formdata.append('descripcion', descr)

                    try {
                        await axios.post('http://146.83.198.35:1074/back/avisos/nuevoAviso', formdata, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(res => {
                            console.log(res.data)
                            alert("Se ha insertado exitosamente")
                        }).catch(error => {
                            console.log(error)
                            alert("Ha ocurrido un error al crear el aviso")
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            } else {
                alert(`num de caracteres titulo: ${titulo.length} y  num caract. descripcion${descr.length}`)
            }



        } else {
            alert("Ingrese un precio de valor entero")
        }
        // //const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        // // let array = Object.values(data)
        // // console.log(array)
        // // console.log(data)

        // let titulo = data.titulo

        // //Manejando las fechas con moment
        // let fechaIni = Moment(data.fecha_inicio)
        // let fechaTerm = Moment(data.fecha_termino)

        // let id_cat = data.id_categoria
        // let id_comu = data.id_comuna
        // let id_reg = data.id_region
        // let materia = data.materia
        // let precio = data.precio
        // let descr = data.descripcion

        // if (precio >= 0) {
        //     if (fechaTerm.isBefore(fechaIni)) {

        //         alert("Las fechas son incorrectas: fecha de término es menor a la de inicio")

        //     } else {
        //         alert("Las fechas ingresada son correctas ")

        //         const formdata = new FormData()
        //         for (let i = 0; i < image.length; i++) {
        //             formdata.append('image', image[i])
        //         }

        //         formdata.append('id_usuario', idUsuario)
        //         formdata.append('titulo', titulo)
        //         formdata.append('fecha_inicio', fechaIni)
        //         formdata.append('fecha_termino', fechaTerm)
        //         formdata.append('id_categoria', id_cat)
        //         formdata.append('id_comuna', id_comu)
        //         formdata.append('id_region', id_reg)
        //         formdata.append('materia', materia)
        //         formdata.append('precio', precio)
        //         formdata.append('descripcion', descr)

        //         console.log(formdata)
        //         try {
        //             await axios.post('http://146.83.198.35:1074/back/avisos/nuevoAviso', formdata, {
        //                 //http://146.83.198.35:1074/back/avisos/nuevoAviso
        //                 headers: {
        //                     'Content-Type': 'multipart/form-data'
        //                 }
        //             }).then(res => {
        //                 alert("Se ha insertado exitosamente")
        //                 setVisible("card d-none")
        //                 setRedirect(true)
        //             }).catch(() => {
        //                 alert("Las fechas son inválidas")
        //             })

        //         } catch (error) {
        //             console.log(error)

        //         }
        //     }

        // } else {
        //     alert("Precio invalido, debe ser mayor o igual a cero")
        // }


    }

    return (
        <Fragment>
            <div className="container-fluid mt-3">
                <div className="row">

                    <div className="col-md-3 col-sm-12">
                        <MenuUsuario />
                    </div>
                    {/* FIN PANEL DE USUARIO */}
                    <div className="col-md-9 col-sm-12">
                        {redirect ? <Redirect from="/avisos/nuevo" to='/avisos/misAvisos' /> : <div className="d-none" />
                        }
                        <div className={visible}>
                            <div className="card-header text-light text-center " style={{ backgroundColor: "#112d4e" }}>
                                <h5>Nueva publicación</h5>
                            </div>
                            <form className="card-body bg-light mb-5" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" >
                                <div className="form-group mt-3">
                                    <label htmlFor="titulo" className="font-weight-bold">Título</label>
                                    <span className="font-weight-bold text-danger">*</span>
                                    <input required
                                        type="text"
                                        className="form-control"
                                        id="titulo"
                                        name="titulo"
                                        placeholder="Ingresa el título de tu publicación"
                                        ref={register({ required: true })}
                                    />
                                    <small id="tituloAyuda" className="form-text text-muted">Sé lo más claro posible</small>
                                </div>
                                <div className="form-row mb-2">
                                    <div className="col-md-6">
                                        <label htmlFor="precio" className="font-weight-bold">Precio</label>
                                        <span className="font-weight-bold text-danger">*</span>
                                        <span>(CLP)</span>
                                        <input
                                            required
                                            type="number"
                                            placeholder="Ingrese el precio"
                                            id="precio"
                                            className="form-control"
                                            name="precio"
                                            defaultValue="0"
                                            ref={register({})}
                                        ></input>
                                    </div>
                                    <div className="col-md-6"></div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="categoria" className="font-weight-bold">Categoría</label>
                                        <span
                                            className="font-weight-bold text-danger"
                                        >*</span>

                                        <select
                                            required
                                            className="form-control"
                                            id="categoria"
                                            name="id_categoria"
                                            ref={register({ required: true })}
                                            onChange={ObtenerIdCategoria}
                                        >
                                            <option value="" defaultValue="">Seleccionar categoría...</option>
                                            {categoria.map(cat => {
                                                return (
                                                    <option value={cat.eca_id} key={cat.eca_id}>{cat.eca_nombre}</option>
                                                )
                                            })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <fieldset id="myFieldSet">
                                            <label htmlFor="materia" className="font-weight-bold">Materia</label>
                                            <input
                                                defaultValue=""
                                                type="text"
                                                className="form-control"
                                                id="materia"
                                                name="materia"
                                                placeholder="Ingrese la materia"
                                                ref={register({ maxLength: 50 })}
                                            />
                                        </fieldset>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="region" className="font-weight-bold">Región</label>
                                        <span className="font-weight-bold text-danger">*</span>
                                        <select required
                                            id="region"
                                            name="id_region"
                                            className="form-control"
                                            onChange={CapturarRegion}
                                            ref={register({ required: true })}
                                        >
                                            <option value="" defaultValue="">Seleccionar región...</option>
                                            {regiones.map(region => {
                                                return (
                                                    <option value={region.er_id} key={region.er_id}>{region.er_nombre}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="id_comuna" className="font-weight-bold">Comuna</label>
                                        <SelectDependiente className="form-control" data={comuna} idregion={idRegion} label={"id_comuna"} name="id_comuna" register={register({ required: true })} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">

                                        <label htmlFor="fechaIni" className="font-weight-bold">Fecha de inicio</label>
                                        <span className="font-weight-bold text-danger">*</span>
                                        <input type="date"
                                            required
                                            className="form-control"
                                            placeholder="fecha_inicio"
                                            id="fechaIni"
                                            name="fecha_inicio"
                                            ref={register({ required: true })}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="fechaFin" className="font-weight-bold">Fecha de término</label>
                                        <span className="font-weight-bold text-danger">*</span>
                                        <input type="date"
                                            required
                                            className="form-control"
                                            id="fechaFin"
                                            placeholder="fecha_termino"
                                            name="fecha_termino"
                                            ref={register({ required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="descripcion" className="font-weight-bold">Descripción de la publicación</label>
                                        <textarea
                                            required
                                            className="form-control"
                                            id="descripcion"
                                            rows="4"
                                            onChange={() => {

                                                setCont(document.getElementById('descripcion').value.length)
                                            }}
                                            name="descripcion"
                                            ref={register({ required: true, min: 20, max: 300 })}
                                        ></textarea>
                                        <small id="tituloAyuda" className="form-text text-muted">Max caracteres: 300 | Min : 20 | Actual: {cont}</small>
                                        <small id="correcto" className="form-text text-muted"></small>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image" className="font-weight-bold">Adjuntar imágenes (al menos una)</label>
                                    <input className="form-control-file"
                                        required
                                        type="file" accept=".jpg"
                                        name="image"
                                        id="image"
                                        ref={register}
                                        multiple
                                        onChange={ValidarFiles}
                                    />
                                    <small id="mensaje" className="form-text font-weight-bold text-danger"></small>
                                </div>
                                <div className=" row form-row">
                                    <div className="col-md-6 mt-3">
                                        <input type="submit"
                                            id="submit"
                                            disabled={true}
                                            className="btn btn-lg btn-block text-light"
                                            style={{ backgroundColor: "#112d4e" }}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <button type="reset"
                                            value="Limpiar"
                                            className="btn btn-lg btn-warning btn-block"
                                            onClick={Disabled}
                                        >
                                            Limpiar Formulario</button>
                                    </div>
                                </div>
                            </form>



                            {/* <form action="" onSubmit={EnviarImagenes} encType="multipart/form-data" >

                                <input type="text" name="nombre" />

                                <input type="file" name="image" onChange={event => {
                                    setImage(event.target.files[0])
                                }} />

                                <button type="submit">Subir imagen</button>
                            </form> */}

                        </div>
                    </div>
                </div>
            </div>

        </Fragment>

    )

}

export default NuevoAviso