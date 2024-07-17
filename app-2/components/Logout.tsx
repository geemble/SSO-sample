"use client"
import { removeCookie } from "@/app/_action";
import { Button } from "./ui/button";
import { useApp } from "@/lib/realm";
import { useRouter } from "next/navigation";

export default function Logout() {
  const app=useApp()
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await app?.currentUser?.logOut();
        router.replace("/login");
      }}
    >
      Log out
    </Button>
  );
}
