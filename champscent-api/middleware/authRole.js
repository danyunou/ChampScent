const jwt = require('jsonwebtoken');

function verificarRol(roles = []) {
  return (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Sin token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!roles.includes(decoded.rol)) return res.status(403).json({ error: 'Acceso denegado' });
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Token inválido' });
    }
  };
}

module.exports = verificarRol;
