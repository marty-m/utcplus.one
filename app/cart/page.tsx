"use client"
import useCartStore from "@/lib/cartStore"
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import CartItemRow from "@/app/cart/cart_item_row"

export default function CartPage() {
    const items = useCartStore((state) => state.items)
    return (
        <div className="flex flex-col h-full w-full px-8 py-8">
            <h1 className=" text-2xl font-bold ">YOUR CART</h1>
            <h2 className="text-xs font-serif font-thin pb-5">(at this moment.)</h2>
            <Table>
                <TableCaption>{"cool cart :)"}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">ITEM</TableHead>
                        <TableHead className="text-right">QUANTITY</TableHead>
                        <TableHead className="text-right">PRICE</TableHead>
                        <TableHead className="text-right w-[10px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items? items.map((item?) => {
                        return (
                            <><CartItemRow item={item}/></>
                        )
                    }): null}
                    
                </TableBody>
            </Table>

        </div>
    
    )
}