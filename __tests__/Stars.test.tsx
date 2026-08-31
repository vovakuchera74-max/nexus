import { render } from '@testing-library/react'
import Stars from '@/components/Stars'

describe('Stars component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Stars rating={4.5} />)
    expect(container).toBeInTheDocument()
  })
})