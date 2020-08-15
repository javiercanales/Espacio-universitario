const { eu_region } = require('../models')

//Función para obtener regiones

async function listarRegiones(req, res) {

    console.log("Buscando regiones...")
    try {
        await eu_region.findAll({

        }).then(region => {
            res.status(200).json({ regiones: region })
        })
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    listarRegiones
}