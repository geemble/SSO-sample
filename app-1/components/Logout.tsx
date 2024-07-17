"use client"
import { removeCookie } from "@/app/_action";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/realm";
export const dynamic="force-dynamic"
export default function Logout() {
  const app=useApp();
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await app?.currentUser?.logOut();
        console.log(app?.currentUser)
        router.replace("/login?");
      }}
    >
      Log out 
    </Button>
  );
}
