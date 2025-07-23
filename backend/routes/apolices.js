const express = require('express');
const router = express.Router();
const { Apolice, Cliente, TipoSeguro } = require('../models');

// Listar todas
router.get('/', async (req, res) => {
  const apolices = await Apolice.findAll({ include: [Cliente, TipoSeguro] });
  res.json(apolices);
});
// Buscar por ID
router.get('/:id', async (req, res) => {
  const apolice = await Apolice.findByPk(req.params.id, { include: [Cliente, TipoSeguro] });
  if (!apolice) return res.status(404).json({ error: 'Apólice não encontrada' });
  res.json(apolice);
});
// Criar
router.post('/', async (req, res) => {
  try {
    const apolice = await Apolice.create(req.body);
    res.status(201).json(apolice);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
// Atualizar
router.put('/:id', async (req, res) => {
  const apolice = await Apolice.findByPk(req.params.id);
  if (!apolice) return res.status(404).json({ error: 'Apólice não encontrada' });
  await apolice.update(req.body);
  res.json(apolice);
});
// Deletar
router.delete('/:id', async (req, res) => {
  const apolice = await Apolice.findByPk(req.params.id);
  if (!apolice) return res.status(404).json({ error: 'Apólice não encontrada' });
  await apolice.destroy();
  res.json({ success: true });
});

module.exports = router;