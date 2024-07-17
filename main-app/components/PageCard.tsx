"use client";

import { createJWT } from "@/app/_action";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { app, getDB } from "@/lib/realm";
type CardProps = {
  url:string,
  name: string;
};

export default function PageCard({ url, name }: CardProps) {
  async function redirectOnClick() {
    if (!app.currentUser) {
      return null;
    }
    const userObj = {
      sub: app?.currentUser?.id  as string,
      userid:app.currentUser?.id,
      name: app?.currentUser?.customData?.name as string,
      email: app?.currentUser?.customData?.email as string,
      picture: app?.currentUser?.customData?.picture as string,
    };
    const token =await createJWT(userObj, url);
    const accessed= (await getDB(app?.currentUser)
      ?.collection("website_access")
      .findOne({ userid: app.currentUser?.id }))as {userid:string,linked:string[]};
    const linked=accessed?.linked 
    const type = linked?.some((item)=>item===url)?"login":"new";
    window.open(`${url}/login?token=${token}&type=${type}`,"_blank"); 
  }
  return (
    <Card className="w-1/3 pt-5">
      <button onClick={redirectOnClick} className="w-full">
        <CardHeader className="w-full">
          <img src="https://images.unsplash.com/photo-1720312490443-7282c5d840f1?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="card-image" className="rounded-lg h-40 w-full" />
        </CardHeader>
        <CardContent>
          <CardTitle>{name}</CardTitle>
          <p>Card Content</p>
        </CardContent>
      </button>
    </Card>
  );
}
