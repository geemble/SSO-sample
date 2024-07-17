import HomeSection from "@/components/HomeSection";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

export default function Home() {
  const cookieStore=cookies()
  if(cookieStore.get('authToken')===undefined){
    permanentRedirect('/login')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
      <HomeSection/>
    </main>
  );
}
