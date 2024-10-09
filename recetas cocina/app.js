require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require("./config/db");

// Importar las rutas de usuarios y recetas
const userRoutes = require('./routes/userRoutes'); // Ruta de usuarios
const recipeRoutes = require('./routes/reciperoutes'); // Ruta de recetas

const app = express();
const mongoURI = process.env.MONGO_URI; // Usamos la variable de entorno
const PORT = process.env.PORT || 3000;  // Establecemos el puerto

// Función asíncrona para conectar a MongoDB y arrancar el servidor
const startServer = async () => {
    try {
        console.log("Aplicación iniciada");
        console.log(mongoURI);
        // Conexión a MongoDB usando await
        connectDB();
        console.log('Conexión a MongoDB exitosa');
        
        // Middleware para permitir peticiones desde otros dominios (CORS)
        app.use(cors());

        // Middleware para parsear el cuerpo de las peticiones JSON
        app.use(express.json());

        // Middleware para servir archivos estáticos desde la carpeta 'public'
        app.use(express.static(path.join(__dirname, 'public')));

        // Usar las rutas de usuario y receta
        app.use('/api/users', userRoutes); // Todas las rutas de usuarios comenzarán con '/api/users'
        app.use('/api/recipes', recipeRoutes); // Todas las rutas de recetas comenzarán con '/api/recipes'

        // Arrancar el servidor si la conexión es exitosa
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error conectando a MongoDB o iniciando el servidor', error.message);
    }
};

// Iniciar la aplicación
startServer();
// el internet con ip 181.25.26.34->google.com nombre de dominio DNS  node.26ref.mongodb.net