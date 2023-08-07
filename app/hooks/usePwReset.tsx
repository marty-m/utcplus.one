import { pb } from "../pocketbase";
import { useState } from "react";

export default function usePwReset() {
    
    const [isLoading, setLoading] = useState(false);
    
    async function pwReset({email}) {
        setLoading(true);
        try {
            const authData = await pb
                .collection('users')
                .requestPasswordReset(email);
        } catch (error) {
            alert(error);
        }
        setLoading(false);
    }
    return {pwReset, isLoading};
}