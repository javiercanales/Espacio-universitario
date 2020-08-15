module.exports = function(sequelize, DataTypes) {
  const eu_tema_foro=sequelize.define('eu_tema_foro', {
    'etf_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'etf_nombre': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'etf_fecha_creacion': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "null"
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_tema_foro'
  })
  return eu_tema_foro
}
