"use client"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from 'firebase/auth';
import { useEffect } from "react";

export default function dashboard() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');

  if(!user && !userSession) {
    router.push('/');
  }

  return (
    <div className="h-screen bg-white py-6">
      <div className="flex justify-center text-4xl text-black flex-row w-screen h-15">
        <div className="flex basis-1/3 justify-center">
          
        </div>
        <div className="flex basis-1/3 justify-center text-blue">
          FotoMind
        </div>
        <div className="flex justify-center basis-1/3">
          <button className="bg-orange rounded-lg text-sm h-full w-1/4 text-white" onClick={() => 
            {signOut(auth)
            sessionStorage.removeItem('user')
            }}>
            Sign Out
          </button>
        </div>
      </div>
      <div className="text-white flex text-xl justify-center h-60 my-5 mx-5 bg-blue rounded-lg">
        <div className="justify-center my-auto">
          FotoMind Home Page
        </div>
      </div>
    </div>
  );
}
