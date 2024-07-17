"use client";
import { Button, } from "@/components/ui/button";
import { googlelogin, useApp } from "@/lib/realm";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as Realm from "realm-web";
import { Dialog,DialogContent, DialogOverlay } from "./ui/dialog";
type Props = {
  token: string;
  master: boolean;
  type: "login" | "new";
};
export default function LoginForm({ token }: Props) {
  const router = useRouter();
  const searchParams=useSearchParams();
  const type=searchParams.get("type")
  const app = useApp();
  const [isLoading, setLoading] = useState(type==="login");
  async function handlelogin() {
    try {
      const user = await googlelogin();
      if (!user) {
        console.log("google auth error");
        return;
      }
      await Promise.all([
        user?.refreshProfile(),
        user?.refreshAccessToken(),
        user?.refreshCustomData(),
      ]);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }
  function sample() {
    return new Promise((resolve: (value: any) => void) => {
      setTimeout(() => {
        resolve(5);
      }, 1000);
    });
  }
  async function handleMasterLogin() {
    try {
      switch (type) {
        case "new":
          console.log("new 2");
          const newUser = await googlelogin();
          console.log(newUser);
          setLoading(true);
          if (!newUser) {
            console.log("google auth error");
            return;
          }
          console.log(newUser);
          await Promise.all([
            newUser?.refreshProfile(),
            newUser?.refreshAccessToken(),
            newUser?.refreshCustomData(),
          ]);
          if (!token) {
            return;
          }
          const jwtCreds = Realm.Credentials.jwt(token);
          await newUser?.linkCredentials(jwtCreds);
          await Promise.all([
            newUser?.refreshProfile(),
            newUser?.refreshAccessToken(),
            newUser?.refreshCustomData(),
          ]);
          const res=await fetch("http://localhost:3000/api/connect",{
            method:"POST",
            body:JSON.stringify({
                url:window.location.origin,
                userid:newUser.customData?.linkedid
            })
          })
          const data=await res.json()
          console.log(data);
          router.replace("/");
          break;
        case "login":

          const creds = Realm.Credentials.jwt(token);
          const loginUser = await app?.logIn(creds);
          if (!loginUser) {
            console.log("jwt auth error");
            return;
          }
          await Promise.all([
            loginUser?.refreshProfile(),
            loginUser?.refreshAccessToken(),
            loginUser?.refreshCustomData(),
          ]);
          setLoading(false);
          router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(type)
    if(type==="login" && app && !app.currentUser){
      handleMasterLogin()
    }
    if(app && app.currentUser){
      router.replace("/")
    }
  }, [app, app?.currentUser]);
  return (
    <>
      {!isLoading ? (
        <div className="h-screen w-full grid place-items-center bg-gray-200">
          <div className="rounded-md p-2 bg-white">
            <Button onClick={handlelogin}>Google login</Button>
          </div>
          <Dialog open={type==="new"}>
            <DialogOverlay className="!bg-black/10">
              <DialogContent className="flex flex-col items-center bg-white rounded-md">
                <div>connect to parenet website</div>
                <Button onClick={handleMasterLogin}>Granted</Button>
              </DialogContent>
            </DialogOverlay>
          </Dialog>
        </div>
      ) : (
        <div className="h-screen w-full grid place-items-center bg-gray-200">
          <div className="rounded-md w-48 h-24 bg-white flex items-center justify-center">
            <span>Logging In...</span>
          </div>
        </div>
      )}
    </>
  );
}
