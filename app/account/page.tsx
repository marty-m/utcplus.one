'use client'

import useLoggedInRedir from "../hooks/useLoggedInRedir";
import { useRouter } from "next/navigation";
import { pb } from "../pocketbase";
import { useEffect } from "react";
import useVerified from "../hooks/useVerified";

export default function Account(){

    async function signUpMailingList(){
        const userdata = await pb.collection('users').update(model.id, {mailingList: true});
        router.refresh();
    };
    async function unSubMailingList(){
        const userdata = await pb.collection('users').update(model.id, {mailingList: false});
        router.refresh();
    };

    useEffect(() => {
        async function authRefresh(){
            try{const authData = await pb.collection('users').authRefresh();} catch (e){console.log(e)}  
        } 
        authRefresh();
    }, [])

    const {isLoggedIn} = useLoggedInRedir();
    const router = useRouter();
    if (!isLoggedIn){
        router.push('/');
    }
    const {isVerified} = useVerified();
    const model = pb.authStore.model;
    const date = new Date(model.created)
    date.setHours(date.getHours() + 1);

    return(
        <div className="flex flex-col items-center w-screen h-full">
            <div className="flex h-4/5 w-1/2 items-center justify-center py-10">
                <div className=" w-full h-full">

                    <div className="grid grid-cols-2 py-5 text-center gap-12 h-full">
                        <div className="col-span-1">
                            <h1 className="text-2xl font-extralight underline underline-offset-8 pb-6">ORDER HISTORY</h1>
                            <div className="h-auto w-full text-left">
                                <div className="border border-black shadow-lg py-14 px-14">
                                    order
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 ">
                            <h1 className="text-2xl font-light underline underline-offset-8 pb-6">ACCOUNT DETAILS</h1>
                            <div className="h-auto w-full text-left">
                                <div className="border border-black shadow-lg py-14 px-14">
                                    
                                    <span className=" text-lg font-bold">FULL NAME</span>
                                    <p className="text font-light">{model.name}</p>
                                    
                                    <div className="divider"></div> 
                                    <span className=" text-lg font-bold">EMAIL ADDRESS</span>
                                    <p className="text font-light">{model.email} <br/> {isVerified ? "(VERIFIED)" : "(NOT VERIFIED)"}</p>
                                    
                                    <div className="divider"></div> 
                                    <span className=" text-lg font-bold">MEMBER SINCE</span>
                                    <p className="text font-light">{date.toLocaleString("en-GB", {timeZone: "UTC"})} (UTC+1) </p>
                                    
                                    <div className="divider"></div>
                                    <div className="pb-1"><span className="text-lg font-bold">MAILING LIST</span></div>
                                    <p className="text font-light">{model.mailingList ? <button className="w-full rounded-none bg-palletteBlue py-3 text-sm text-white" onClick={unSubMailingList}>UNSUBSCRIBE</button> : <button className="w-full rounded-none bg-yellow-300 py-3 text-sm" onClick={signUpMailingList}>SUBSCRIBE</button>}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}