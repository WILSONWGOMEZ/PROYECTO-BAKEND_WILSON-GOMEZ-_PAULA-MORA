const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir la página principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', '1index.html'));
});

// Ruta para servir cualquier archivo HTML en la carpeta 'html'
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public', 'html', `${page}.html`);

    // Verifica si el archivo existe y envíalo, si no, sirve la página 404
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

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
