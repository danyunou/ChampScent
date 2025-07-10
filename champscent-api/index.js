const path = require('path');
const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const cartRoutes = require('./routes/cart'); 
require('./db/connection');
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/perfumeShop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/productos', productsRouter);
app.use('/images', express.static('public/images'));
app.use('/api/cart', cartRoutes);
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.use('/facturas', express.static(path.join(__dirname, 'facturas')));

const paypalRoutes = require('./routes/paypal');
app.use('/api/paypal', paypalRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
