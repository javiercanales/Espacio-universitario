module.exports = function(sequelize, DataTypes) {
  const eu_imagenes=
   sequelize.define('eu_imagenes', {
    'ei_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'ei_cantidad_img': {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "null"
    },
    'ei_path_img1': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'ei_path_img2': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'ei_path_img3': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'ei_path_img4': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'ei_path_img5': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'eu_imagenes'
  })
  eu_imagenes.associate = function(models) {
    
  }
  return eu_imagenes
}
