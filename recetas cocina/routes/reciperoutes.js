const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe.model');
const mongoose = require('mongoose');

// Obtener todas las recetas
router.get('/', async (req, res) => {  // Cambié '/recipes' por '/' porque ahora está bajo '/recipes' en app.js
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.json(recipes); // Devuelve las recetas ordenadas por fecha de creación
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener recetas' });
    }
});

// Crear nueva receta
router.post('/', async (req, res) => {  // Cambié '/recipes' por '/' para simplificar
    try {
        const { title, description, ingredients, instructions } = req.body;

        // Verificar que todos los campos obligatorios estén presentes
        if (!title || !description || !ingredients || !instructions) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        // Crear una nueva instancia de receta
        const recipe = new Recipe(req.body);
        await recipe.save(); // Guardar en la base de datos
        res.status(201).json(recipe); // Devolver la receta creada con el estado 201
    } catch (error) {
        res.status(500).json({ message: 'Error al crear receta' });
    }
});

// Obtener receta por ID
router.get('/:id', async (req, res) => {  // Usar el parámetro de ID de forma correcta
    try {
        const id = req.params.id;

        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        // Buscar la receta por ID
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.json(recipe); // Devolver la receta encontrada
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener receta' });
    }
});

// Actualizar receta
router.put('/:id', async (req, res) => {  // Usar el parámetro de ID de forma correcta
    try {
        const id = req.params.id;

        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const { title, description, ingredients, instructions } = req.body;

        // Verificar que todos los campos requeridos estén presentes
        if (!title || !description || !ingredients || !instructions) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        // Actualizar la receta en la base de datos
        const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.json(recipe); // Devolver la receta actualizada
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar receta' });
    }
});

// Borrar receta
router.delete('/:id', async (req, res) => {  // Usar el parámetro de ID de forma correcta
    try {
        const id = req.params.id;

        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        // Buscar y eliminar la receta por ID
        const recipe = await Recipe.findByIdAndRemove(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.json({ message: 'Receta eliminada' }); // Confirmar la eliminación
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar receta' });
    }
});

module.exports = router;
