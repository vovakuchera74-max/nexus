import { useWishListStore } from '@/store/WishlistStore'

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

describe('Wishlist Store', () => {
  beforeEach(() => {
    useWishListStore.setState({ Wish: [] })
  })

  it('wishlist is empty by default', () => {
    expect(useWishListStore.getState().Wish).toHaveLength(0)
  })

  it('adds item to wishlist', () => {
    const { addItem } = useWishListStore.getState()
    addItem(mockProduct)
    expect(useWishListStore.getState().Wish).toHaveLength(1)
  })

  it('toggleWish removes an item that is already in the wishlist', () => {
    const { addItem, toggleWish } = useWishListStore.getState()
    addItem(mockProduct)
    toggleWish(mockProduct)
    expect(useWishListStore.getState().Wish).toHaveLength(0)
  })
})