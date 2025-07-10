const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Product = require('../models/productModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


router.post('/pagar', async (req, res) => {
  const { cart, userId } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: 'Carrito vacío.' });
  }

  try {
    let total = 0;
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<factura>\n  <clienteId>${userId}</clienteId>\n  <productos>\n`;

    for (const item of cart) {
      const id = item.id;
      const nombre = item.nombre;
      const cantidad = parseInt(item.cantidad);
      const precio = parseFloat(item.precio);

      if (isNaN(cantidad) || cantidad <= 0) {
        return res.status(400).json({ message: `Cantidad inválida para ${nombre}` });
      }

      const result = await Product.updateOne(
        { _id: new ObjectId(String(id)), stock: { $gte: cantidad } },
        { $inc: { stock: -cantidad } }
      );

      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: `Stock insuficiente para ${nombre}` });
      }

      xml += `    <producto>\n`;
      xml += `      <id>${id}</id>\n`;
      xml += `      <nombre>${nombre}</nombre>\n`;
      xml += `      <cantidad>${cantidad}</cantidad>\n`;
      xml += `      <precio>${precio}</precio>\n`;
      xml += `    </producto>\n`;

      total += cantidad * precio;
    }

    xml += `  </productos>\n  <total>${total.toFixed(2)}</total>\n</factura>`;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `factura-${userId}-${timestamp}.xml`;
    const filePath = path.join(__dirname, `../facturas/${fileName}`);

    fs.writeFileSync(filePath, xml);

    res.status(200).json({ message: 'Factura generada', factura: fileName });

  } catch (err) {
    console.error('❌ Error al procesar factura:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
