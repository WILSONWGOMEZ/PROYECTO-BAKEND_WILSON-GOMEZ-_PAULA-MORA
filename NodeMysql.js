const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar el middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tu_contraseña',
    database: 'nombre_de_tu_bd'
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos con id ' + db.threadId);
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Consulta para verificar usuario y contraseña (esto es solo un ejemplo, en producción deberías usar hashing para las contraseñas)
    const query = 'SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?';
    db.query(query, [username, username, password], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Error en la consulta' });
            return;
        }
        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    });
});

// Servir el archivo HTML (si está en la misma carpeta que el archivo server.js)
app.use(express.static('public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
