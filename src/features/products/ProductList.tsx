import React from "react";
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Product, ListResponse } from '../../types'
import { ProductCard } from './components/ProductCard'
import {Toolbar} from './components/Toolbar';
import { Pagination } from './components/Pagination'
import { LoadingState } from './components/LoadingState'
import { EmptyState } from './components/EmptyState'
import { ErrorState } from './components/ErrorState'
import './ProductList.css'

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter & Sort state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<SortOption>('name-asc')
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 6

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      })
      
      if (searchQuery) params.set('query', searchQuery)
      if (selectedCategory !== 'all') params.set('category', selectedCategory)
      
      const response = await fetch(`/products?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      
      const data: ListResponse<Product> = await response.json()
      
      // Client-side sorting since API doesn't support it
      let sortedItems = [...data.items]
      switch (sortBy) {
        case 'name-asc':
          sortedItems.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'name-desc':
          sortedItems.sort((a, b) => b.name.localeCompare(a.name))
          break
        case 'price-asc':
          sortedItems.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          sortedItems.sort((a, b) => b.price - a.price)
          break
      }
      
      setProducts(sortedItems)
      setTotalPages(Math.ceil(data.total / itemsPerPage))
      setTotalItems(data.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchQuery, selectedCategory, sortBy])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRetry = () => {
    fetchProducts()
  }

  if (loading) {
    return (
      <div className="product-list-container">
        <h1 className="page-title">Products</h1>
        <LoadingState />
      </div>
    )
  }

  if (error) {
    return (
      <div className="product-list-container">
        <h1 className="page-title">Products</h1>
        <ErrorState message={error} onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className="product-list-container">
      <h1 className="page-title">Products</h1>
      
      <Toolbar
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        onSearchChange={handleSearch}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      {products.length === 0 ? (
        <EmptyState 
          hasFilters={searchQuery !== '' || selectedCategory !== 'all'}
        />
      ) : (
        <>
          <div className="results-info" role="status" aria-live="polite">
            Showing {products.length} of {totalItems} products
          </div>
          
          <div className="product-grid" role="list">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  )
}