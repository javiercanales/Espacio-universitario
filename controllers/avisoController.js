//acá se cargan los modelo para usarlos después
const {eu_aviso}= require('../models')
const {eu_categoria_aviso}=require('../models')
const {eu_usuario}=require('../models')
const {eu_region}=require('../models')
const {eu_comuna}=require('../models')
const {eu_universidad}=require('../models')
const {eu_imagenes} = require('../models/')
const { Op } = require("sequelize")
const {eu_comenta_aviso}=require('../models')
const {eu_valora_aviso}=require('../models')
//ENVÍA TODOS LOS AVISOS ACTIVOS
function todoAvisos(req,res){
   eu_aviso.findAll({
    where:{ea_estado: true,
          ea_fecha_expir:{
          [Op.gte]: Date.now()
    }
  },
    include:[
      {
      model: eu_imagenes,
      attributes: ['ei_cantidad_img','ei_path_img1','ei_path_img2','ei_path_img3','ei_path_img4','ei_path_img5']
    },
    {
      model:eu_comuna,
      attributes:['ec_nombre'],
      include:{
        model:eu_region,
        attributes:['er_nombre','er_id']}
    },
    {
      model: eu_usuario,
      attributes:['eus_id','eus_nombre','eus_apellido_pat','eus_apellido_mat','eus_correo','eus_valoracion'],
      include:{
        model: eu_universidad,
        attributes:['eun_nombre','eun_id']
      }
    }
    
  ]}) .then(avisos=>{
      res.status(200).json({
        status: 'success',
        data:{todosAvisos:avisos}
      }
        )
       
  })
      .catch(err=>res.json(err))
 }


//ENVÍA LOS CAMPOS DE LOS FILTROS  
async function cargarFiltros(req,res){
 var data
  var com= await eu_comuna.findAll({
    attributes:['ec_id','ec_id_region','ec_nombre']
  })

  var un=await eu_universidad.findAll({
    attributes:['eun_id','eun_nombre']
  })
  
  var reg=await eu_region.findAll({
    attributes:['er_id','er_nombre']
  })

  data={
      comunas: com,
      universidades: un,
      regiones:reg
    }
  
   
  res.status(200).json({status:'success',data:{data}})   
  
}

 

//ENVIA TODOS LOS AVISOS SEGUN LA CATEGORIA
function listarAvisoCategoria(req,res){
  let cat=req.params.idCategoria

  eu_aviso.findAll({
    order: [
      ['ea_fecha_public', 'DESC']],
    where:{ea_estado: true, ea_id_categ:cat},
    ea_fecha_expir:{
      [Op.gte]: Date.now()
    },
    include:[
      {
      model: eu_imagenes,
      attributes: ['ei_cantidad_img','ei_path_img1','ei_path_img2','ei_path_img3','ei_path_img4','ei_path_img5']
    },
    {model: eu_categoria_aviso,
      attributes:['eca_nombre']
    },
    {
      model:eu_comuna,
      attributes:['ec_nombre'],
      include:{
        model:eu_region,
        attributes:['er_nombre','er_id']}
    },
    {
      model: eu_usuario,
      attributes:['eus_id','eus_nombre','eus_apellido_pat','eus_apellido_mat','eus_correo','eus_valoracion'],
      include:{
        model: eu_universidad,
        attributes:['eun_nombre','eun_id']
      }
    }
    
  ]}) .then(avisos=>{
    res.status(200).json({
      status: 'success',
      data:{todosAvisos:avisos}
    }
      )
       
  }

      
     )
      .catch(err=>res.json(err))

        
}
function avisoIndividual(req,res){
  let idAviso=req.params.idAviso
  eu_aviso.findAll({
      where:{ea_id:idAviso},
      
      include:[
        {
        model: eu_imagenes,
        attributes: ['ei_cantidad_img','ei_path_img1','ei_path_img2','ei_path_img3','ei_path_img4','ei_path_img5']
      }, 
      {
        model: eu_usuario,
        attributes:['eus_id','eus_nombre','eus_apellido_pat','eus_apellido_mat','eus_correo','eus_valoracion'],
        include:{
          model: eu_universidad,
          attributes:['eun_nombre','eun_id']
        }
     },
     {model: eu_categoria_aviso,
      attributes:['eca_nombre']
    },
    {
      model:eu_comuna,
      attributes:['ec_nombre'],
      include:{
        model:eu_region,
        attributes:['er_nombre','er_id']}
    }, 
    
    {
      model:eu_comenta_aviso,
      order: [
        ['eco_fecha_com', 'DESC']],
      attributes:['eco_id_aviso','eco_comentario','eco_fecha_com'],
      include:{
        model: eu_usuario,
        attributes:['eus_correo']

      }
        
    },
    {
      model: eu_valora_aviso,
      order: [
        ['eva_fecha_valorac', 'DESC']],
      attributes:['eva_valorac','eva_comentario','eva_fecha_valorac'],
      include:{
        model: eu_usuario,  
       attributes: ['eus_correo']
      }
    }
    ]
    
    }) .then(aviso=>{
    res.status(200).json({
      status: 'success',
      data:{aviso:aviso}
    }
      )
       
  }

      
     )
      .catch(err=>res.json(err))

     
}

function guardarComentario (req,res){
  const usuario=req.body.idUsuario
  const aviso=req.body.idAviso
  const comentario=req.body.comentario
  const fecha=req.body.fecha
  
 eu_comenta_aviso.create({ 
    eco_id_usuario: usuario, 
    eco_id_aviso:aviso,
    eco_comentario:comentario,
    eco_fecha_com:fecha
     }).then(coment=>res.status(200).send('Tupla insertada exitosamente'))
    .catch(error=>res.json(error))

}

function ultimosAvisos(req,res){

  eu_aviso.findAll(
  {
  where:{ea_estado: true,
  ea_fecha_expir:{
  [Op.gte]: Date.now()
  },
 
  },
  include:[
    {
    model: eu_imagenes,
    attributes: ['ei_cantidad_img','ei_path_img1','ei_path_img2','ei_path_img3','ei_path_img4','ei_path_img5']
  },
  {model: eu_categoria_aviso,
    attributes:['eca_nombre']
  },
  {
    model:eu_comuna,
    attributes:['ec_nombre'],
    include:{
      model:eu_region,
      attributes:['er_nombre','er_id']}
  },
  {
    model: eu_usuario,
    attributes:['eus_id','eus_nombre','eus_apellido_pat','eus_apellido_mat','eus_correo','eus_valoracion'],
    include:{
      model: eu_universidad,
      attributes:['eun_nombre','eun_id']
    }
  } 
] ,
  limit:4,
  order: [
  ['ea_fecha_public', 'DESC']]

}


).then(avisos=>{
  res.status(200).json({
    status: 'success',
    data:{todosAvisos:avisos}
  }
    )
   
})
.catch(error=>res.json(error))





}



   
  

async function guardarValoracion(req,res){
  //RECIBIR PARAMETROS DESDE EL FORMULARIO
  const usuario=req.body.idUsuario
  const aviso=req.body.idAviso
  const puntaje=req.body.puntaje
  const comentario=req.body.comentario
  const fecha=req.body.fecha
 //INSERTAR EN LAS VALORACIONES
 //VER SI EL QUE ESTA INTENTANDO VALORAR ES EL MISMO QUE PUBLICÓ EL ANUNCIO 
 const anunciante= await eu_aviso.count({
    where:{ea_id:aviso,
    ea_id_usuario: usuario
    }
  })
//console.log('anunciante igual a valorante',anunciante)
if(anunciante==0){
  //EL QUE ESTA VALORANDO NO PUEDE SER EL QUE PUBLICÓ EL ANUNCIO
  const insertValoracion = await eu_valora_aviso.create({ 
    eva_id_usuario:usuario,
    eva_id_aviso:aviso,
    eva_valorac:puntaje,
    eva_comentario:comentario,
    eva_fecha_valorac :fecha
     }).then(valora=>{
       //SI LA TUPLA SE PUDO INSERTAR, SE ACTUALIZA EL PUNTAJE DEL AVISO Y DEL USUARIO
      actualizaPuntaje(aviso,usuario,puntaje) 
      res.status(200).send(
       {mensaje:'Gracias, tu valoración ha sido registrada',
       error:''
      })})
    .catch(error=>{
      //SI HAY ERROR ENVIA MENSAJE AL USUARIO
      res.status(200).send({mensaje:'',
      error:'!UPS!, ya valoraste este anuncio antes'})
  })
}
else{
  res.status(200).send(
    {
      mensaje:'',
      error:'¡No puedes valorar tu propio anuncio!'
    }
  )
}
  
  
}

async function actualizaPuntaje(idAviso,idUsuario,puntaje){
 
 ///1. ACTUALIZACION DEL PUNTAJE DEL AVISO
 //A) CONTAR CANTIDAD DE VALORACIONES DEL AVISO 
  const divAviso=await eu_valora_aviso.count({
   where:{eva_id_aviso:idAviso}
 })

//B) SUMAR LAS VALORACIONES PARA EL AVISO
const sumAviso=await eu_valora_aviso.sum('eva_valorac',
{where:{eva_id_aviso:idAviso}

})
//C) OBTENER EL PROMEDIO DE LA VALORACION DEL AVISO
const promedioAviso=await parseInt(sumAviso/divAviso)

//D) ACTUALIZAR EL PUNTAJE DEL AVISO EN LA TABLA DE AVISOS
const updatePuntajeAviso=await eu_aviso.update(
  {
    ea_valoracion:promedioAviso
  }
,{
  where:{
  ea_id:idAviso
}
}
)

//2. ACTUALIZACION PUNTAJE DEL ANUNCIANTE
//A)DETERMINAR EL ANUNCIANTE DEL ANUNCIO ACTUALIZADO
const queryIdPublicador=await eu_aviso.findOne({
  attributes:['ea_id_usuario'],
  where:{ea_id:idAviso}
})

const idPublicador=await queryIdPublicador.dataValues.ea_id_usuario

//B) DETERMINAR CANTIDAD DE AVISOS TOTALES DEL ANUNCIANTE
const divPublicador=await eu_aviso.count({
  where:{ea_id_usuario:idPublicador}
})

//C) SUMAR PUNTAJE DE LOS ANUNCIOS DEL ANUNCIANTE
const sumPublicador=await eu_aviso.sum('ea_valoracion',{
  where:{ea_id_usuario:idPublicador}
})

//D) CALCULAR PUNTAJE PROMEDIO DEL ANUNCIANTE
const promedioPublicador=await parseInt(sumPublicador/divPublicador)

console.log('promedio publicado',promedioPublicador,'sum publica',sumPublicador,'div',divPublicador,'usuario',idPublicador)
//E) ACTUALIZAR PUNTAJE PROMEDIO DEL ANUNCIANTE
const updatePuntajePublicador=await eu_usuario.update(
  {
    eus_valoracion:promedioPublicador
  }
,{
  where:{
  eus_id:idPublicador}
}
)


 
}

module.exports={
    guardarComentario,
    guardarValoracion,
    listarAvisoCategoria,
    todoAvisos,
    avisoIndividual,
    cargarFiltros,
    ultimosAvisos
}