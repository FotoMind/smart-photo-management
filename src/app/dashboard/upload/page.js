"use client"
import { useState } from "react";
import { storage } from "@/app/firebase";
import { ref, uploadBytes} from "firebase/storage"
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Upload() {
    
    const [imageUpload, setImageUpload] = useState(null);
    const [user] = useAuthState(auth);



    const uploadImage = () => {
        if (imageUpload == null) return;
            const imageRef = ref(storage, 'images/' + user.uid + '/' + uploadImage.name); // add user in curly brace: 'images/${user}'
            uploadBytes(imageRef, imageUpload).then(() => {
                alert("Image Uploaded!");
        }) ;
    };

    return (
        <main>
            <div className="">
                <input 
                    type="file"
                    onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                    }}
                
                />
                <button type="button" onClick={uploadImage}>Upload Image</button>
            </div>
        </main>
    )
}