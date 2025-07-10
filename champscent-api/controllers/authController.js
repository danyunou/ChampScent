const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro
exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password, rol, preguntaSeguridad, respuestaSeguridad } = req.body;
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ error: 'Usuario ya existe' });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ nombre, email, password: hash, rol, preguntaSeguridad, respuestaSeguridad });
    await user.save();
    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar', details: err });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

  const valido = await bcrypt.compare(password, user.password);
  if (!valido) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, rol: user.rol });
};

// Recuperación
exports.recuperar = async (req, res) => {
  const { email, preguntaSeguridad, nuevaPassword, respuestaSeguridad } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.preguntaSeguridad !== preguntaSeguridad || user.respuestaSeguridad !== respuestaSeguridad) {
    return res.status(400).json({ error: 'Datos incorrectos' });
  }
  const hash = await bcrypt.hash(nuevaPassword, 10);
  user.password = hash;
  await user.save();
  res.json({ mensaje: 'Contraseña actualizada' });
};
