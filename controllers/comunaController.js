const { eu_comuna } = require('../models')

//Función para obtener las comunas
async function listarComuna(req, res) {

    console.log("Buscando Comunas...")
    try {
        await eu_comuna.findAll({

        }).then(comunas => {
            res.status(200).json({ comunas: comunas })
        })
    } catch (error) {
        res.json(error)
    }
}
module.exports = {
    listarComuna
}