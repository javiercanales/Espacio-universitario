module.exports = function(sequelize, DataTypes) {
  const eu_denuncia_aviso=
   sequelize.define('eu_denuncia_aviso', {
    'eda_id_usuario': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'eda_id_aviso': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'eda_comentario': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'eda_fecha_denuncia': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "null"
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_denuncia_aviso'
  })

  eu_denuncia_aviso.associate = function(models) {
    eu_denuncia_aviso.belongsTo(models.eu_usuario, {
      foreignKey:'eda_id_usuario',
      targetKey: 'eus_id'
    })

    eu_denuncia_aviso.belongsTo(models.eu_aviso, {
      foreignKey:'eda_id_aviso',
      targetKey: 'ea_id'
    })
      
  }
  return eu_denuncia_aviso
}
