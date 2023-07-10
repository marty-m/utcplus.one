'use client'
import { useState } from "react";
import {useForm} from "react-hook-form";
import {pb} from "@/app/pocketbase";
import { useRouter } from "next/navigation";


export default function Auth(){
    const {register, handleSubmit} = useForm();
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const isLoggedIn = pb.authStore.isValid;
    


    async function login(data: any){
        setLoading(true);
        try {
            const authData = await pb
            .collection('users')
            .authWithPassword(data.email, data.password);
            setLoading(false);
            router.refresh();
        } catch (error) {
            alert(error);
            setLoading(false);
        }
    }
    
    function logout(){
        pb.authStore.clear(); // clear auth data
        
    }    

    if (isLoggedIn) return (
    <>
    <h1>Logged in: {pb.authStore.model.email}</h1>
    <button onClick={logout}>Logout</button>
    </>
    )

    return(
        
        <div>
            <h1>Logged in: {pb.authStore.isValid.toString()}</h1>
            {isLoading && <p>Loading...</p>}
            <form onSubmit={handleSubmit(login)}>
                <input type="email" placeholder="email" {...register("email")} />
                <input type="password" placeholder="password" {...register("password")}/>

                <button type="submit" disabled={isLoading}>{isLoading? "Loading" : "Login"}</button>
            </form>
        </div>
    )
}