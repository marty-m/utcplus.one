import { pb } from "@/app/pocketbase";
import {useRouter} from "next/navigation";
import { useEffect } from "react";

export default function useLoggedInRedir() {
    const isLoggedIn = pb.authStore.isValid;
    const router = useRouter();
    function redirect(){
    useEffect(() => {
        if (isLoggedIn) router.push('/');
    }, [isLoggedIn]);}

    return {redirect, isLoggedIn};
}