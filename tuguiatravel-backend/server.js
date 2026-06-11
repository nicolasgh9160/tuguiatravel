const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/api',              require('./routes/auth'));
app.use('/api/hoteles',      require('./routes/hoteles'));
app.use('/api/restaurantes', require('./routes/restaurantes'));
app.use('/api/agencias',     require('./routes/agencias'));

app.get('/', (req, res) => {
  res.json({ mensaje: 'TuguiaTravel API funcionando ✅', version: '1.0.0' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
