const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const TipoSeguro = sequelize.define('TipoSeguro', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(50), allowNull: false }
}, {
  tableName: 'tipos_seguro',
  timestamps: false
});

module.exports = TipoSeguro;