import React from "react";
import './EmptyState.css'

interface EmptyStateProps {
  hasFilters: boolean
}

export function EmptyState({ hasFilters }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-icon" aria-hidden="true">📦</div>
      <h2 className="empty-title">
        {hasFilters ? 'No products found' : 'No products available'}
      </h2>
      <p className="empty-message">
        {hasFilters 
          ? 'Try adjusting your search or filter criteria'
          : 'Check back later for new products'
        }
      </p>
    </div>
  )
}