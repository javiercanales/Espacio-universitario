'use strict'
//se carga el módulo express para poder crear rutas
var express=require('express')

//se carga el controlador
const avisoController=require('../controllers/avisoController')
// llamamos al router : Router para crear manejadores de rutas montables y modulares. 
//Una instancia Router es un sistema de middleware y direccionamiento completo; 
//por este motivo, a menudo se conoce como una miniaplicación
var api=express.Router()

//asociación de rutas con controllers
//TODOS LOS AVISOS ACTIVOS
api.get('/avisosInicio',avisoController.ultimosAvisos)

module.exports=api
