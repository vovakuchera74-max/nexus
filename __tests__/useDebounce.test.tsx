import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500))
    expect(result.current).toBe('hello')
  })

  it('does not update the value before the delay has passed', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'hello' } }
    )

    rerender({ value: 'world' })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(result.current).toBe('hello')
  })

  it('updates the value after the delay has passed', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'hello' } }
    )

    rerender({ value: 'world' })

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(result.current).toBe('world')
  })
})