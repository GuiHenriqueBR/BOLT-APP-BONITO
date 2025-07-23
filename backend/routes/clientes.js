const express = require('express');
const router = express.Router();
const { Cliente } = require('../models');

// Listar todos
router.get('/', async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
});
// Buscar por ID
router.get('/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  res.json(cliente);
});
// Criar
router.post('/', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
// Atualizar
router.put('/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  await cliente.update(req.body);
  res.json(cliente);
});
// Deletar
router.delete('/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  await cliente.destroy();
  res.json({ success: true });
});

module.exports = router;