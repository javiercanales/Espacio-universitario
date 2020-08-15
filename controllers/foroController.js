const { eu_foro } = require('../models')
const { eu_comenta_foro } = require('../models')
const { sequelize } = require('../models')
const { eu_usuario } = require('../models')
const { eu_tema_foro } = require('../models')

async function foros(req, res) {

    const [results, foros] = await sequelize
    .query("SELECT COUNT(B.ecf_id_foro) AS respuestas, A.ef_titulo, A.ef_estado, A.ef_id, A.ef_id_tema, A.ef_fecha_creacion "
    + "FROM eu_foro A "
    + "LEFT JOIN eu_comenta_foro B ON A.ef_id=B.ecf_id_foro "
    + "GROUP BY A.ef_titulo, A.ef_estado, B.ecf_id_foro, A.ef_id "
    + "ORDER BY B.ecf_id_foro");
    
    res.status(200).json({
        status: "success",
        data: {
            todosForos: foros
        }
    })
}

async function guardar(req, res) {
    date = new Date()
    dateFormat = date.toISOString()
    
    req.body.idCategoria = parseInt(req.body.idCategoria)
    console.log(req.body)

    const foro = await eu_foro.create({
        ef_id_creador: 3,
        ef_id_tema: req.body.idCategoria,
        ef_titulo: req.body.titulo,
        ef_descrip: req.body.descripcion,
        ef_estado: true,
        ef_fecha_creacion: dateFormat,
        ef_fecha_cierre: null,
        ef_id_usuario_cierre: null
    })
    .then(async(foro) => {
        console.log(foro)
        console.log("id foro: " + foro.dataValues.ef_id)
        eu_comenta_foro.create({
            ecf_id: foro.dataValues.ef_id_creador,
            ecf_id_foro: foro.dataValues.ef_id,
            ecf_comentario: foro.dataValues.ef_descrip,
            ecf_fecha_com: dateFormat
        })
        res.status(200).json({
            status: "El tema fue creado exitosamente!",
            data: {
                foroResponse: foro
            }
        })
    })
    .catch(err=>res.status(500).json(err))
    console.log(foro)
}

async function comentarios(req, res) {
    const idForo = req.params.id
    console.log("id foro: "+idForo)
    
    let comentariosForo = await eu_comenta_foro.findAll({
        attributes:['ecf_comentario','ecf_fecha_com'],
        where: {'ecf_id_foro': idForo},
        order: [
            ['ecf_fecha_com', 'ASC'],
        ],
        include:[{
            model: eu_usuario,
            attributes:['eus_nombre','eus_apellido_pat','eus_apellido_mat']
        }]
    })
    .then(comentarios=>{
        res.status(200).json({
          status: 'success',
          data:{todosComentarios: comentarios}
        })
    })
    .catch(err=>res.json(err))
}

async function foro(req, res) {
    const idForo = req.params.id
    console.log("id foro: "+idForo)

    const respuestas = await eu_comenta_foro.count({
        where: {
            ecf_id_foro: idForo
        }
    })

    eu_foro.findAll({
        attributes:['ef_titulo','ef_descrip','ef_estado','ef_fecha_creacion'],
        where: {'ef_id': idForo},
        include:[
        {
            model: eu_usuario,
            attributes:['eus_id','eus_nombre','eus_apellido_pat','eus_apellido_mat']
        },
        {
            model: eu_tema_foro,
            attributes:['etf_nombre']
        }],
    })
    .then(foro => res.status(200).json({
        status:'success',
        data :{
            foro: foro,
            respuestas: respuestas
        }
    }))
    .catch(err=>res.json(err))
}

async function comentar(req, res) {

    date = new Date()
    idForo = req.body.idForo
    idUsuario = req.body.idUsuario
    comentario = req.body.comentario
    console.log("idForo: "+idForo)
    console.log("idForo: "+idUsuario)
    console.log("idForo: "+comentario)
    console.log("idForo: "+date)

    const comentarioForo = await eu_comenta_foro.create({
        ecf_id: idUsuario,
        ecf_id_foro: idForo,
        ecf_comentario: comentario,
        ecf_fecha_com: date
    })
    .then(async(com) => {
        console.log(com)
        res.status(200).json({
            status: "Comentario realizado! Puede continuar comentando en el foro",
            data: {
                comentarioResponse: com
            }
        })
    })
    .catch(err=>res.status(500).json(err))
}

async function cerrar(req, res) {
    date = new Date()
    dateFormat = date.toISOString()
    idForo = req.body.idForo
    idUsuarioCierre = req.body.idUsuarioCierraForo
    const foro = await eu_foro.update({
        ef_estado: false,
        ef_id_usuario_cierre: idUsuarioCierre,
        ef_fecha_cierre: dateFormat
    },
    {
        where: { ef_id: idForo }
    })
    .then(async(com) => {
        console.log(com)
        res.status(200).json({
            status: "El hilo de discusión de foro ha sido cerrado. ¡Puedes crear nuevos hilos de discusión si gustas!",
            data: {
                comentarioResponse: com
            }
        })
    })
    .catch(err=>res.status(500).json(err))
}

module.exports = {
    foros,
    guardar,
    comentarios,
    foro,
    comentar,
    cerrar
}
