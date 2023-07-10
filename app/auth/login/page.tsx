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



            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="email" {...register("email")} />
                <input type="password" placeholder="password" {...register("password")}/>

                <button type="submit" disabled={isLoading}>{isLoading? "Loading" : "Login"}</button>
            </form>
        </div>
    )
}