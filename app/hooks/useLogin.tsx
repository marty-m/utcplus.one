import {useRouter} from "next/navigation";
import { pb } from "../pocketbase";
import { useState } from "react";


export default function useLogin() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    async function login({email, password}) {
        setLoading(true);
        try {
            const authData = await pb
                .collection('users')
                .authWithPassword(email, password);
            router.refresh();
        } catch (error) {
            alert(error);
        }
        setLoading(false);
    }
    return {login, isLoading};
}