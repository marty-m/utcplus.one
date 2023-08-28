export type Variations = {
    [colorKey: string]: {
      size: string,
      variation_id: string,
      inStock: boolean
    }[]
  }

  export type CartItem = {
    itemId: string, 
    variationId: string,
    images: string[],
    name: string,
    price: number,
}