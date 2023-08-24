"use client"
import useCartStore from "@/lib/cartStore"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ShoppingCart } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function CartDropdown(){
    const items = useCartStore((state) => state.items)
    const totalPrice = useCartStore((state) => state.totalPrice())

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative pt-3 pb-2 pr-3">
                <ShoppingCart strokeWidth={0.5} className="h-7 w-7 z-0"></ShoppingCart>
                <Badge className="absolute z-10 top-0 right-0 w-1 justify-center">{items.length}</Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3 flex w-auto flex-col rounded-none">
                <DropdownMenuLabel className="font-thin pb-1">TOTAL ITEMS: {items.length}</DropdownMenuLabel>
                <DropdownMenuLabel className="font-thin pb-2">TOTAL PRICE: ${totalPrice}</DropdownMenuLabel>
                <Link href="/cart" className={buttonVariants({ className:"rounded-none bg-yellow-300 hover:bg-yellow-400 text-black justify-center", variant: "ghost" })}>VIEW CART</Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}