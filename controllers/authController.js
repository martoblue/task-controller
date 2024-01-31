const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

const generateToken = (user) => {
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    options,
  );
};

const authController = {
  signup: async (req, res) => {
    try {
      const newUser = new User(req.body);
      if (newUser.password.length < 6) {
        return res.status(400).json({
          message: 'La contraseña debe tener al menos 6 caracteres',
        });
      }
      await newUser.save();
      const token = generateToken(newUser);

      res.status(201).json({
        message: 'Usuario registrado con exito',
        token: token,
      });
    } catch {
      res.status(400).json({
        message: 'Error al registrar usuario',
      });
    }
  },
  login: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = (await User.findOne({ email })) ?? (await User.findOne({ username }));
      if (!user) {
        return res.status(401).json({
          message: 'Usuario no encontrado',
        });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          message: 'Contraseña incorrecta',
        });
      }
      const token = generateToken(user);
      res.status(200).json({
        message: 'Sesión iniciada correctamente',
        token: token,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};

module.exports = authController;
