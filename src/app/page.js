'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Home() {
  const router = useRouter();

  const goLogin = useCallback(() => {
    router.push('/sign-in');
  }, [router]);

  return (
    <div className="h-screen bg-white py-6">
      <div className="flex justify-center text-4xl text-black flex-row w-screen h-15">
        <div className="flex basis-1/3 justify-center">
          
        </div>
        <div className="flex basis-1/3 justify-center text-blue">
          FotoMind
        </div>
        <div className="flex justify-center basis-1/3">
          <button className="bg-orange rounded-lg text-sm h-full w-1/4 text-white" onClick={() => goLogin()}>
            Login
          </button>
        </div>
      </div>
      <div className="text-white flex text-xl justify-center h-60 my-5 mx-5 bg-blue rounded-lg">
        <div className="justify-center my-auto">
          Welcome to FotoMind a place where you can store, organize, and categorize your photos!
        </div>
        
      </div>
    </div>
  );
}
