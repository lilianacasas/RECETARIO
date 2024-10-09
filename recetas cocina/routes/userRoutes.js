const authController = require('../controllers/authcontroller'); // Importa el controlador de autenticación

const express = require('express');
const router = express.Router();
const { registerUser, updateUser } = require('../controllers/usercontrollers'); // Asegúrate de que la ruta sea correcta

const mongoose = require('mongoose');

// Registro de usuario
router.post('/', registerUser); // Cambié la ruta a '/' para usarla con '/users' en app.js

// Actualizar usuario
router.put('/:id', async (req, res, next) => { // Usar el parámetro de ID de forma correcta
    try {
        const id = req.params.id;

        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        // Llamada a la función updateUser para actualizar al usuario
        await updateUser(req, res, next);

    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
});

// Ruta para iniciar sesión
router.post('/login', authController.login); // Mantuvimos esta ruta igual

module.exports = router;


