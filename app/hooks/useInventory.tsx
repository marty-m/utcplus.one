import { client } from "@/app/square_client";
import { pb } from "@/app/pocketbase";

export default function useInventory(){
    async function isInStock(itemId:string){

    try {

        const record = await pb.collection('variations').getOne(itemId, {
            fields: 'stock',
        });

        const isInStock = record.stock > 0;
        return isInStock;
    } catch (error) {
        console.log(error)
    }
    
}
    return {isInStock};}