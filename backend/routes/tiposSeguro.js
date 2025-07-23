const express = require('express');
const router = express.Router();
const { TipoSeguro } = require('../models');

router.get('/', async (req, res) => {
  const tipos = await TipoSeguro.findAll();
  res.json(tipos);
});
router.post('/', async (req, res) => {
  try {
    const tipo = await TipoSeguro.create(req.body);
    res.status(201).json(tipo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
router.put('/:id', async (req, res) => {
  const tipo = await TipoSeguro.findByPk(req.params.id);
  if (!tipo) return res.status(404).json({ error: 'Tipo não encontrado' });
  await tipo.update(req.body);
  res.json(tipo);
});
router.delete('/:id', async (req, res) => {
  const tipo = await TipoSeguro.findByPk(req.params.id);
  if (!tipo) return res.status(404).json({ error: 'Tipo não encontrado' });
  await tipo.destroy();
  res.json({ success: true });
});

module.exports = router;