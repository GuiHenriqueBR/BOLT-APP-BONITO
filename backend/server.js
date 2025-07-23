const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./database');
const models = require('./models');

const clientesRouter = require('./routes/clientes');
const apolicesRouter = require('./routes/apolices');
const tiposSeguroRouter = require('./routes/tiposSeguro');
const pagamentosRouter = require('./routes/pagamentos');
const documentosRouter = require('./routes/documentos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/clientes', clientesRouter);
app.use('/api/apolices', apolicesRouter);
app.use('/api/tipos-seguro', tiposSeguroRouter);
app.use('/api/pagamentos', pagamentosRouter);
app.use('/api/documentos', documentosRouter);

app.get('/', (req, res) => {
  res.send('API CRM Corretora de Seguros rodando!');
});

sequelize.sync().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
  });
});