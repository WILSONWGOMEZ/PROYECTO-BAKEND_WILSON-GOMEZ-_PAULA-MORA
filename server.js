require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./models/product');
const product = require('./models/product');

// Crear una instancia de Express
const app = express();
const port = process.env.PORT || 3000; // Usa el puerto de .env o el predeterminado

// Configuración de middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a MongoDB usando Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("¡Conectado a MongoDB con Mongoose!");
  })
  .catch(err => {
    console.error("Error conectando a MongoDB:", err);
  });

// Rutas de la API
app.use("/api/signup", require("./auth-back/routes/signup.js"));
app.use("/api/login", require("./auth-back/routes/login.js"));
app.use("/api/user", require("./auth-back/routes/user.js"));
app.use("/api/logout", require("./auth-back/routes/logout.js"));
app.use("/api/posts", require("./auth-back/routes/posts.js"));
app.use("/api/refreshToken", require("./auth-back/routes/refreshToken.js"));

// Ruta de la API GET para obtener todos los productos// CONECTADO A LA BASE DE DATOS
app.get('/api/product', async (req, res) => {
  try {
    // Buscamos todos los productos en la base de datos
    const products = await Product.find({}).exec();
    
    // Si no hay productos, enviamos un mensaje con estado 404
    if (!products || products.length === 0) {
      return res.status(404).send({ message: 'No existen productos.' });
    }
    
    // Si hay productos, los enviamos en la respuesta
    res.status(200).send({ products });
  } catch (err) {
    // En caso de error, enviamos un mensaje con el estado 500
    console.error('Error al realizar la petición:', err);
    res.status(500).send({ message: `Error al realizar la petición: ${err.message}` });
  }
});




// Ruta de la API GET por ID // CONECTADO A LA BASE DE DATOS
app.get('/api/product/:productId', async (req, res) => {
  try {
    // Obtenemos el ID del producto desde los parámetros de la solicitud
    const productId = req.params.productId;
    
    // Buscamos el producto en la base de datos utilizando `findById` con `await`
    const product = await Product.findById(productId).exec();
    
    // Si no se encuentra el producto, enviamos un mensaje con estado 404
    if (!product) {
      return res.status(404).send({ message: 'El producto no existe.' });
    }
    
    // Si se encuentra el producto, enviamos el producto encontrado
    res.status(200).send({ product });
  } catch (err) {
    // En caso de error, enviamos un mensaje con el estado 500
    console.error('Error al realizar la petición:', err);
    res.status(500).send({ message: `Error al realizar la petición: ${err.message}` });
  }
});


// Ruta de la API POST para crear un nuevo producto// CONECTADO A LA BASE DE DATOS
app.post('/api/product', async (req, res) => {
  const { id, brand, price, storage, camera, connect, ram, screen, warranty, image_url, title, description } = req.body;

  // Imprimir los datos del producto recibidos en la consola
  console.log('Datos recibidos:', { id, brand, price, storage, camera, connect, ram, screen, warranty, image_url, title, description });

  // Validar que todos los campos necesarios están presentes
  if (!id || !brand || !price || !storage || !camera || !connect || !ram || !screen || !warranty || !image_url || !title || !description) {
    return res.status(400).send({ message: 'Todos los campos son obligatorios.' });
  }

  // Validar que el precio es un número
  if (isNaN(price)) {
    return res.status(400).send({ message: 'El precio debe ser un número.' });
  }

  // Crear una nueva instancia del producto
  const product = new Product({
    id,
    brand,
    price: parseFloat(price), // Asegúrate de que el precio sea un número
    storage,
    camera,
    connect,
    ram,
    screen,
    warranty,
    image_url,
    title,
    description
  });

  try {
    // Guardar el producto en la base de datos
    const productStored = await product.save();
    res.status(201).send({ product: productStored });

    // Imprimir en consola el producto que se ha guardado en la base de datos
    console.log('Producto guardado en la base de datos:', productStored);
  } catch (err) {
    console.error('Error al salvar el producto en la base de datos:', err);
    res.status(500).send({ message: 'Error al salvar el producto en la base de datos.' });
  }
});

//CONECTADO A LA BASE DE DATOS 

// Rutas de la API PUT
app.put('/api/product/:productId', async (req, res) => {
  const productId = req.params.productId;
  const update = req.body;

  try {
    const productUpdate = await Product.findByIdAndUpdate(productId, update, { new: true }).exec();

    if (!productUpdate) {
      return res.status(404).send({ message: 'El producto no existe.' });
    }

    res.status(200).send({ product: productUpdate });
  } catch (err) {
    res.status(500).send({ message: `Error al actualizar el producto: ${err.message}` });
  }
});




// Rutas de la API DELETE// CONECTADO A LA BASE DE DATOS
app.delete('/api/product/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    // Buscar y eliminar el producto por ID
    const result = await Product.deleteOne({ _id: productId });
    
    // Validar si se eliminó un producto
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'El producto no existe' });
    }

    res.status(200).send({ message: 'El producto ha sido eliminado' });
  } catch (err) {
    res.status(500).send({ message: `Error al borrar el producto: ${err}` });
  }
});

// Rutas de la API DELETE / CONECTADO A LA BASE DE DATOS 














// Ruta para servir la página principal (index.html)
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
