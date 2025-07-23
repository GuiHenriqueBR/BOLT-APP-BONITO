const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cliente = sequelize.define('Cliente', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  cpf_cnpj: { type: DataTypes.STRING(20), unique: true, allowNull: false },
  email: { type: DataTypes.STRING(100) },
  telefone: { type: DataTypes.STRING(20) },
  endereco: { type: DataTypes.TEXT },
  data_nascimento: { type: DataTypes.DATEONLY },
  tipo: { type: DataTypes.ENUM('Física', 'Jurídica'), allowNull: false },
  criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'clientes',
  timestamps: false
});

module.exports = Cliente;