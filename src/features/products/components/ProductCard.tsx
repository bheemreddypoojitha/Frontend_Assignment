import React from "react";
import { Link } from 'react-router-dom';
import { Product } from '../../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = (product.price / 100).toFixed(2);

  return (
    <article className="product-card" role="listitem">
      <Link
        to={`/products/${product.id}`}
        className="product-card-link"
        aria-label={`View details for ${product.name}`}
      >
        <div className="product-card-content">
          <div className="product-header">
            <h2 className="product-name">{product.name}</h2>
            <span
              className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
              aria-label={product.inStock ? 'In stock' : 'Out of stock'}
            >
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="product-details">
            <span className="product-category" aria-label={`Category: ${product.category}`}>
              {product.category}
            </span>
            <span className="product-price" aria-label={`Price: ₹${formattedPrice}`}>
              ₹{formattedPrice}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
