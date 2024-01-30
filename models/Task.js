const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, default: '' },
  estado: {
    type: String,
    enum: ['pendiente', 'completada', 'cancelada', 'en progreso'],
    default: 'pendiente',
  },
  fechaCreacion: { type: Date, default: Date.now },
  fechaVencimiento: { type: Date, default: null },
});

module.exports = mongoose.model('Task', taskSchema);
