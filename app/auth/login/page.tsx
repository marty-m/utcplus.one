'use client'
import {useForm} from "react-hook-form";
import {pb} from "@/app/pocketbase";
import useLogout from "../../hooks/useLogout";
import useLogin from "../../hooks/useLogin";


export default function Auth(){
    const {login, isLoading} = useLogin();
    const logout = useLogout();
    const {register, handleSubmit, reset} = useForm();
    
    const isLoggedIn = pb.authStore.isValid;
    


    async function onSubmit(data: any){
        await login(data);
        reset();
    }

    return(
    <div className="flex flex-col justify-center items-center w-screen">
        
        <div className="flex h-3/5 w-1/2 items-center justify-center py-20">
        
        <div className="border border-black shadow-xl py-14 px-20">
        <h1 className=" text-left font-mono font-bold pb-8 text-4xl underline underline-offset-8">SIGN IN</h1>

            <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col justify-center w-auto">
                <label className="font-mono text-sm pb-1">EMAIL ADDRESS</label>
                <input type="email" placeholder="" {...register("email")} />
                
                <label className="font-mono text-sm pb-1 pt-4">PASSWORD 
                <label className="justify-right text-gray-500 font-mono text-right text-xs pl-52"><a href="">FORGOT PASSWORD?</a></label>
                </label>
                <input type="password" placeholder="" {...register("password")}/>

                <div className="pt-5 pb-4 mx-auto w-full">
                    <button className="w-full rounded-none bg-yellow-300 py-3 font-mono text-sm" type="submit" disabled={isLoading}>{isLoading? "LOADING" : "SIGN IN"}</button>
                </div>
            </form>
        </div>
        </div>
    </div>
    )
}