import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/Card'

interface WishList {
  Wish: Product[]
  AddWish: (product: Product) => void
  RemoveWish: (id: string) => void
  toggleWish: (product: Product) => void
  isInWishlist: (id: string) => boolean
}

export const useWishListStore = create<WishList>()(
  persist(
    (set, get) => ({
      Wish: [],
      AddWish: (product) =>
        set((state) => ({
          Wish: [...state.Wish, product],
        })),
      RemoveWish: (id) =>
        set((state) => ({
          Wish: state.Wish.filter((Wish) => Wish.id !== id),
        })),
      toggleWish: (product) =>
        set((state) => {
          const exists = state.Wish.find((w) => w.id === product.id)
          if (exists) {
            return { Wish: state.Wish.filter((w) => w.id !== product.id) }
          }
          return { Wish: [...state.Wish, product] }
        }),
      isInWishlist: (id) => {
        const state = get()
        const exist = state.Wish.find((w) => w.id === id)
        return !!exist
      },
    }),
    { name: 'wishlist-storage' }
  )
)