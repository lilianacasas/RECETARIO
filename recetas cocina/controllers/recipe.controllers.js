// Crear Receta
const crearReceta = async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;

    // Verificar si faltan campos requeridos
    if (!title) {
      return res.
        status(400).json({ message: 'El campo "título" es requerido' });
    }
    if (!description) {
      return res.status(400).json({ message: 'El campo "descripción" es requerido' });
    }
    if (!ingredients) {
      return res.status(400).json({ message: 'El campo "ingredientes" es requerido' });
    }
    if (!instructions) {
      return res.status(400).json({ message: 'El campo "instrucciones" es requerido' });
    }

    // Crear la receta con los datos enviados
    const recipe = new Recipe(req.body);
    await recipe.save();  // Guardar la receta en la base de datos
    res.json({ message: 'Receta creada con éxito', recipe });

  } catch (error) {
    res.status(500).json({ message: 'Error al crear receta', error });
  }
};

// Eliminar Receta
const eliminarReceta = async (req, res) => {
  try {
    const recipeId = req.params.id;

    // Validar si el ID de la receta es válido
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: 'ID de receta no válido' });
    }

    // Buscar y eliminar la receta por su ID
    const recipe = await Recipe.findByIdAndRemove(recipeId);
    if (!recipe) {
      res.status(404).json({ message: Receta con ID ${ recipeId } no encontrada });
  } else {
    res.json({ message: 'Receta eliminada con éxito' });
  }
} catch (error) {
  res.status(500).json({ message: 'Error al eliminar receta', error });
}
};

// Actualizar Receta
const actualizarReceta = async (req, res) => {
  try {
    const recipeId = req.params.id;

    // Validar si el ID de la receta es válido
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: 'ID de receta no válido' });
    }

    // Buscar y actualizar la receta por su ID
    const recipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true });
    if (!recipe) {
      res.status(404).json({ message: Receta con ID ${ recipeId } no encontrada });
  } else {
    res.json({ message: 'Receta actualizada con éxito', recipe });
  }
} catch (error) {
  res.status(500).json({ message: 'Error al actualizar receta', error });
}
};

module.exports = { crearReceta, eliminarReceta, actualizarReceta };