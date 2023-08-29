export type Variations = {
    [colorKey: string]: {
      size: string,
      variation_id: string,
      inStock: boolean,
      imageURLs: string[],
    }[]
  }

  export type CartItem = { 
    productId: string,
    variationId: string,
    color: string,
    size: string,
    images: string[],
    name: string,
    price: number,
    quantity: number,
}