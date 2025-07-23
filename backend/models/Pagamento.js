const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Pagamento = sequelize.define('Pagamento', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  apolice_id: { type: DataTypes.INTEGER, allowNull: false },
  valor: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  vencimento: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('Pago', 'Pendente', 'Atrasado'), defaultValue: 'Pendente' }
}, {
  tableName: 'pagamentos',
  timestamps: false
});

module.exports = Pagamento;