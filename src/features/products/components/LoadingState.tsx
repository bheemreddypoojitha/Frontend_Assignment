import React from "react";
import './LoadingState.css'

export function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <p className="loading-text">Loading products...</p>
    </div>
  )
}