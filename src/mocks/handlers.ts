import { http, HttpResponse } from 'msw'
import { Product, ListResponse } from '../types'
import productsData from './data/products.json'

export const handlers = [
  http.get('/products', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('query') || ''
    const category = url.searchParams.get('category') || ''
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    let filtered = productsData as Product[]

    if (query) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    }

    if (category && category !== 'all') {
      filtered = filtered.filter((p) => p.category === category)
    }

    const start = (page - 1) * limit
    const end = start + limit
    const items = filtered.slice(start, end)

    const response: ListResponse<Product> = {
      items,
      page,
      limit,
      total: filtered.length,
    }

    return HttpResponse.json(response)
  }),

  http.get('/products/:id', ({ params }) => {
    const { id } = params
    const product = (productsData as Product[]).find((p) => p.id === id)

    if (!product) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(product)
  }),
]