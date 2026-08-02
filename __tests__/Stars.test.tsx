import { render } from '@testing-library/react'
import Stars from '@/components/Stars'
import { useCartStore } from '@/store/CartStore'
const mockProduct = {
  id: '1',
  name: 'PS5',
  slug: 'ps5',
  description: 'Gaming console',
  price: 499,
  old_price: null,
  brand: 'Sony',
  category_id: '123',
  image_url: 'https://example.com/ps5.jpg',
  rating: 4.9,
  reviews_count: 100,
  stock: 10,
  is_new: false,
  discount_percent: null,
  categories: null,
}
describe('Stars component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Stars rating={4.5} />)
    expect(container).toBeInTheDocument()
  })
})

describe('Cart Store', () => {
  it('cart is empty by default', () => {
    const items = useCartStore.getState().items
    expect(items).toHaveLength(0)
  })
  describe('cartStore', () => {
  it('adds item to cart', () => {
    const { addItem, items } = useCartStore.getState()
    addItem(mockProduct)
    expect(useCartStore.getState().items).toHaveLength(1)
  })
})

  
})