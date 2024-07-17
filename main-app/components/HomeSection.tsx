"use client";

import { removeCookie } from "@/app/_action";
import PageCard from "./PageCard";
import { Button } from "./ui/button";
import { app, getDB } from "@/lib/realm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Website={
  url:string,
  name:string,
}[]
export default function HomeSection() {
  const [token,setToken]=useState("");
  const [data,setData]=useState<Website>([])
  const router=useRouter()
  async function fetchWebsites(){
    if(!app.currentUser){
      return
    }
    const db=getDB(app?.currentUser)
    const tempData=await db.collection("websites").find()
    setData(tempData);
  }
  useEffect(()=>{
    fetchWebsites()
  },[])
  return (
    <>
      <div className="flex w-full gap-8">
        {data.map((item) => (
          <PageCard key={item.name} {...item}/>
        ))}
      </div>
      <div>
        <Button
          onClick={async () => {
            await removeCookie();
            await app?.currentUser?.logOut();
            router.replace("/login");
          }}
        >
          Log out
        </Button>
      </div>
    </>
  );
}
