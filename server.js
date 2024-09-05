const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir la página principal (index.html) si estás usando un HTML inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', '1index.html'));
});

// Ruta para servir cualquier archivo HTML en la carpeta 'html'
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public', 'html', `${page}.html`);
    res.sendFile(filePath, err => {
        if (err) {
            res.status(404).send('Página no encontrada');
        }
    });
});

// Ruta para manejar solicitudes con '.html' en la URL
app.get('/:page.html', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public', 'html', `${page}.html`);
    res.sendFile(filePath, err => {
        if (err) {
            res.status(404).send('Página no encontrada');
        }
    });
});

// Configuración para servir la aplicación React desde la carpeta 'build'
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
