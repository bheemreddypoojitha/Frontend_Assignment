import React from "react";
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom'
import { ProductDetails } from './ProductDetails'

const mockProduct = {
  id: 'p-1',
  name: 'Test Product',
  price: 9999,
  category: 'Electronics',
  inStock: true,
  description: 'This is a test product description',
}

function renderProductDetails(productId = 'p-1') {
  return render(
    <MemoryRouter initialEntries={[`/products/${productId}`]}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProductDetails', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('displays loading state initially', () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise(() => {})
    )
    
    renderProductDetails()
    
    expect(screen.getByText(/loading product details/i)).toBeInTheDocument()
  })

  it('displays product details after successful fetch', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    })

    renderProductDetails()

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument()
      expect(screen.getByText('₹99.99')).toBeInTheDocument()
      expect(screen.getByText('Electronics')).toBeInTheDocument()
      expect(screen.getByText('This is a test product description')).toBeInTheDocument()
    })
  })

  it('displays error state when product not found', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    })

    renderProductDetails()

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /product not found/i })).toBeInTheDocument();
    })
  })

  it('displays correct stock status', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockProduct, inStock: false }),
    })

    renderProductDetails()

    await waitFor(() => {
      expect(screen.getByText(/out of stock/i)).toBeInTheDocument()
    })
  })

  it('has accessible back link', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    })

    renderProductDetails()

    await waitFor(() => {
      const backLink = screen.getByRole('link', { name: /back to products/i })
      expect(backLink).toBeInTheDocument()
      expect(backLink).toHaveAttribute('href', '/')
    })
  })
})

