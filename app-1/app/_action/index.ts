"use server"
import { cookies } from "next/headers";
import {sign} from 'jsonwebtoken'
export async function setCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set("authToken", token);
}
export async function removeCookie() {
  const cookieStore = cookies();
  cookieStore.delete("authToken");
}
