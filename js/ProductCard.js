// ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => (
  <div className="col-md-6 col-lg-4 col-12 mb-4">
    <div className="card">
      <div className="card-img-container">
        {product.img ? (
          <img src={product.img} className="card-img-top" alt={product.name} />
        ) : (
          <div className="card-img-placeholder">No Image</div>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <div className="card-details">
          <p className="card-price">${product.price.toFixed(2)}</p>
          <p className="card-specs">
            <span>RAM: {product.ram}</span> | 
            <span>Almacenamiento: {product.storage}</span>
          </p>
        </div>
      </div>
      <div className="card-footer text-center">
        <a href={`/${product.name.replace(/\s+/g, '')}`} className="btn btn-primary">Ver Detalles</a>
      </div>
    </div>
  </div>
);

export default ProductCard;
