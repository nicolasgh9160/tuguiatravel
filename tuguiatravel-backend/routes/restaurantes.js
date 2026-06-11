const router = require('express').Router();
const pool   = require('../db/connection');
const auth   = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM restaurantes ORDER BY nombre');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM restaurantes WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', auth, async (req, res) => {
  const { nombre, municipio, direccion, telefono, email, sitio_web, descripcion, tipo_cocina } = req.body;
  if (!nombre || !municipio)
    return res.status(400).json({ error: 'nombre y municipio son requeridos' });
  try {
    const [result] = await pool.query(
      'INSERT INTO restaurantes (nombre, municipio, direccion, telefono, email, sitio_web, descripcion, tipo_cocina) VALUES (?,?,?,?,?,?,?,?)',
      [nombre, municipio, direccion, telefono, email, sitio_web, descripcion, tipo_cocina]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Restaurante creado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  const { nombre, municipio, direccion, telefono, email, sitio_web, descripcion, tipo_cocina, activo } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE restaurantes SET nombre=?, municipio=?, direccion=?, telefono=?, email=?, sitio_web=?, descripcion=?, tipo_cocina=?, activo=? WHERE id=?',
      [nombre, municipio, direccion, telefono, email, sitio_web, descripcion, tipo_cocina, activo, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Restaurante actualizado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM restaurantes WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Restaurante eliminado correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
