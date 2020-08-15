/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const eu_comenta_aviso= 
  sequelize.define('eu_comenta_aviso', {
    'eco_id_usuario': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'eco_id_aviso': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'eco_comentario': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'eco_fecha_com': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null",
      primaryKey: true
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_comenta_aviso'
  })
  
  eu_comenta_aviso.associate = function(models) {
    eu_comenta_aviso.belongsTo(models.eu_usuario, {
      foreignKey:'eco_id_usuario',
      targetKey: 'eus_id'
    })

    eu_comenta_aviso.belongsTo(models.eu_aviso, {
      foreignKey:'eco_id_aviso',
      targetKey: 'ea_id'
    })
      
  }
  return eu_comenta_aviso
}
