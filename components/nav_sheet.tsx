import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NavSheet(){
    return(
        <Sheet >
            <SheetTrigger>
              <Button variant={"ghost"} className="hover:bg-transparent p-0">
                <Menu strokeWidth={0.5} color="Black" className="h-7 w-7"/>
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="items-center bg-transparent opacity-90 bg-zinc-700 backdrop-blur-sm">
            
            <div className='h-1/6'></div>
            <div className='px-4 text-gray-200 grid grid-cols-1 place-content-between h-5/6'>
              <div className='text-xl grid grid-cols-1 h-max gap-7'>
                <Link href='/products'>SHOP</Link>
                <Link href='/products/reworked'>REWORKED (WIP)</Link>
                <Link href='/products/collections'>COLLECTIONS</Link>
                {/*<Link href='/products/lookbooks/ss23'>SS23 LOOKBOOK</Link>*/}
                <Link href='/news'>NEWS</Link>
                <Link href='/about'>ABOUT</Link>
              </div>
              <div className='text-sm grid grid-cols-1 h-max gap-1 pb-6'>
                  <Link href='/support'>SUPPORT</Link>
                  <Link href='/terms-and-conditions'>ORDERS T&C</Link>
                  <Link href='https://www.instagram.com/utc.one/'>INSTAGRAM</Link>
                  <Link href='https://www.tiktok.com/@utc.one'>TIKTOK</Link>
                  <br/>
                  <p>© 2023 UTC+1 CLOTHING</p>
              </div>
            </div>

            </SheetContent>
          </Sheet>
    )
}