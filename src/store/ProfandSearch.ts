import { create } from 'zustand'
interface Profile {
  isProfileOpen: boolean
  openProf: () => void
  closeProf: () => void
}

export const useProfileStore = create<Profile>((set) => ({
  isProfileOpen: false,
  openProf: () => set({ isProfileOpen: true }),
  closeProf: () => set({ isProfileOpen: false }),
}))
