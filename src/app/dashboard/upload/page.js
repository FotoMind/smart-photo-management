"use client"
import { useState } from "react";
import { storage } from "@/app/firebase";
import { ref, uploadBytes} from "firebase/storage"

export default function Upload() {
    const [imageUpload, setImageUpload] = useState(null);

    const uploadImage = () => {
        console.log("got here");
        if (imageUpload == null) return;
            console.log("image was set");
            const imageRef = ref(storage, 'images/${imageUpload.name}'); // add user in curly brace: 'images/${user}'
            uploadBytes(imageRef, imageUpload).then(() => {
                console.log("image should be uploaded")
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