// Importar las dependencias
require('dotenv').config(); // Cargar las variables de entorno
const mongoose = require('mongoose');
const Recipe = require('./recipe.model');

// Conectar a MongoDB usando la URI almacenada en las variables de entorno
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Obtener la conexión
const db = mongoose.connection;

// Manejar el evento de error
db.on('error', (err) => {
    console.error('Error de conexión:', err);
});

// Manejar el evento de conexión exitosa
db.once('open', () => {
    console.log('Conectado a MongoDB');
});