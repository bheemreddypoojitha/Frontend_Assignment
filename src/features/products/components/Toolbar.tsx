import React from "react";
import { useState, useEffect } from 'react'
import './Toolbar.css'

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

interface ToolbarProps {
  searchQuery: string
  selectedCategory: string
  sortBy: SortOption
  onSearchChange: (query: string) => void
  onCategoryChange: (category: string) => void
  onSortChange: (sort: SortOption) => void
}

const categories = ['all', 'Electronics', 'Home', 'Clothing', 'Books']

export function Toolbar({
  searchQuery,
  selectedCategory,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: ToolbarProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchChange(localSearchQuery)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [localSearchQuery, onSearchChange])

  return (
    <div className="toolbar" role="search">
      <div className="toolbar-row">
        <div className="search-container">
          <label htmlFor="search-input" className="visually-hidden">
            Search products by name
          </label>
          <input
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            aria-label="Search products by name"
          />
          {localSearchQuery && (
            <button
              className="clear-search"
              onClick={() => setLocalSearchQuery('')}
              aria-label="Clear search"
              type="button"
            >
              ✕
            </button>
          )}
        </div>

        <div className="filter-container">
          <label htmlFor="category-filter" className="filter-label">
            Category:
          </label>
          <select
            id="category-filter"
            className="category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-container">
          <label htmlFor="sort-select" className="sort-label">
            Sort by:
          </label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Sort products"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  )
}