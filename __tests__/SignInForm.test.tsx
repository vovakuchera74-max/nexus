import { render, screen, fireEvent } from '@testing-library/react'
import SignIn from '@/app/sign-in/page'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

describe('SignIn form validation', () => {
  it('shows an error when the email is invalid', async () => {
    render(<SignIn />)

    const emailInput = screen.getByPlaceholderText('User@nexusgg.com')
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } })

    const submitButton = screen.getByRole('button', { name: /sign in/i })
    fireEvent.click(submitButton)

    expect(await screen.findByText('Invalid email')).toBeInTheDocument()
  })
})