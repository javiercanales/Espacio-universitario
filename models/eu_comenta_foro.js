module.exports = function(sequelize, DataTypes) {
  const eu_comenta_foro= 
  sequelize.define('eu_comenta_foro', {
    'ecf_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'ecf_id_foro': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'ecf_comentario': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "null"
    },
    'ecf_fecha_com': {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "null"
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_comenta_foro'
  })
 
  eu_comenta_foro.associate = function(models) {
    eu_comenta_foro.belongsTo(models.eu_usuario, {
      targetKey:'eus_id',
      foreignKey: 'ecf_id'
    })
    eu_comenta_foro.belongsTo(models.eu_foro, {
      targetKey:'ef_id',
      foreignKey: 'ecf_id_foro'
    })
  }
  return eu_comenta_foro
}
