import React from "react";
import './Pagination.css'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <nav className="pagination" role="navigation" aria-label="Pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        type="button"
      >
        Previous
      </button>

      <div className="pagination-numbers">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                ...
              </span>
            )
          }

          return (
            <button
              key={page}
              className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page as number)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              type="button"
            >
              {page}
            </button>
          )
        })}
      </div>

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        type="button"
      >
        Next
      </button>
    </nav>
  )
}