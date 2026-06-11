const router  = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const pool    = require('../db/connection');

// POST /api/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email y contraseña requeridos' });

  try {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ? AND activo = 1', [email]
    );
    if (!rows.length)
      return res.status(401).json({ error: 'Credenciales inválidas' });

    const usuario = rows[0];
    const ok = await bcrypt.compare(password, usuario.password_hash);
    if (!ok)
      return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    res.json({ token, nombre: usuario.nombre, rol: usuario.rol });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
