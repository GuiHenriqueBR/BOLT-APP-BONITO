const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Apolice = sequelize.define('Apolice', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cliente_id: { type: DataTypes.INTEGER, allowNull: false },
  tipo_seguro_id: { type: DataTypes.INTEGER, allowNull: false },
  numero_apolice: { type: DataTypes.STRING(50), allowNull: false },
  ci: { type: DataTypes.STRING(50) },
  inicio: { type: DataTypes.DATEONLY },
  fim: { type: DataTypes.DATEONLY },
  valor: { type: DataTypes.DECIMAL(10,2) },
  situacao: { type: DataTypes.ENUM('Vigente', 'Vencida', 'Cancelada'), defaultValue: 'Vigente' },
  pdf_path: { type: DataTypes.STRING(255) },
  // Campos de veículo (opcionais)
  veiculo_marca: { type: DataTypes.STRING(50) },
  veiculo_modelo: { type: DataTypes.STRING(50) },
  veiculo_ano: { type: DataTypes.STRING(10) },
  veiculo_placa: { type: DataTypes.STRING(20) },
  veiculo_chassi: { type: DataTypes.STRING(50) },
  forma_pagamento: { type: DataTypes.STRING(30) }
}, {
  tableName: 'apolices',
  timestamps: false
});

module.exports = Apolice;