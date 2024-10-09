const mongoose = require('mongoose');

// Definir el esquema de 

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Título de la receta (requerido)
    description: { type: String }, // Descripción de la receta (opcional)
    ingredients: { type: [String], required: true }, // Ingredientes (arreglo de strings, requerido)
    instructions: { type: [String], required: true }, // Instrucciones (arreglo de strings, requerido)
    category: { type: String, index: true } // Categoría (opcional, con índice para búsqueda)
});

// Crear el modelo de receta basado en el esquema
const Recipe = mongoose.model('Recipe', recipeSchema);

// Exportar el modelo para su uso en otros archivos
module.exports = Recipe;
