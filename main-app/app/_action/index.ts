"use server"
import { getDB, serverUser } from "@/lib/realm";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function setCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set("authToken", token);
}
export async function removeCookie() {
  const cookieStore = cookies();
  cookieStore.delete("authToken");
}

type WebDetails={
  url:string,
  app_id:string,
  app_secret:string;
}
export async function createJWT(obj:{[key:string]:string|number},url:string){
  const server_user=await serverUser()
  const db=getDB(server_user);
  const webDetails=await db.collection("websites").findOne({url}) as WebDetails
  if(!webDetails){
    return null;
  }
  const signObj={aud:webDetails.app_id,...obj}
  const token=sign(signObj,webDetails.app_secret,{
    expiresIn : (60 * 60 ),
    algorithm:"HS256"
  });
  return token;
} 