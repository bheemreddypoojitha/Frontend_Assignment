import React from "react";
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Product } from '../../types'
import './ProductDetails.css'

export function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/products/${id}`)
        
        if (!response.ok) {
          throw new Error('Product not found')
        }
        
        const data: Product = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (loading) {
    return (
      <div className="product-details-container">
        <div className="loading-state" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-details-container">
        <div className="error-state" role="alert">
          <h2>Product Not Found</h2>
          <p>{error || 'The requested product could not be found.'}</p>
          <Link to="/" className="back-link">
            ← Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const formattedPrice = (product.price / 100).toFixed(2)

  return (
    <div className="product-details-container">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <article className="product-details-card">
        <div className="product-details-header">
          <h1 className="product-details-title">{product.name}</h1>
          <span 
            className={`stock-badge-large ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
            aria-label={product.inStock ? 'In stock' : 'Out of stock'}
          >
            {product.inStock ? '✓ In Stock' : '✕ Out of Stock'}
          </span>
        </div>

        <div className="product-details-body">
          <div className="product-info-section">
            <h2 className="section-title">Product Information</h2>
            
            <dl className="product-info-list">
              <div className="info-item">
                <dt>Price</dt>
                <dd className="product-price-large">₹{formattedPrice}</dd>
              </div>
              
              <div className="info-item">
                <dt>Category</dt>
                <dd>{product.category}</dd>
              </div>
              
              <div className="info-item">
                <dt>Product ID</dt>
                <dd className="product-id">{product.id}</dd>
              </div>
              
              <div className="info-item">
                <dt>Availability</dt>
                <dd>{product.inStock ? 'Available for purchase' : 'Currently unavailable'}</dd>
              </div>
            </dl>
          </div>

          {product.description && (
            <div className="product-description-section">
              <h2 className="section-title">Description</h2>
              <p className="product-description">{product.description}</p>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
