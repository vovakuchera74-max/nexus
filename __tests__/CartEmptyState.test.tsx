import { render, screen } from '@testing-library/react'
import HeaderActions from '@/components/ProfileCart'
import { useCartStore } from '@/store/CartStore'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}))

describe('Cart empty state', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], hasHydrated: true })
  })

  it('shows "Your cart is empty" when the cart has no items', () => {
    render(<HeaderActions user={null} />)

    screen.getByText('Cart').click()

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })
})