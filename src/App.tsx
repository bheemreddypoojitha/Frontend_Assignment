import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { ProductList } from './features/products/ProductList';
import { ProductDetails } from './features/products/ProductDetails';

export default function App() {
  return (
    <div>
      <header>
        <nav>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            textAlign: 'center', 
            margin: 0 
          }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#1a1a1a' }} aria-label="Home">
              Listings <span style={{ color: '#3b82f6' }}>Manager</span>
            </Link>
          </h1>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  );
}
