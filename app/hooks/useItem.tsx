import { CartItem } from "@/lib/types"

export function createItemObject(
    itemId: string, 
    variationId: string,
    images: string[],
    name: string,
    price: number, 
    ){
        const ItemObject: CartItem = {itemId:itemId, variationId: variationId, images: images, name: name, price: price}
        return ItemObject;
    }