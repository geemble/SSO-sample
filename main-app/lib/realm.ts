import * as Realm from "realm-web";
import { setCookie } from '@/app/_action'

export const MongoRealm=Realm
export const app = Realm.getApp(process.env.NEXT_PUBLIC_REALM_APP_ID as string);
export let currentUser = app.currentUser;


export async function googlelogin() {
  const redirectURI = `${window.location.protocol}//${window.location.host}/callback`;
  try {
    const credentials = Realm.Credentials.google({
      redirectUrl: redirectURI,
    });
    const user = await app.logIn(credentials);
    await setCookie(user.accessToken as string);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function getDB(user: Realm.User){
    return user?.mongoClient(process.env.NEXT_PUBLIC_MONGO_CLIENT as string).db(process.env.NEXT_PUBLIC_DB as string);
}

 
export async function serverUser(){
  const credentials=Realm.Credentials.apiKey(process.env.SERVER_API_KEY as string)
  const server_user=await app.logIn(credentials)
  return server_user
}