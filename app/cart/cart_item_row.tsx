import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import useCartStore from "@/lib/cartStore";
import { CartItem } from "@/lib/types";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartItemRowProps {
    item: CartItem;
}

export default function CartItemRow({item}: CartItemRowProps){
    const removeItem = useCartStore((state) => state.removeItem)
    function onClickRemove(){
        removeItem(item.variationId)
    }

    console.log(item.productId)
    return (
        
        <TableRow>
            <TableCell>
                <Link href={`/products/${item.productId}`}>
                    <div className="flex">
                        <Image alt="Item image" src={item.images[0]} height={100} width={100}/>
                        <div className="flex flex-col pl-4">
                            <p className="text-zinc-600 font-bold text-lg">{item.name}</p>
                            <p className="text-zinc-400 font-thin">{item.color}</p>
                            <br/>   
                            <p className="text-zinc-400 font-bold">SIZE:</p>
                            <p className="text-zinc-400 font-thin">{item.size}</p>
                        </div>
                    </div>
                </Link>
                
            </TableCell>
            <TableCell className="text-right">{item.quantity}</TableCell>
            <TableCell className="text-right">{item.price}</TableCell>
            <TableCell className="text-right"><Button variant={"link"} onClick={onClickRemove}><X/></Button></TableCell>
        </TableRow>
    )
}