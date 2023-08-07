import { useState, useEffect } from "react";
import { pb } from "../pocketbase";

export default function useVerified() {
    const [isVerified, setVerified] = useState(false);
    
    useEffect(() => {
        async function checkVerification() {
            try {
                const userID = pb.authStore.model.id;
                const userdata = await pb.collection('users').getOne(userID);
                setVerified(userdata.verified);
            } catch (error) {
                console.log(error);
            }
        }
        const isLoggedIn = pb.authStore.isValid;
        if (isLoggedIn) checkVerification();
    }, []);

    return {isVerified};
}    