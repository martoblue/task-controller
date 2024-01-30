const Task = require('../models/Task');

const taskController = {
  createTask: async (req, res) => {
    try {
      const { titulo, descripcion, estado, fechaVencimiento } = req.body;
      if (!fechaVencimiento) {
        throw new Error('Fecha de vencimiento no proporcionada');
      }
      const fechaVencimientoISO8601 = new Date(fechaVencimiento).toISOString();

      const newTask = new Task({
        titulo,
        descripcion,
        estado,
        fechaVencimiento: fechaVencimientoISO8601,
      });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  getAllTask: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getTaskById: async (req, res) => {
    try {
      const { id } = req.params;
      if (id.length !== 24) {
        return res.status(404).json({
          msg: 'Id de usuario no válido',
          status: 404,
        });
      }
      const task = await Task.findById(id);
      if (!task) {
        res.status(404).json({
          message: 'Task not found',
        });
      } else {
        res.status(200).json(task);
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      if (id.length !== 24) {
        return res.status(404).json({
          msg: 'Id de usuario no válido',
          status: 404,
        });
      }
      const { estado } = req.body;
      if (!['pendiente', 'en progreso', 'completada'].includes(estado)) {
        throw new Error('Estado no proporcionado');
      }
      const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({
          message: 'Task not found',
        });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      if (id.length !== 24) {
        return res.status(404).json({
          msg: 'Id de usuario no válido',
          status: 404,
        });
      }
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        res.status(404).json({
          message: 'Task not found',
        });
      } else {
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = taskController;
