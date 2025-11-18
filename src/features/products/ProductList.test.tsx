import React from "react";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ProductList } from './ProductList';

// Mock data
const mockProducts = {
  items: [
    {
      id: 'p-1',
      name: 'Headphones',
      price: 8999,
      category: 'Electronics',
      inStock: true,
    },
    {
      id: 'p-2',
      name: 'Chair',
      price: 12999,
      category: 'Home',
      inStock: true,
    },
  ],
  page: 1,
  limit: 10,
  total: 2,
};

function renderProductList() {
  return render(
    <BrowserRouter>
      <ProductList />
    </BrowserRouter>
  );
}

describe('ProductList', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('displays loading state initially', () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise(() => {})
    );

    renderProductList();

    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  it('displays products after successful fetch', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockProducts }),
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText('Headphones')).toBeInTheDocument();
      expect(screen.getByText('Chair')).toBeInTheDocument();
    });
  });

  it('displays error state when fetch fails', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Network error')
    );

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('filters products by search query', async () => {
    const user = userEvent.setup();

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ ...mockProducts }),
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText('Headphones')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText(/search products/i);
    await user.type(searchInput, 'headphones');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('query=headphones')
      );
    });
  });

  it('filters products by category', async () => {
    const user = userEvent.setup();

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ ...mockProducts }),
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText('Headphones')).toBeInTheDocument();
    });

    const categorySelect = screen.getByLabelText(/filter by category/i);
    await user.selectOptions(categorySelect, ['Electronics']);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('category=Electronics')
      );
    });
  });

  it('displays empty state when no products match filters', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [], page: 1, limit: 10, total: 0 }),
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText(/no products available/i)).toBeInTheDocument();
    });
  });

  it('has accessible search and filter controls', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ ...mockProducts }),
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText('Headphones')).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/search products/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sort products/i)).toBeInTheDocument();
  });

  it('handles pagination correctly', async () => {
    const user = userEvent.setup();

    const manyProducts = {
      items: Array.from({ length: 6 }, (_, i) => ({
        id: `p-${i}`,
        name: `Product ${i}`,
        price: 1000,
        category: 'Test',
        inStock: true,
      })),
      page: 1,
      limit: 6,
      total: 12,
    };

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => manyProducts,
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText('Product 0')).toBeInTheDocument();
    });

    const nextButton = screen.getByLabelText(/go to next page/i);
    expect(nextButton).toBeEnabled();

    await user.click(nextButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=2')
      );
    });
  });
});

