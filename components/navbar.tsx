"use client"
import Link from "next/link";
import Image from 'next/image'
import AccountDropdown from "./account_dropdown";
import CartDropdown from "./cart_dropdown";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuList,
  
} from "@/components/ui/navigation-menu"

import NavSheet from "./nav_sheet";


export default function Navbar() {
    

    return(
      <NavigationMenu>
        <NavigationMenuList className="items-center justify-between flex-row w-screen bg-white border-b border-black fixed top-0 h-24 px-5">
          
          <NavigationMenuItem className="justify-start">
            <NavSheet/>
          </NavigationMenuItem>

          <NavigationMenuItem className="">
            
            <Link href='/'>
              <Image src={"/utcplusoneblack.svg"} alt="UTC+1 Logo" width={100} height={100}/>
            </Link>
            
            
          </NavigationMenuItem>
          
          <NavigationMenuItem className="flex gap-2">
            
              <AccountDropdown/>
              <CartDropdown/>
            
              
              
          </NavigationMenuItem>  
        </NavigationMenuList>
      </NavigationMenu>
    )
}