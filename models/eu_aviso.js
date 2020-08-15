/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const eu_aviso= sequelize.define('eu_aviso', {
    'ea_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'ea_id_usuario': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null"
    },
    'ea_id_categ': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null"
    },
    'ea_id_comuna': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null"
    },
    'ea_id_imagenes': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null"
    },
    'ea_titulo': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'ea_descrip': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'ea_materia': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'ea_precio': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null"
    },
    'ea_estado': {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "null"
    },
    'ea_fecha_public': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "null"
    },
    'ea_fecha_expir': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "null"
    },
    'ea_fecha_ult_edi': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "null"
    },
    'ea_valoracion': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null"
    }
  }, {
    timestamps: false, //para que no agregue la fecha de creación y actualización
    freezeTableName: true, //para que no cambie el nombre de la tabla
    tableName: 'eu_aviso'
  }
  )

  eu_aviso.associate = function(models) {

    eu_aviso.belongsTo(models.eu_categoria_aviso, {
      foreignKey: 'ea_id_categ',
      targetKey: 'eca_id' 
    })
    
    eu_aviso.belongsTo(models.eu_usuario, {
      foreignKey: 'ea_id_usuario',
      targetKey: 'eus_id' 
    }
    )
    
    eu_aviso.belongsTo(models.eu_comuna, {
      foreignKey: 'ea_id_comuna',
      targetKey:'ec_id'
    })
    eu_aviso.belongsTo(models.eu_imagenes, {
      foreignKey:'ea_id_imagenes',
      targetKey:'ei_id'
    })
    eu_aviso.hasMany(models.eu_comenta_aviso,{
      foreignKey:'eco_id_aviso'
    })
    eu_aviso.hasMany(models.eu_valora_aviso, {
      foreignKey:'eva_id_aviso'
    })
  
  }
  return eu_aviso
}
