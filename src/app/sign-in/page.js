'use client'
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const signUp = useCallback(() => {
    router.push('/sign-up');
  }, [router]);

  const signIn = async () => {
    // Add sign in function
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({res});
      sessionStorage.setItem('user', true);
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  const googleSignUp = async () => {
    try {
      const res = await signInWithGoogle();
      console.log({res});
      sessionStorage.setItem('user', true);
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
    }
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
        </div>
      </div>
      <div className="grid grid-cols-1 py-48 h-auto">
        <div className="bg-dark-blue rounded-lg w-96  mx-auto">
          <div className="text-white text-center py-8 text-2xl">
            Sign in
          </div>
          <div className="px-8 text-xl my-auto">
            Email:
            <input className="bg-white w-full px-1 text-black" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="px-8 py-15 text-xl mt-5">
            Password:
            <input className="bg-white w-full px-1 text-black" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="px-8 py-1">
            New to FotoMind?{`  `}
            <button className="underline" onClick={() => signUp()}>
            Sign Up
            </button>
          </div>
          <div className="py-5 px-8">
            <button className="h-10 w-full bg-blue rounded-lg" onClick={() => signIn()}>
              Continue
            </button>
          </div>
          <div className="text-white text-center py-10 content-center">
            Login with Google: {`   `}
            <button className="" onClick={() => googleSignUp()}>
              <FaGoogle className="text-3xl"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
