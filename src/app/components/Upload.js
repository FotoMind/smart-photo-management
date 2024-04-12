"use client"
import { useState } from "react";
import { storage } from "@/app/firebase";
import { ref, uploadBytes} from "firebase/storage"
import { auth } from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

export default function Upload() {
    
    const [imageUpload, setImageUpload] = useState(null);
    const [user] = useAuthState(auth);
    const [labels, setLabels] = useState([]);



    const uploadImage = () => {
        if (imageUpload == null) return;
            const imageRef = ref(storage, 'images/' + user.uid + '/' + imageUpload.name); // add user in curly brace: 'images/${user}'
            uploadBytes(imageRef, imageUpload).then(() => {
                alert("Image Uploaded!");
        });

        axios.post('/api/home', {
            name: imageUpload.name,
            uid: user.uid,
        }).then((response) => {
            console.log(response.json().labels);
        })
    };

    return (
            <div className="space-x-4">
                <input 
                    type="file"
                    className="file-input file-input-bordered file-input-sm w-full max-w-xs text-black"
                    onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                    }}
                />
                <button type="button" className="btn btn-sm btn-neutral" onClick={uploadImage}>Upload Image</button>
            </div>
    )
}