module.exports = function(sequelize, DataTypes) {
  const eu_valora_aviso= 
  sequelize.define('eu_valora_aviso', {
    'eva_id_usuario': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'eva_id_aviso': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'eva_valorac': {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "null"
    },
    'eva_comentario': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'eva_fecha_valorac': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "null"
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_valora_aviso'
  })
  eu_valora_aviso.associate = function(models) {

    eu_valora_aviso.belongsTo(models.eu_usuario, {
      foreignKey:'eva_id_usuario',
      targetKey: 'eus_id'
    })

    eu_valora_aviso.belongsTo(models.eu_aviso, {
      foreignKey:'eva_id_aviso',
      targetKey: 'ea_id'
    })
   
  }
  return eu_valora_aviso
}
