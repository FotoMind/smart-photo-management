'use client'
import { useEffect, useState } from "react";

export default function Landing() {
  
  useEffect(() => {
    localStorage.setItem('user', false);
  }, []) 
  
  return (
    <main className="bg-gradient-to-r from-blue to-red flex-col"> 
      <div className="h-screen w-screen text-white text-4xl font-medium p-52 tracking-wide">
      <h>Welcome to Fotomind</h>
      </div>
      <div className="text-white text-xl p-36 space-y-56 flex-row">
      <p className="py-80">A creative solution for uploading, storing, and viewing your images.</p>
      </div>
      <div className="text-white text-xl p-36 space-y-56 flex-row">
      <p className="py-80">Use AI to filter through and select the exact images you want.</p>
      </div>
    </main>
  );
}
