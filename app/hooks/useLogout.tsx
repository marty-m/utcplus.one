import { pb } from "../pocketbase";
import { useRouter } from "next/navigation";

export default function useLogout() {
    const router = useRouter();
    function logout(){
        pb.authStore.clear(); // clear auth data
        router.refresh(); // refresh page
    }   return logout
}