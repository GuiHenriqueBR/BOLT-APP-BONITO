const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Documento = sequelize.define('Documento', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cliente_id: { type: DataTypes.INTEGER },
  apolice_id: { type: DataTypes.INTEGER },
  tipo: { type: DataTypes.STRING(50) },
  caminho_arquivo: { type: DataTypes.STRING(255), allowNull: false }
}, {
  tableName: 'documentos',
  timestamps: false
});

module.exports = Documento;