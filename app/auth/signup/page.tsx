'use client'
import { useForm} from "react-hook-form";
import {pb} from "@/app/pocketbase";
import { useRouter } from "next/navigation";
import useSignUp from "@/app/hooks/useSignUp";



export default function SignupPage() {
    const isLoggedIn = pb.authStore.isValid; // check if user is logged in 
    const router = useRouter(); // get router
    const {register, handleSubmit, reset} = useForm();
    const {signup, isLoading} = useSignUp();

    if (isLoggedIn) router.push('/'); // redirect to home if logged in

    async function onSubmit(data: any){
        await signup(data);
        reset();
        alert("Account created successfully. Please check your email for a verification link.");
    }
    


    return(
        <div className="flex flex-col justify-center items-center w-screen">
            
            <div className="flex h-3/5 w-1/2 items-center justify-center py-20">
            
            <div className="border border-gray-100 shadow-lg py-14 px-20">
            <h1 className=" text-left font-mono font-bold pb-8 text-4xl underline underline-offset-8">SIGN UP</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center w-88">
                
                <label className="font-mono text-sm pb-1">EMAIL ADDRESS</label>
                <input type="email" placeholder="" {...register("email")} required/>
                
                <label className="font-mono text-sm pb-1 pt-4">FIRST NAME</label>
                <input type="text" placeholder="" {...register("fname")} required/>

                <label className="font-mono text-sm pb-1 pt-4">LAST NAME</label>
                <input type="text" placeholder="" {...register("lname")} required/>

                <label className="font-mono text-sm pb-1 pt-4">PASSWORD 
                <label className="justify-right text-gray-500 font-mono text-right text-xs pl-44">(min. 8 characters)</label>
                </label>
              
                <input type="password" placeholder="" {...register("password")} required minLength={8}/>
                
                <label className="font-mono text-sm pb-1 pt-4">CONFIRM PASSWORD</label>
                <input type="password" placeholder="" {...register("passwordConfirm")} required minLength={8}/>
                
                <div className="pt-5 pb-4 mx-auto w-full">
                    <button className="w-full rounded-none bg-yellow-300 py-3 font-mono text-sm" type="submit" disabled={isLoading}>{isLoading? "LOADING" : "CREATE ACCOUNT"}</button>
                </div>
                
                
                <label className="text-xxs text-gray-500 font-mono">
                    <input className="checkbox checkbox-xs border border-gray-500 rounded-none focus:ring-transparent" type="checkbox" required></input>
                    <label className="pl-2">I agree to the <a className="underline" href="">terms and conditions</a> and <a className="underline" href="">privacy policy</a>.</label>
                    </label>
                <label className="text-xxs text-gray-500 font-mono pt-2.5">
                    <input className="checkbox checkbox-xs border border-gray-500 rounded-none focus:ring-transparent" type="checkbox"></input>
                    <label className="pl-2">Sign me up to the mailing list</label>
                    </label>    
            </form>
            </div>
            </div>
        </div>
        
    )


  
}