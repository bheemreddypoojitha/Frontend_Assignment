import React from "react";
import './ErrorState.css'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="error-state" role="alert">
      <div className="error-icon" aria-hidden="true">⚠️</div>
      <h2 className="error-title">Something went wrong</h2>
      <p className="error-message">{message}</p>
      <button 
        className="retry-button" 
        onClick={onRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )
}