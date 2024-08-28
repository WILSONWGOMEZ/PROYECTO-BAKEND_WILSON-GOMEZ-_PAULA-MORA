const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Manejo de rutas dinámicas para otros archivos HTML
app.get('/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'html', req.params.filename);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Archivo no encontrado');
        }
    });
});

// Escuchar en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
