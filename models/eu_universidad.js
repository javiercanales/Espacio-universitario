module.exports = function(sequelize, DataTypes) {
  const eu_universidad= 
  sequelize.define('eu_universidad', {
    'eun_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'eun_nombre': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'eun_dominio_correo': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'eun_dominio_2': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'eun_fecha_creacion': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "null"
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_universidad'
  })
  return eu_universidad
}
