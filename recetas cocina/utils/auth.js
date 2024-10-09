const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Importamos bcrypt para el cifrado
const User = require('./User.model');

const authController = {
    // Registro de usuario
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Verificamos si el email ya está registrado
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }

            // Hasheamos la contraseña antes de guardarla
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({ name, email, password: hashedPassword });
            await user.save();

            res.status(201).json({ message: 'Usuario creado con éxito' });
        } catch (error) {
            res.status(400).json({ message: 'Error al crear usuario' });
        }
    },

    // Inicio de sesión
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Verificamos si el usuario existe
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            // Comparamos la contraseña proporcionada con la almacenada
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            // Generamos el token JWT
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
                expiresIn: '1h',
            });

            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ message: 'Error al iniciar sesión' });
        }
    },

    // Middleware para proteger rutas
    protect: async (req, res, next) => {
        const bearerToken = req.headers['authorization'];
        if (!bearerToken) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        const token = bearerToken.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: 'Token inválido' });
            }
            req.userId = decoded.userId;
            next();
        });
    },
};

module.exports = authController;