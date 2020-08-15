module.exports = function(sequelize, DataTypes) {
  const eu_modera_foro=sequelize.define('eu_modera_foro', {
    'emf_id_usuario': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'emf_id_foro': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'emf_accion': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'emf_fecha_mod': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "null"
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_modera_foro'
  })

  eu_modera_foro.associate = function(models) {
    eu_modera_foro.belongsTo(models.eu_foro, {
      targetKey:'ef_id',
      foreignKey: 'emf_id_foro'
    })
  
    eu_modera_foro.belongsTo(models.eu_usuario, {
      targetKey:'eus_id',
      foreignKey: 'emf_id_usuario'
    })
  }
  return eu_modera_foro
}
