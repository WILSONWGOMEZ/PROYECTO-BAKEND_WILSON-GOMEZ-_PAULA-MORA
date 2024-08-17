import React, { useState } from 'react';

// Ejemplo de datos
const items = [
  { id: 1, name: 'Item 1', category: 'Category 1', price: 10 },
  { id: 2, name: 'Item 2', category: 'Category 2', price: 20 },
  // Más datos...
];

const App = () => {
  // Estados para filtros
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 100,
  });

  // Función para manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Filtrar items según los filtros
  const filteredItems = items.filter(item => {
    return (
      (filters.category ? item.category.includes(filters.category) : true) &&
      (item.price >= filters.minPrice && item.price <= filters.maxPrice)
    );
  });

  return (
    <div>
      <h1>Items List</h1>
      {/* Filtros */}
      <div>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Min Price:
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      {/* Mostrar items filtrados */}
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.category} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
