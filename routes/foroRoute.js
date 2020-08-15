'use strict'
//se carga el módulo express para poder crear rutas
var express = require('express')

//se carga el controlador
const foroController=require('../controllers/foroController')

// llamamos al router
var api=express.Router()

api.get('/', foroController.foros)
api.post('/', foroController.guardar)
api.get('/comentarios/:id', foroController.comentarios)
api.get('/:id', foroController.foro)
api.post('/comentarios/', foroController.comentar)
api.post('/cerrar/', foroController.cerrar)

//exportar la configuración
module.exports=api