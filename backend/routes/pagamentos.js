const express = require('express');
const router = express.Router();
const { Pagamento, Apolice } = require('../models');

router.get('/', async (req, res) => {
  const pagamentos = await Pagamento.findAll({ include: [Apolice] });
  res.json(pagamentos);
});
router.post('/', async (req, res) => {
  try {
    const pagamento = await Pagamento.create(req.body);
    res.status(201).json(pagamento);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
router.put('/:id', async (req, res) => {
  const pagamento = await Pagamento.findByPk(req.params.id);
  if (!pagamento) return res.status(404).json({ error: 'Pagamento não encontrado' });
  await pagamento.update(req.body);
  res.json(pagamento);
});
router.delete('/:id', async (req, res) => {
  const pagamento = await Pagamento.findByPk(req.params.id);
  if (!pagamento) return res.status(404).json({ error: 'Pagamento não encontrado' });
  await pagamento.destroy();
  res.json({ success: true });
});

module.exports = router;