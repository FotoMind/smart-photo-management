"use client"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from 'firebase/auth';
import { useEffect } from "react";
import { useState } from 'react';



export default function dashboard() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); // Array to store uploaded files
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  if(!user && !userSession) {
    router.push('/');
  }

  const openUploadPopup = async () => {
    try {
      const fileHandles = await window.showOpenFilePicker({ multiple: true }); // Allow multiple file selection
      const files = await Promise.all(fileHandles.map(async (fileHandle) => {
        const file = await fileHandle.getFile();
        return file;
      }));

      // Create temporary URLs for the selected files
      const fileUrls = files.map((file) => URL.createObjectURL(file));

      // Update the state with the new file URLs
      setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, ...fileUrls]);
    } catch (err) {
      console.error('Error opening file picker:', err);
    }
  };

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
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={openUploadPopup}>
            Upload Picture
          </button>
        </div>
      </div>
      <div className="carousel rounded-box">
        <div className="carousel-item">
        {uploadedFiles.map((fileUrl, index) => (
          <img
            key={index}
            src={fileUrl}
            alt={`Uploaded Picture ${index + 1}`}
            className="max-w-md max-h-96 m-2"
          />
        ))}
        </div> 
        <div className="carousel-item">
          <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" alt="Burger" />
        </div> 
        <div className="carousel-item">
          <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" alt="Burger" />
        </div> 
        <div className="carousel-item">
          <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" alt="Burger" />
        </div> 
        <div className="carousel-item">
          <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" alt="Burger" />
        </div> 
        <div className="carousel-item">
          <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" alt="Burger" />
        </div> 
        <div className="carousel-item">
          <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" alt="Burger" />
        </div>
      </div>
    </div>

  );
}
