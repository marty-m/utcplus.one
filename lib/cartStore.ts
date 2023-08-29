import {create, StoreApi } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CartItem } from '@/lib/types'


interface Store{
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (variationId: string) => void
    getQuantity: (variationId: string) => number
    totalQuantity: () => number
    totalPrice: () => number
}

const useCartStore = create<Store>()(
  devtools(
    persist(
      (set: StoreApi<Store>['setState'], get: StoreApi<Store>['getState']) => ({
        items: [],
        
        addItem: (Item: CartItem) => set((state) => {
          if (state.items.some((item) => item.variationId === Item.variationId)) {
            return {
              items: state.items.map((item) =>
                item.variationId === Item.variationId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { ...Item, quantity: 1 }],
            };
          }
        }),
        
        removeItem: (variationId: string) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.variationId === variationId
                ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                : item
            ).filter((item) => item.quantity > 0),
          })),
        
        getQuantity: (variationId: string) => get().items.find((item) => item.variationId === variationId)?.quantity || 0,
        
        totalQuantity: () => get().items.reduce((total, item) => total + item.quantity, 0),

        totalPrice: () =>
          get().items.reduce((total, item) => total + item.price, 0)
      
  }), { name: 'cart-storage' }
  )))

export default useCartStore;