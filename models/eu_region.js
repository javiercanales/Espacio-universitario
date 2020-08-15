module.exports = function(sequelize, DataTypes) {
  const eu_region= 
  sequelize.define('eu_region', {
    'er_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'er_nombre': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_region'
  })
  return eu_region
}
