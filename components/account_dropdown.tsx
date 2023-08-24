'use client'
import useLogout from "@/app/hooks/useLogout";
import { pb } from "@/app/pocketbase"
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Circle, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";




    export default function AccountDropdown() {
        const logout = useLogout();
        const isLoggedIn = pb.authStore.isValid
        
        return(
            <DropdownMenu>
                <DropdownMenuTrigger className="relative pt-1">
                    <User strokeWidth={0.5} className="h-7 w-7 z-0"></User>
                    {isLoggedIn? <Circle fill="green" stroke="transparent" className="absolute top-0.5 right-0.5 z-10 h-3 w-3"/> : ""}
                </DropdownMenuTrigger>
                    {isLoggedIn? 
                        <DropdownMenuContent className="p-3 rounded-none flex flex-col w-auto"> 
                            <Link href="/cart" 
                            className={buttonVariants({ className:"rounded-none bg-yellow-300 hover:bg-yellow-400 text-black justify-center", variant: "ghost" })}>
                                ACCOUNT
                            </Link>
                                
                            <Button variant="ghost" onClick={logout} className="rounded-none bg-yellow-300 hover:bg-yellow-400 text-black justify-center">
                                LOG OUT
                            </Button>
                        </DropdownMenuContent>
                    :
                    <DropdownMenuContent className="p-3 rounded-none flex flex-col gap-2 w-max"> 
                        <Link href="/auth/login" 
                        className={buttonVariants({ className:"rounded-none bg-yellow-300 hover:bg-yellow-400 text-black justify-center", variant: "ghost" })}>
                            SIGN IN
                        </Link>
                            
                        <Link href="/auth/signup" 
                        className={buttonVariants({ className:"rounded-none bg-yellow-300 hover:bg-yellow-400 text-black justify-center", variant: "ghost" })}>
                            CREATE ACCOUNT
                        </Link>
                    </DropdownMenuContent>}
            </DropdownMenu>
        )
    }