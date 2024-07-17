"use client";
import Logout from "@/components/Logout";
import {  useApp } from "@/lib/realm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const app=useApp()
  const [isLogin,setLogin]=useState<boolean>(false);
  useEffect(() => {
    if (app?.currentUser === null) {
      console.log("hello");
      router.push("/login");
    }
    else{
      setLogin(app!==undefined && app?.currentUser!==null)
      console.log(app?.currentUser?.customData,isLogin);
    }
  }, [app, app?.currentUser]);
  return (
    <>
  { isLogin && <main className={`flex min-h-screen flex-col items-center gap-12 p-24 `}>
            <h1 className="font-bold text-4xl">Website 2</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              sint esse maxime, officia nesciunt provident. Nobis optio impedit
              quas.
            </p>
            <Logout />
      </main>}
    </>
  );
}
