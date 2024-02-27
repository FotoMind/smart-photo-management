"use client"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut, setPersistence, browserSessionPersistence, UserInfo } from 'firebase/auth';
import { useEffect } from "react";
import { storage } from "@/app/firebase/config";
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { useState } from "react";

export default function dashboard() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');
  if(!user && !userSession) {
    router.push('/');
  }

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  setPersistence(auth, browserSessionPersistence);
  // Get the user UID
  
  if (user !== null) {
    console.log(user.uid);
  } else {
    console.log("No User");
  }
  const uid = "Hello";
  
  const imageListRef = ref(storage, `images/${uid}`);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${uid}/${uploadImage.name}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Uploaded")
    })
  };
  
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        })
      })
    })
  }, []);
  // Get the user's images
  //const db =  getFirestore(app);

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
      <div>
          <input type='file' onChange={(event) => {setImageUpload(event.target.files[0])}}/>
          <button onClick={uploadImage} className="text-black">
            Upload Image
          </button>
      </div>
      <div className="px-10 py-10">
        {imageList.map((url) => {
          return <img src={url} />
        })}
      </div>
      
    </div>
  );
}
