require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'customfit_d3',
});

// Endpoint JWT
app.post('/jwt-auth', async (req, res) => {
  const { correo_electronico } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM api_userprofile WHERE correo_electronico = ?',
      [correo_electronico]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = rows[0];

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET no definido');
      return res.status(500).json({ error: 'Error interno del servidor: JWT_SECRET no definido' });
    }

    const token = jwt.sign(
      { id: user.id, correo_electronico: user.correo_electronico, rol_id: user.rol_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user });
  } catch (err) {
    console.error('Error en /jwt-auth:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const authenticateToken = require('./middleware/auth');
const authorizeRole = require('./middleware/role');

app.get('/admin', authenticateToken, authorizeRole(2), (req, res) => {
  res.json({ message: 'Bienvenido, administrador!' });
});

app.listen(PORT, () => {
  console.log(`✅ Auth microservice corriendo en puerto ${PORT}`);
});
