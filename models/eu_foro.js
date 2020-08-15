module.exports = function(sequelize, DataTypes) {
  const eu_foro=
  sequelize.define('eu_foro', {
     'ef_id': {
       type: DataTypes.INTEGER,
       allowNull: false,
       comment: "null",
       primaryKey: true,
       autoIncrement: true
     },
     'ef_id_creador': {
       type: DataTypes.INTEGER,
       allowNull: false,
       comment: "null"
     },
     'ef_id_tema': {
       type: DataTypes.INTEGER,
       allowNull: true,
       comment: "null"
     },
     'ef_titulo': {
       type: DataTypes.STRING,
       allowNull: true,
       comment: "null"
     },
     'ef_descrip': {
       type: DataTypes.STRING,
       allowNull: true,
       comment: "null"
     },
     'ef_estado': {
       type: DataTypes.BOOLEAN,
       allowNull: true,
       comment: "null"
     },
     'ef_fecha_creacion': {
       type: DataTypes.DATEONLY,
       allowNull: true,
       comment: "null"
     },
     'ef_fecha_cierre': {
       type: DataTypes.DATEONLY,
       allowNull: true,
       comment: "null"
     },
     'ef_id_usuario_cierre': {
       type: DataTypes.INTEGER,
       allowNull: true,
       comment: "null"
     }
   }, {
     timestamps: false,
     freezeTableName: true,
     tableName: 'eu_foro'
   })
   eu_foro.associate = function(models) {
     eu_foro.belongsTo(models.eu_tema_foro, {
       foreignKey:'ef_id_tema',
       targetKey: 'etf_id'
     })
 
     eu_foro.belongsTo(models.eu_usuario, {
       targetKey:'eus_id',
       foreignKey: 'ef_id_usuario_cierre'
     })
     
 
     eu_foro.belongsTo(models.eu_usuario, {
       targetKey:'eus_id',
       foreignKey: 'ef_id_creador'
     })
   }
   return eu_foro
 }
 