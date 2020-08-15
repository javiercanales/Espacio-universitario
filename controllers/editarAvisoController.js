const { eu_aviso } = require('../models')
const {eu_imagenes} = require ('../models') // si eliminamos un aviso, también debemos eliminar las imagenes

async function editarAviso(req, res) {

    ///console.log(req.body)
    let id = req.body.id_aviso
    let titulo = req.body.titulo
    let precio = req.body.precio
    let descrip = req.body.descripcion
    let estado = req.body.estado
    let status

    if(estado == "abierto"){
        status = true
    }else{
        status =false
    }
    
    await eu_aviso.update({
        ea_titulo: titulo,
        ea_precio: precio,
        ea_descrip: descrip,
        ea_estado : status

    }, {
        where: {
            ea_id: id
        }
    }).then(update => {
        res.status(200).send({
            message: "Update exitoso",
            dato: update
        });

    }).catch((error) => {
        res.status(400).send({
            message: "error al actualizar",
            error: error
        })
    })

}

async function EliminarAviso(req, res) {

    console.log(req.params.dato)
    let id = req.params.dato
    await eu_aviso.destroy({
        where: {
            ea_id: id
        }
    }).then(update => {
        res.status(200).send({
            message: "El aviso ha sido elimnado exitosamente",
            dato: update
        });

    }).catch((error) => {
        res.status(400).send({
            message: "error al eliminar",
            error: error
        })
    });

}

module.exports = {
    editarAviso,
    EliminarAviso
}