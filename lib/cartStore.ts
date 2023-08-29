import {create, StoreApi } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CartItem } from '@/lib/types'


interface Store{
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (prodId: string) => void
    totalPrice: () => number
}

const useCartStore = create<Store>()(
  devtools(persist(
    (set: StoreApi<Store>['setState'], get: StoreApi<Store>['getState']) => ({
      items: [],
      addItem: (item: CartItem) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (prodId: string) =>
      set((state) => ({ items: state.items.filter((item) => item.itemId !== prodId) })),
      totalPrice: () =>
        get().items.reduce((total, item) => total + item.price, 0)
     
  }), { name: 'cart-storage' }
  )))

export default useCartStore;