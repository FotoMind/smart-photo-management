'use client'
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = useCallback(() => {
    // Call sign up function
  }, [name, email, password]);

  return (
    <div className="h-screen bg-white py-6">
      <div className="flex justify-center text-4xl text-black flex-row w-screen h-15">
        <div className="flex basis-1/3 justify-center">
          
        </div>
        <div className="flex basis-1/3 justify-center text-blue">
          FotoMind
        </div>
        <div className="flex justify-center basis-1/3">
        </div>
      </div>
      <div className="grid grid-cols-1 py-48 h-auto">
        <div className="bg-dark-blue rounded-lg w-96  mx-auto">
          <div className="text-white text-center py-8 text-2xl">
            Sign Up
          </div>
          <div className="px-8 text-xl my-auto">
            Username:
            <input className="bg-white w-full px-1 text-black" onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="px-8 text-xl my-auto mt-5">
            Email:
            <input className="bg-white w-full px-1 text-black" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="px-8 py-15 text-xl mt-5 mb-4">
            Password:
            <input className="bg-white w-full px-1 text-black" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="py-5 px-8">
            <button className="h-10 w-full bg-blue rounded-lg" onClick={signUp()}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}