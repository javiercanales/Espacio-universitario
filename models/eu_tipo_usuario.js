module.exports = function(sequelize, DataTypes) {
  const eu_tipo_usuario=
   sequelize.define('eu_tipo_usuario', {
    'etu_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'etu_nombre': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'etu_descrip': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_tipo_usuario'
  })
  return eu_tipo_usuario
}
