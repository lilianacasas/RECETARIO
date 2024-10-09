const User = require('../models/user.model');
const mongoose = require('mongoose'); // Importar mongoose para validar IDs

// Registrar usuario
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validar campos requeridos
        if (!name) {
            return res.status(400).json({ message: 'El nombre es requerido' });
        }
        if (!email) {
            return res.status(400).json({ message: 'El email es requerido' });
        }
        if (!password) {
            return res.status(400).json({ message: 'La contraseña es requerida' });
        }

        // Verificar si el email ya está en uso
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }

        // Crear y guardar el nuevo usuario
        const user = new User({ name, email, password });
        await user.save(); // Guardar usuario en la base de datos

        // Enviar respuesta de éxito
        res.status(201).json({ message: 'Usuario creado con éxito', user });
    } catch (error) {
        // Manejar errores de servidor
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // ID del usuario que se quiere actualizar

        // Validar si el ID es válido en formato
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de usuario no válido' });
        }

        // Obtener los nuevos datos
        const { name, email, password } = req.body;

        // Validar campos opcionales
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) updateData.password = password;

        // Actualizar usuario
        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
        }

        // Enviar respuesta de éxito
        res.json({ message: 'Usuario actualizado con éxito', user });
    } catch (error) {
        // Manejar errores de servidor
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
};

module.exports = { registerUser, updateUser };
