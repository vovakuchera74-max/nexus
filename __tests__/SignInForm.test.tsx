import { render, screen, fireEvent } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, signInValue } from '@/validations/signInSchema'

function TestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInValue>({ resolver: zodResolver(signIn) })

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <input {...register('email')} placeholder="email" />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Submit</button>
    </form>
  )
}

describe('signInSchema validation', () => {
  it('shows an error for an invalid email', async () => {
    render(<TestForm />)

    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'not-an-email' },
    })
    fireEvent.click(screen.getByText('Submit'))

    expect(await screen.findByText('Invalid email')).toBeInTheDocument()
  })
})