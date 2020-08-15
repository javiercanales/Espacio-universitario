const path = require('path');
const express=require('express') //es el framework de node.js utilizado
const bodyParser=require('body-parser')
const eu_aviso= require("./routes/avisoRoute"); //grupo de rutas asociada a avisos
const eu_foro= require("./routes/foroRoute") //grupo de rutas asociadas a foros
const inicio= require("./routes/inicioRoute") 
const cors=require('cors')
//const morgan = require('morgan')
const app=express()


//app.use(morgan('tiny'))


/*
Un middleware es una funci�n que se puede ejecutar antes o despu�s del manejo de una ruta. 
Esta funci�n tiene acceso al objeto Request, Response y la funci�n next().
Las funciones middleware suelen ser utilizadas como mecanismo para verificar niveles de 
acceso antes de entrar en una ruta, manejo de errores, validaci�n de datos, etc.
Para usar un middleware se hace a trav�s de app.use(middleware)
*/

//middlewares
//app.use(express.static(__dirname))
//
app.use(cors()) //permite acceder a la app desde un dominio distinto al que se encuentra alojado
app.use(express.json()); // Permite recibir par�metros en formato JSON.
app.use(express.urlencoded({ extended: true }))

//


//app.use('/', express.static(wwwPath));
//app.get('*', function (request, response){
//  response.sendFile(path.resolve(__dirname, 'index.html'))
//})


app.use('/avisos', eu_aviso);
app.use('/foros', eu_foro)
app.use('/', inicio)

//static files
app.use(express.static(path.join(__dirname, 'public')))/* aquí está la carpeta public(contiene las imagenes)
colocandola en modo publico podremos acceder a ella y así poder visualizar las fotos en las etiquetas <image>
pasandole la url o el path de la imagen guardada en postgres */

// Handles any requests that don't match the ones above
//app.get('/', function (req, res) {
//  res.sendFile(path.join(__dirname,'cliente', 'build', 'index.html'));
//});

const PORT=3000
app.listen(PORT,()=>{
    console.log("Corriendo en el puerto ",PORT)
})