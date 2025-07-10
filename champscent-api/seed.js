const mongoose = require('mongoose');
const Product = require('./models/productModel');

const perfumes = [
    {
        nombre: "Angel Share by Kilian",
        descripcion: "Desde las notas iniciales de aceite de coñac hasta las cálidas y reconfortantes notas de fondo de sándalo, praliné y vainilla, este perfume ofrece una experiencia olfativa compleja y evocadora.",
        precio: 5450,
        imagen: "http://localhost:3000/images/Angel-Share.jpg",
        stock: 5
    },

    {
        nombre: "Eros Flame by Versace",
        descripcion: "Es una fragancia cautivadora y seductora que combina la frescura cítrica con notas de especias intensas y maderas poderosas.",
        precio: 2970,
        imagen: "http://localhost:3000/images/Eros-Flame.jpg",
        stock: 5
    },

    {
        nombre: "Light Blue Summer Vibes by Dolce & Gabbana",
        descripcion: "Captura la energía fresca de una vacación en Italia a través de una vigorizante mezcla de cítricos mediterráneos y notas amaderadas.",
        precio: 2750,
        imagen: "http://localhost:3000/images/Light-Blue-Summer-Vibes.jpg",
        stock: 5
    }
];

mongoose.connect('mongodb://localhost:27017/perfumeShop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Conectado a MongoDB.');

  let insertados = 0;
  let existentes = 0;

  for (const perfume of perfumes) {
    const existe = await Product.findOne({ nombre: perfume.nombre });

    if (!existe) {
      await Product.create(perfume);
      insertados++;
    } else {
      existentes++;
    }
  }

  console.log(`✅ Perfumes insertados: ${insertados}`);
  console.log(`⚠️ Perfumes ya existentes: ${existentes}`);

  mongoose.disconnect();
}).catch(err => {
  console.error('Error al conectar o insertar:', err);
});
