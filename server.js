const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const taskRoutes = require('./routers/taskRouter');

const app = express();
const port = process.env.PORT ?? 3030;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error('No se pudo conectar a MongoDB'));

// Registro de rutas
app.use('/api/tasks', taskRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
