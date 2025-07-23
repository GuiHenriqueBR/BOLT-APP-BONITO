const Cliente = require('./Cliente');
const TipoSeguro = require('./TipoSeguro');
const Apolice = require('./Apolice');
const Pagamento = require('./Pagamento');
const Documento = require('./Documento');

// Associações
Cliente.hasMany(Apolice, { foreignKey: 'cliente_id' });
Apolice.belongsTo(Cliente, { foreignKey: 'cliente_id' });

TipoSeguro.hasMany(Apolice, { foreignKey: 'tipo_seguro_id' });
Apolice.belongsTo(TipoSeguro, { foreignKey: 'tipo_seguro_id' });

Apolice.hasMany(Pagamento, { foreignKey: 'apolice_id' });
Pagamento.belongsTo(Apolice, { foreignKey: 'apolice_id' });

Cliente.hasMany(Documento, { foreignKey: 'cliente_id' });
Documento.belongsTo(Cliente, { foreignKey: 'cliente_id' });

Apolice.hasMany(Documento, { foreignKey: 'apolice_id' });
Documento.belongsTo(Apolice, { foreignKey: 'apolice_id' });

module.exports = {
  Cliente,
  TipoSeguro,
  Apolice,
  Pagamento,
  Documento
};