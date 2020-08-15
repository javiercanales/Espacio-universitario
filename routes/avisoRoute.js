'use strict'
//se carga el módulo express para poder crear rutas
var express = require('express')
const path = require('path')
const crypto = require("crypto") // genera codigo 
const multer = require('multer') //Para guardar imagenes
//se carga el controlador
const avisoController = require('../controllers/avisoController')

//-------------------Controladores HUGO----------------------------
var nuevoAviso = require('../controllers/nuevoAvisoController')
var editar = require('../controllers/editarAvisoController')
var Regiones = require('../controllers/regionController')
var Comunas = require('../controllers/comunaController')
var Categorias = require('../controllers/categoriaAvisoController')
//-----------------------------------------------------------------
// llamamos al router : Router para crear manejadores de rutas montables y modulares. 
//Una instancia Router es un sistema de middleware y direccionamiento completo; 
//por este motivo, a menudo se conoce como una miniaplicación
var api = express.Router()

//------------------------USANDO MULTER------------------------

const storage = multer.diskStorage({//le decimos como va almacenar los archivos multer
    destination: path.join(__dirname, '../public/imagenes'), //el storage hay que pasarselo a multer para que lo pueda leer
    filename: (req, file, callBack) => {
        /* queremos guardar las imagenes en el servidor de una manera mas segura
         , por lo que podemos hacer uso de un modulo llamado crypto. Este nos genera un codigo hexadecimal
         que reemplaza al nombre original de la imagen. Esto a demás nos permitirá almacenar en la abse de dats de una manera mas clara*/
        const id = crypto.randomBytes(8).toString("hex");
        callBack(null, id + path.extname(file.originalname).toLocaleLowerCase()); // file.originalname
    }
})

const upload = multer({//le decimos donde va a colocar los archivos
    storage,
    dest: path.join(__dirname, '../public/imagenes'),
    limits: { fileSize: 3000000 }, // Tamaño máximo de 3 Mb
    fileFilter: (req, file, callBack) => {
        const filetypes = /jpeg|jpg|png/; //formatos que acepta
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return callBack(null, true)
        } else {
            callBack("Error: el archivo debe ser una imagen valida")
        }
    }
}).array('image', 5) //.single para subir 1 sola
// .sigle('image') la etiqueta image es el name="image" en el formulario


//asociación de rutas con controllers

//------------RUTAS HUGO---------------------------
api.get('/listarRegiones', Regiones.listarRegiones) //Ruta para obtener regiones
api.get('/listarComunas', Comunas.listarComuna) //Ruta para otener comunas
api.get('/obtenerCategorias', Categorias.obtenerCategorias) // Ruta para obtener categorias
api.get('/misAvisos', nuevoAviso.misAvisos)
api.post('/nuevoAviso',upload, nuevoAviso.nuevoAviso)
api.post('/editarAviso', editar.editarAviso )
api.delete('/eliminarAviso/:dato', editar.EliminarAviso)


//--------------------------------------------------

//TODOS LOS AVISOS ACTIVOS
api.get('/', avisoController.todoAvisos)
//FILTROS 
api.get('/filtros', avisoController.cargarFiltros)
//CATEGORIA
api.get('/:idCategoria/', avisoController.listarAvisoCategoria)
//AVISO INDIVIDUAL
api.get('/rev/:idAviso', avisoController.avisoIndividual)
//
api.post('/coment', avisoController.guardarComentario)
api.post('/valora', avisoController.guardarValoracion)
api.get('/inicio', avisoController.ultimosAvisos)

module.exports = api
