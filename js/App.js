// App.js
import React, { useState } from 'react';
import Filter from './js/Filter';
import ProductCard from './ProductCard';

// Datos de ejemplo para productos
const products = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    brand: 'Iphone',
    price: 1099.99,
    storage: '128GB',
    ram: '6GB',
    camera: '12MP',
    screen: 'Super AMOLED',
    warranty: '2years',
    img: '',
    description: 'El iPhone 14 Pro lleva la innovación al siguiente nivel con su pantalla Super Retina XDR de 6.1 pulgadas, Dynamic Island, y el chip A16 Bionic, que ofrece un rendimiento inigualable. Equipado con un sistema de cámara cuádruple, captura imágenes impresionantes en cualquier condición de luz.',
  },
  {
    id: 2,
    name: 'Xiaomi Redmi Note 11',
    brand: 'Xiaomi',
    price: 299.99,
    storage: '64GB',
    ram: '4GB',
    camera: '16MP',
    screen: 'AMOLED',
    warranty: '1year',
    img: 'https://technologystore2006.com/wp-content/uploads/2022/02/xiamomi-note11-azul-128.webp',
    description: 'Un teléfono económico con una pantalla AMOLED de 6.43 pulgadas, cámara cuádruple de 50 MP y una batería de 5000 mAh para un uso prolongado.',
  },
  // Agregar más productos según sea necesario
];

const App = () => {
  const [filters, setFilters] = useState({
    brand: [],
    price: [],
    storage: [],
    camera: [],
    connect: [],
    ram: [],
    screen: [],
    warranty: [],
  });

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[name] = [...updatedFilters[name], value];
      } else {
        updatedFilters[name] = updatedFilters[name].filter((item) => item !== value);
      }
      return updatedFilters;
    });
  };

  const filteredProducts = products.filter((product) => {
    return (
      (filters.brand.length === 0 || filters.brand.includes(product.brand)) &&
      (filters.price.length === 0 || filters.price.some((range) => {
        const [min, max] = range.split('-').map(Number);
        return product.price >= min && (max ? product.price <= max : true);
      })) &&
      (filters.storage.length === 0 || filters.storage.includes(product.storage)) &&
      (filters.camera.length === 0 || filters.camera.includes(product.camera)) &&
      (filters.ram.length === 0 || filters.ram.includes(product.ram)) &&
      (filters.screen.length === 0 || filters.screen.includes(product.screen)) &&
      (filters.warranty.length === 0 || filters.warranty.includes(product.warranty))
    );
  });

  return (
    <div className="container mt-3">
      <div className="row">
        <Filter filters={filters} onFilterChange={handleFilterChange} />
        <div className="col-md-9">
          <h2>LOS MÁS VENDIDOS</h2>
          <hr />
          <div className="row justify-content-around">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
