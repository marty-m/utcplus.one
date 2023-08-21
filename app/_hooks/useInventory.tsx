import { client } from "@/app/square_client";

export async function isInStock(itemId:string){
    try {
        const response = await client.inventoryApi.retrieveInventoryCount(itemId);
        const isInStock = (response.result.counts[0]).quantity > 0;
        return isInStock;
    } catch (error) {
        console.log(error)
    }
}