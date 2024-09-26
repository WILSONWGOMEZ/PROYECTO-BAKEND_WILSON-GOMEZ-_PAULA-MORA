'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: {
    type: Number,
    required: true, // Campo obligatorio
    unique: true // Asegura que cada producto tenga un ID único
  },
  brand: {
    type: String,
    required: true // Campo obligatorio
  },
  price: {
    type: Number,
    required: true, // Campo obligatorio
    min: [0, 'El precio no puede ser negativo'] // Validación para asegurar que el precio no sea negativo
  },
  storage: {
    type: String,
    required: true // Campo obligatorio
  },
  camera: {
    type: String,
    required: true // Campo obligatorio
  },
  connect: {
    type: String,
    required: true // Campo obligatorio
  },
  ram: {
    type: String,
    required: true // Campo obligatorio
  },
  screen: {
    type: String,
    required: true // Campo obligatorio
  },
  warranty: {
    type: String,
    required: true // Campo obligatorio
  },
  image_url: {
    type: String,
    required: true // Campo obligatorio
  },
  title: {
    type: String,
    required: true // Campo obligatorio
  },
  description: {
    type: String,
    required: true // Campo obligatorio
  }
});

// Crear el modelo basado en el esquema
module.exports = mongoose.model('Product', ProductSchema);
