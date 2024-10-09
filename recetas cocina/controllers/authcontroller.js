// controllers/authController.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs'); // Si usas bcrypt para hashear las contraseñas
const jwt = require('jsonwebtoken'); // Si usas JWT para la autenticación

// Lógica para manejar el login de un usuario
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el email del usuario existe en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT (si se desea)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,  // Asegúrate de tener esta variable en tu .env
            { expiresIn: '3h' } // El token expira en tres horas
        );

        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

module.exports = { login };
