"use client"
import { Button } from "@/components/ui/button";
import { googlelogin } from "@/lib/realm";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router=useRouter();
  async function handlelogin(){
    try {
      const user=await googlelogin()
      if(!user){
        console.log("google auth error")
        return
      }
      await Promise.all([
        user?.refreshProfile(),
        user?.refreshAccessToken(),
        user?.refreshCustomData(),
      ]);
      router.replace("/");
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="h-screen w-full grid place-items-center bg-gray-200">
      <div className="rounded-md p-2 bg-white">
        <Button onClick={handlelogin}>Google login</Button>
      </div>
    </div>
  );
}
