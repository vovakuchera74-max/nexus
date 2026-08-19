import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/Card'

interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  hasHydrated: boolean
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  getTotalCount: () => number
  getTotalPrice: () => number
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          }
        }),
      removeItem: (id: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      getTotalCount: () => {
        const { items } = get()
        return items.reduce((sum, item) => sum + item.quantity, 0)
      },
      getTotalPrice: () => {
        const { items } = get()
        return items.reduce(
          (TotalSum, item) => TotalSum + item.price * item.quantity,
          0
        )
      },
      clearCart: () => set({ items: [] }),
    }),
     {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true
      },
    }
  )
)