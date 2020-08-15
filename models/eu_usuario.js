module.exports = function(sequelize, DataTypes) {
  const eu_usuario= 
  sequelize.define('eu_usuario', {
    'eus_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'eus_id_tipo': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null"
    },
    'eus_id_univ': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null"
    },
    'eus_nombre': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'eus_apellido_pat': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'eus_apellido_mat': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'eus_correo': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'eus_contrasena': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'eus_valoracion': {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "null"
    },
    'eus_telefono': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_usuario'
  })
  eu_usuario.associate = function(models) {
    eu_usuario.belongsTo(models.eu_tipo_usuario, {
      targetKey:'etu_id',
      foreignKey: 'eus_id_tipo'
    })
    eu_usuario.belongsTo(models.eu_universidad, {
      targetKey:'eun_id',
      foreignKey: 'eus_id_univ'
    })
    /*
    eu_usuario.hasMany(models.eu_valora_aviso, {
      foreignKey:'eva_id_usuario',
      targetKey:'eus_id'
    })
    
    eu_usuario.hasMany(models.eu_comenta_aviso, {
      foreignKey:'eco_id_usuario',
     
    })
*/
 
  }
  return eu_usuario
}
