/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  eu_categoria_aviso= 
  sequelize.define('eu_categoria_aviso', {
    'eca_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'eca_nombre': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'eca_fecha_creacion': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "null"
    }
  }, { 
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_categoria_aviso'
  })
  return eu_categoria_aviso
}
