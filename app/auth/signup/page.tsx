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
        
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="email" placeholder="email" {...register("email")} required/>
                <input type="text" placeholder="First Name" {...register("fname")} required/>
                <input type="text" placeholder="Last Name" {...register("lname")} required/>
                <input type="password" placeholder="password" {...register("password")} required minLength={8}/>
                <input type="password" placeholder="confirm password" {...register("passwordConfirm")} required minLength={8}/>


                <button type="submit" disabled={isLoading}>{isLoading? "Loading" : "Create Account"}</button>
            </form>
        </div>
    )


  
}