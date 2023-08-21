import {create, StoreApi } from 'zustand'

interface Item{
    itemId:string
    variationId:string
    name:string
    price:number
}

interface Store{
    items: Item[]
    variationId: string
    addItem: (item: Item) => void
    removeItem: (prodId: string) => void
    totalPrice: () => number
}

const useCartStore = create<Store>((set: StoreApi<Store>['setState'], get: StoreApi<Store>['getState']) => ({
    items: [],
    variationId: "",
    addItem: (item: Item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (prodId: string) =>
      set((state) => ({ items: state.items.filter((item) => item.itemId !== prodId) })),
    totalPrice: () =>
      get().items.reduce((total, item) => total + item.price, 0)
   
}))

export default useCartStore;