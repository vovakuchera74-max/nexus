import { useEffect, useState } from 'react'

export const useDebonce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const time = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(time)
  }, [value, delay])

  return debouncedValue
}
