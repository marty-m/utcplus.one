import { useRouter } from "next/navigation";
import { useState } from "react";
import { pb } from "../pocketbase";

export default function useSignUp() {
    
    const [isLoading, setLoading] = useState(false);
    const router = useRouter(); // get router
    
    async function createUser(data: any){
        
        if (data.password !== data.passwordConfirm) return alert("Passwords do not match"); // check if passwords match
        
        setLoading(true);
        try {
            const userdata = {
                "email": data.email,
                "password": data.password,
                "passwordConfirm": data.passwordConfirm,
                "name": data.fname + " " + data.lname,
            }
    
            const signUpData = await pb.collection("users").create(userdata);
            pb.collection('users').requestVerification(data.email);


            setLoading(false);
            
            router.refresh();
        } catch (err) {
            alert(err.response.data.email.message);
            setLoading(false);
        }
    } 

    return {signup: createUser, isLoading};
}