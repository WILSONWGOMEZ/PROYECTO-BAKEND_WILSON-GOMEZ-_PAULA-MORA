// Filter.js
import React from 'react';

const Filter = ({ filters, onFilterChange }) => {
  const filterOptions = {
    brand: ['Iphone', 'Samsung', 'Xiaomi', 'Huawei', 'OPPO'],
    price: ['0-200', '200-400', '400-600', '600-800', '800+'],
    storage: ['32GB', '64GB', '128GB', '256GB', '512GB'],
    camera: ['12MP', '16MP', '24MP', '48MP', '64MP'],
    connect: ['4G', '5G', 'Wi-Fi 6', 'Bluetooth 5.0', 'NFC'],
    ram: ['2GB', '4GB', '6GB', '8GB', '12GB'],
    screen: ['LCD', 'OLED', 'AMOLED', 'Super AMOLED', 'IPS LCD'],
    warranty: ['1year', '2years', '3years', '4years'],
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="brand-filter">
        {Object.entries(filterOptions).map(([filterName, options]) => (
          <div key={filterName}>
            <h4>Filtrar por {filterName.charAt(0).toUpperCase() + filterName.slice(1)}</h4>
            <ul className="list-unstyled">
              {options.map((option) => (
                <li key={option}>
                  <input
                    type="checkbox"
                    id={`${filterName}-${option}`}
                    name={filterName}
                    value={option}
                    checked={filters[filterName].includes(option)}
                    onChange={onFilterChange}
                  />
                  <label htmlFor={`${filterName}-${option}`}>{option.replace(/([a-z])([A-Z])/g, '$1 $2')}</label>
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
