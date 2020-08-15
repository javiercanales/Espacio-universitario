module.exports = function(sequelize, DataTypes) {
  const eu_comuna=sequelize.define('eu_comuna', {
    'ec_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'ec_id_region': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null"
    },
    'ec_nombre': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_comuna'
  })
  eu_comuna.associate = function(models) {
    eu_comuna.belongsTo(models.eu_region, {
      foreignKey:'ec_id_region',
      targetKey: 'er_id'
    })  
  }
  return eu_comuna
}
