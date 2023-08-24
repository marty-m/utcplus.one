'use client'
import { useForm} from "react-hook-form";
import useSignUp from "@/app/hooks/useSignUp";
import useLoggedInRedir from "@/app/hooks/useLoggedInRedir";



export default function SignupPage() {
    const {register, handleSubmit, reset} = useForm();
    const {signup, isLoading} = useSignUp();
    useLoggedInRedir(); // redirect to home if logged in


    async function onSubmit(data: any){
        await signup(data);
        reset();
        alert("Account created successfully. Please check your email for a verification link.");
    }
    


    return(
        <div className="flex h-full flex-col justify-center items-center w-screen">
            
            <div className="flex  items-center justify-center py-20">
            
            <div className="border w-auto border-black shadow-xl py-14 px-20">
            <h1 className=" text-left   font-bold pb-8 text-4xl underline underline-offset-8">SIGN UP</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center w-auto">
                
                <label className="  text-sm pb-1">EMAIL ADDRESS</label>
                <input type="email" placeholder="" {...register("email")} required/>
                
                <label className="  text-sm pb-1 pt-4">FIRST NAME</label>
                <input type="text" placeholder="" {...register("fname")} required/>

                <label className="  text-sm pb-1 pt-4">LAST NAME</label>
                <input type="text" placeholder="" {...register("lname")} required/>

                <label className=" text-sm pb-1 pt-4">PASSWORD 
                <label className="justify-right text-gray-500   text-right text-xs pl-52">(min. 8 characters)</label>
                </label>
                <input type="password" placeholder="" {...register("password")} required minLength={8}/>
                
                <label className="  text-sm pb-1 pt-4">CONFIRM PASSWORD</label>
                <input type="password" placeholder="" {...register("passwordConfirm")} required minLength={8}/>
                
                <div className="pt-5 pb-4 mx-auto w-full">
                    <button className="w-full rounded-none bg-yellow-300 py-3   text-sm" type="submit" disabled={isLoading}>{isLoading? "LOADING" : "CREATE ACCOUNT"}</button>
                </div>
                
                
                <label className="text-xs text-gray-500  ">
                    <input className="checkbox checkbox-xs border border-gray-500 rounded-none focus:ring-transparent" type="checkbox" required></input>
                    <label className="pl-2">I agree to the <a className="underline" href="">terms and conditions</a> and <a className="underline" href="">privacy policy</a>.</label>
                    </label>
                <label className="text-xs text-gray-500   pt-2.5">
                    <input className="checkbox checkbox-xs border border-gray-500 rounded-none focus:ring-transparent" type="checkbox"></input>
                    <label className="pl-2">Sign me up to the mailing list</label>
                    </label>    
            </form>
            </div>
            </div>
        </div>
        
    )


  
}