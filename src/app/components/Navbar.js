'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, use } from "react";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "@/app/firebase";

export default function Navbar() {
    const router = useRouter();
  
    return(
        <div className='p-5 bg-blue border-2 border-dark-blue'>
            {!auth.currentUser ?
            <div className=''>
                <button type="button" onClick={() => router.push('/')} className="px-10 font-light text-xl text-white antialiased">Fotomind</button>
                <button type="button" onClick={() => router.push('/sign-in')} className="px-10 font-light text-xl float-right text-red border-2 rounded-lg antialiased">Sign In</button>
            </div>
            :
            <div className=''>
                <button type="button" onClick={() => router.push('/')} className="px-10 font-light text-xl text-white antialiased">Fotomind</button>
                <button type="button" onClick={() => router.push('/dashboard')} className="px-10 font-light text-xl text-white antialiased">Gallery</button>
                <button type="button" onClick={() => {router.push('/'); signOut(auth); localStorage.setItem('user', false); router.refresh()}} className="px-10 font-light text-xl float-right text-red border-2 rounded-lg antialiased">Sign Out</button>
            </div>
            }
        </div>
    )
}
