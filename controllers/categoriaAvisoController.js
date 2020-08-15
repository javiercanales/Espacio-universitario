const { eu_categoria_aviso } = require('../models')

//Función para obtener categorias
async function obtenerCategorias(req, res) {

    console.log("Buscando Categorias...")
    try {
        await eu_categoria_aviso.findAll({

        }).then(categoria => {
            res.status(200).json({ categorias: categoria })
        })
    } catch (error) {
        res.json(error)
    }
}
module.exports = {
    obtenerCategorias
}