const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const { getAllProducts } = require('../controllers/productsController');
const auth = require('../middleware/auth');

// Obtener productos
router.get('/', getAllProducts);

router.get('/:id', async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'No encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar producto' });
  }
});

// Crear producto
router.post('/', auth, async (req, res) => {
  try {
    const nuevo = new Product(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: 'No se pudo crear el producto', details: err });
  }
});

// Actualizar producto
router.put('/:id', auth, async (req, res) => {
  try {
    const actualizado = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar el producto', details: err });
  }
});

// Eliminar producto
router.delete('/:id', auth, async (req, res) => {
  try {
    const eliminado = await Product.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar el producto', details: err });
  }
});

module.exports = router;
