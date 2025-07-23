const express = require('express');
const router = express.Router();
const { Documento, Cliente, Apolice } = require('../models');

router.get('/', async (req, res) => {
  const docs = await Documento.findAll({ include: [Cliente, Apolice] });
  res.json(docs);
});
router.post('/', async (req, res) => {
  try {
    const doc = await Documento.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
router.put('/:id', async (req, res) => {
  const doc = await Documento.findByPk(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Documento não encontrado' });
  await doc.update(req.body);
  res.json(doc);
});
router.delete('/:id', async (req, res) => {
  const doc = await Documento.findByPk(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Documento não encontrado' });
  await doc.destroy();
  res.json({ success: true });
});

module.exports = router;