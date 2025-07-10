const express = require('express');
const router = express.Router();
const { client } = require('../config/paypal');
const Product = require('../models/productModel');
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongoose').Types;

router.get('/client-id', (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

router.post('/create-order', async (req, res) => {
  const total = parseFloat(req.body.total);

  const request = new (require('@paypal/checkout-server-sdk').orders.OrdersCreateRequest)();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: total.toFixed(2)
      }
    }]
  });

  try {
    const response = await client().execute(request);
    res.json({ id: response.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear orden PayPal' });
  }
});

router.post('/capture-order', async (req, res) => {
  const { orderID, cart, userId } = req.body;

  const request = new (require('@paypal/checkout-server-sdk').orders.OrdersCaptureRequest)(orderID);
  request.requestBody({});

  try {
    const response = await client().execute(request);

    // ✅ Generar factura y actualizar stock
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `factura-${userId}-${timestamp}.xml`;
    const filePath = path.join(__dirname, `../facturas/${fileName}`);

    let total = 0;
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<factura>\n  <clienteId>${userId}</clienteId>\n  <productos>\n`;

    for (const item of cart) {
      const { id, nombre, cantidad, precio } = item;

      const result = await Product.updateOne(
        { _id: new ObjectId(String(id)), stock: { $gte: cantidad } },
        { $inc: { stock: -cantidad } }
      );

      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: `No hay suficiente stock para el producto con ID ${id}` });
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
    fs.writeFileSync(filePath, xml);

    res.status(200).json({ status: 'success', factura: fileName });
  } catch (err) {
    console.error('Error al capturar o generar factura:', err);
    res.status(500).json({ message: 'Error al capturar pago o generar factura' });
  }
});

// Endpoint para enviar el Client ID al frontend
router.get('/client-id', (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

module.exports = router;
