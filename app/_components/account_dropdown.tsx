'use client'
import useLogout from "@/app/_hooks/useLogout";
import { pb } from "@/app/pocketbase"
import Link from "next/link";




    export default function AccountDropdown() {
        const logout = useLogout();
        const isLoggedIn = pb.authStore.isValid
        
        
        
        
        
        
            
            if (isLoggedIn){
                return(<> <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-link btn-square">
                    <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <span className="badge badge-sm indicator-item bg-green-700">
                            </span>
                    </div>
                </label>
                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-40 bg-base-100 shadow">
                    <div className="card-body">
                
                    <Link href="/account">
                    <button className="btn btn-active btn-accent btn-block">
                        ACCOUNT
                    </button>
                    </Link>
                    
                    
                    <button onClick={logout} className="btn btn-active btn-accent btn-block">
                        LOG OUT
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="square" stroke-linejoin="round"><path d="M16 17l5-5-5-5M19.8 12H9M10 3H4v18h6"/></svg>
                    </button>
                    </div>
                </div>
            </div>
            </>) 
            }
            else{
                return(<><div className="dropdown dropdown-end">
                <button className="btn btn-link btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </button>
                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-40 bg-base-100 shadow">
                    <div className="card-body">
                    <Link href="/auth/login">
                    <button className="btn btn-active btn-accent btn-block">
                        SIGN IN
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="square" stroke-linejoin="round"><path d="M15 3h6v18h-6M10 17l5-5-5-5M13.8 12H3"/></svg>
                    </button>
                    </Link>
                    <Link href="/auth/signup">
                    <button className="btn btn-active btn-accent btn-block">
                        SIGN UP
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="square" stroke-linejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg>
                    </button>
                    </Link>
                    </div>
                </div>
            </div></>) 
            }
            
    }