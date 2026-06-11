const router = require('express').Router();
const pool   = require('../db/connection');
const auth   = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM agencias ORDER BY nombre');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM agencias WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', auth, async (req, res) => {
  const { nombre, municipio, direccion, telefono, email, sitio_web, descripcion, especialidad, registro_rnt } = req.body;
  if (!nombre || !municipio)
    return res.status(400).json({ error: 'nombre y municipio son requeridos' });
  try {
    const [result] = await pool.query(
      'INSERT INTO agencias (nombre, municipio, direccion, telefono, email, sitio_web, descripcion, especialidad, registro_rnt) VALUES (?,?,?,?,?,?,?,?,?)',
      [nombre, municipio, direccion, telefono, email, sitio_web, descripcion, especialidad, registro_rnt]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Agencia creada correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  const { nombre, municipio, direccion, telefono, email, sitio_web, descripcion, especialidad, registro_rnt, activo } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE agencias SET nombre=?, municipio=?, direccion=?, telefono=?, email=?, sitio_web=?, descripcion=?, especialidad=?, registro_rnt=?, activo=? WHERE id=?',
      [nombre, municipio, direccion, telefono, email, sitio_web, descripcion, especialidad, registro_rnt, activo, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Agencia actualizada correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM agencias WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Agencia eliminada correctamente' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
