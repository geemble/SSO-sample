"use client";

import * as Realm from 'realm-web'
import { useEffect } from "react";

export default function CallbackPage() {

  useEffect(()=>{
    Realm.handleAuthRedirect()
  },[])
  return (
    <div className="bg-white  dark:bg-gray-800 dark:border dark:border-gray-700 rounded-lg shadow-lg  sm:p-6 flex flex-col w-[calc(100%-16px)] sm:w-full sm:max-w-sm 2xl:max-w-md !p-10 gap-10 items-center">
      <p className="text-gray-500 font-semibold">
        Please wait...
      </p>
    </div>
  );
}