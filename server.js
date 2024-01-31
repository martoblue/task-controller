const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const taskRoutes = require('./routers/taskRoutes');
const authRoutes = require('./routers/authRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT ?? 3030;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error('No se pudo conectar a MongoDB'));

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).send({ message: 'No token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: 'Token invalido' });
    }
    req.user = user;
    next();
  });
};

app.use('/api/users', authRoutes);

// Registro de rutas
app.use('/api/tasks', authenticateToken, taskRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
