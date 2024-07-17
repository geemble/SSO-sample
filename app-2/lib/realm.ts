import { useEffect, useState } from "react";
import * as Realm from "realm-web";
export function useApp() {
  const [app, setApp] = useState<Realm.App|null>(null);
  // Run in useEffect so that App is not created in server-side environment
  useEffect(() => {
    setApp(Realm.getApp(process.env.NEXT_PUBLIC_REALM_APP_ID as  string));
    console.log("app loaded")
  }, []);
  return app;
}
export async function googlelogin() {
  console.log("google_login");
  const redirectURI = `${window.location.protocol}//${window.location.host}/callback`;
  try {
    const app=Realm.getApp(process.env.NEXT_PUBLIC_REALM_APP_ID as  string)
    const credentials = Realm.Credentials.google({
      redirectUrl: redirectURI,
    });
    const user = await app?.logIn(credentials);
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    console.log("error");
    return null;
  }
}
export async function JWTLogin(token: string) {
  try {
    const app=Realm.getApp(process.env.NEXT_PUBLIC_REALM_APP_ID as  string);
    const credentials = Realm.Credentials.jwt(token);
    const user = await app?.logIn(credentials);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export function getDB(App: Realm.App){
    return App.currentUser?.mongoClient(process.env.NEXT_PUBLIC_MONGO_CLIENT as string).db(process.env.NEXT_PUBLIC_DB as string);
}
