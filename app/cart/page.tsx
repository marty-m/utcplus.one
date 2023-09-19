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
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CartPage() {
    const items = useCartStore((state) => state.items)
    const totalPrice = useCartStore((state) => state.totalPrice)
    return (
        <div className="flex flex-col h-full w-full px-8 py-8">
            <h1 className=" text-2xl font-bold ">YOUR CART</h1>
            <h2 className="text-xs font-serif font-thin pb-5">(at this moment.)</h2>
            <Table>
                <TableCaption>{items.length === 0 ? "looks a bit empty in here..." : ""}</TableCaption>
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
            <div className="text-right">
                <p className="pb-2 pr-20 text-xl font-bold">TOTAL: ${totalPrice()}</p>
                <Button asChild variant={"outline"} size={"lg"} className={items.length === 0? "hidden" :"text-lg font-medium py-7 rounded-none border-none bg-yellow-300 hover:bg-yellow-400"}>
                    <Link href="/cart/checkout"> CHECK OUTTTTT</Link>
                </Button>    
            </div>

        </div>
    
    )
}