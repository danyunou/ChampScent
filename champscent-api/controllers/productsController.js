const Product = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener perfumes' });
    }
};

module.exports = { getAllProducts };
