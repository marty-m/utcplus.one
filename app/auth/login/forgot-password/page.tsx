'use client'
import {useForm} from "react-hook-form";
import usePwReset from "@/app/_hooks/usePwReset";
import useLoggedInRedir from "@/app/_hooks/useLoggedInRedir";


export default function ForgotPassword(){
    const {pwReset, isLoading} = usePwReset();
    const {register, handleSubmit, reset} = useForm();
    const {redirect} = useLoggedInRedir();
    redirect();

    

    async function onSubmit(data: any){
        await pwReset(data);
        reset();
        alert("Password reset email sent.")
    }

    

    
    return(
        <div className="flex flex-col justify-center items-center w-screen">
            
            <div className="flex h-3/5 w-1/2 items-center justify-center py-20">
            <div className="fixed top-52 left-128 w-6 h-6">
                    <a href="."><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="square" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg></a>
                </div>
            <div className="border border-black shadow-xl py-14 px-20">
                
            <h1 className=" text-left   font-bold pb-8 text-4xl underline underline-offset-8">FORGOT PASSWORD</h1>

                <form className="flex flex-col justify-center w-auto" onSubmit={handleSubmit(onSubmit)}>
                    <label className="  text-sm pb-1">EMAIL ADDRESS</label>
                    <input type="email" placeholder="" {...register("email")}/>
                    
                    <div className="pt-5 mx-auto w-full">
                        <button className="w-full rounded-none bg-yellow-300 py-3   text-sm" type="submit" disabled={isLoading}>{isLoading? "LOADING" : "RESET PASSWORD"}</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}