'use strict'
var moment = require('moment'); // Para manejar mejor las fechas
const { eu_aviso } = require('../models') // Modelo de aviso
const { eu_imagenes } = require('../models/');


async function nuevoAviso(req, res) {
    console.log(req.body)


    let fecha_ini = moment(req.body.fecha_inicio)
    let fecha_fin = moment(req.body.fecha_termino)


    if (fecha_ini.isBefore(fecha_fin)) {

        let ini = fecha_ini.format('YYYY-MM-DD')
        let fin = fecha_fin.format('YYYY-MM-DD')

        const path = []
        const max_image = 5
        const num_image = req.files.length
        var id_imagen

        for (let i = 0; i < max_image; i++) {
            if (req.files[i] == null) {
                path[i] = null
            } else {
                path[i] = req.files[i].path
            }

        }

        // await eu_imagenes.max('ea_id', 'count') // 40
        await eu_imagenes.aggregate('ei_id', 'count', { distinct: true })
            .then(function (count) {
                console.log(count)
                id_imagen = count + 1

                try {
                    eu_imagenes.create({
                        ei_id: id_imagen,
                        ei_path_img1: path[0],
                        ei_path_img2: path[1],
                        ei_path_img3: path[2],
                        ei_path_img4: path[3],
                        ei_path_img5: path[4],
                        ei_cantidad_img: num_image

                    }).then(imagen => {

                        return id_imagen

                    }).catch(err => res.json(err))

                } catch (error) {

                    console.log("ha ocurrido un error en la imagen: ");
                    console.log(toString(error))
                    res.status(400).json({
                        status: 'error',
                        error: error
                    });
                }
            });

        const date = moment()
        const fecha_actual = date.format('YYYY-MM-DD') // dato de la fecha actual --> ea_fecha_ult_edic

        // Datos del FormData() ----BODY-------

        //const idUsuario = req.body.id_usuario --->>NULL , HAY QUE RECIBIRLO POR PARAMETRO DESDE EL COMPONENTE

        const titulo = req.body.titulo
        const categoria = parseInt(req.body.id_categoria)
        const id_comuna = parseInt(req.body.id_comuna)
        const materia = req.body.materia
        const precio = parseInt(req.body.precio)
        const descripcion = req.body.descripcion
        //---------------------------------------
        //console.log("Parseando la fecha con moment.js")

        const max = await eu_aviso.max('ea_id')
        console.log(max)
        if (max) {
            try {
                console.log("ENTRA AL TRY 1")
                eu_aviso.create({
                    ea_id: max + 1,      //id del aviso incrementa
                    ea_id_usuario: 1,    //rescatar de la sesion/ NOT NULL //POR CASOS DE PRUEBA SE DEJA  FIJO
                    ea_id_categ: categoria,
                    ea_id_comuna: id_comuna,
                    ea_titulo: titulo,
                    ea_descrip: descripcion,
                    ea_materia: materia,
                    ea_precio: precio,
                    ea_estado: true,
                    ea_fecha_public: ini,
                    ea_fecha_expir: fin,
                    ea_fecha_ult_edi: fecha_actual,
                    ea_id_imagenes: id_imagen,
                    ea_valoracion: 0
                }).then(aviso => {

                    res.json({
                        status: 'Se ha insertado la publicación exitosamente',
                        data: aviso
                    });
                    return
                }).catch(err => res.json(err))

            } catch (error) {

                console.log("ha ocurrido un error: ");
                console.log(error)
                res.status(400).json({
                    status: 'error al publicar el aviso',
                    error: error
                });
            }
        } else {
            res.status(400).send({ mensaje: "No es posible recuperar el id máximo en eu_avisos" })
        }



    } else {
        console.log("ERROR ERROR: LA FECHA DE INICIO ES MAYOR A LA DE TERMINO")
        res.status(400).send({ messgae: "Las fecha de inicio debe ser menor a la de termino" })
    }


};

//Función que lista los avisos que ha realizado el usuario
async function misAvisos(req, res) {
    console.log("-----------------------Entra a ver mis avisos-----------------------")
    let id_usuario = 1
    try {
        await eu_aviso.findAll({
            where: { ea_id_usuario: id_usuario },
            include: {
                model: eu_imagenes,
                attributes: ['ei_cantidad_img', 'ei_path_img1', 'ei_path_img2', 'ei_path_img3', 'ei_path_img4', 'ei_path_img5']
            },
        }).then(aviso => {
            res.status(200).json({
                status: 'exitoso, tus avisos son',
                data: aviso
            })

        })
    } catch (error) {
        console.log(error)
        res.json(error)
    }
};

module.exports = {
    nuevoAviso,
    misAvisos
}