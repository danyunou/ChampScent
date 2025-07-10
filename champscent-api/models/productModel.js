const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    imagen: String,
    stock: Number 
    
});

module.exports = mongoose.model('Product', productSchema);
