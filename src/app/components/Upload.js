"use client"
import { useState } from "react";
import { storage, db, auth } from "@/app/firebase";
import { ref, uploadBytes} from "firebase/storage"
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc } from 'firebase/firestore';
import axios from "axios";

export default function Upload() {
    
    const [imageUpload, setImageUpload] = useState(null);
    const [user] = useAuthState(auth);
    const [labels, setLabels] = useState([]);



    const uploadImage = async () => {
        if (imageUpload == null) return;
            const imageRef = ref(storage, 'images/' + user.uid + '/' + imageUpload.name); // add user in curly brace: 'images/${user}'
            await uploadBytes(imageRef, imageUpload).then(() => {
                console.log("Image Uploaded!");
        });

        axios.post('/api/home', {
            name: imageUpload.name,
            uid: user.uid,
        }).then(async (response) => {
            const newImageRef = doc(db, 'users', user.uid, 'images', imageUpload.name);
            await setDoc(newImageRef, {
                labels: response.data.labels
            });
            console.log('Labels Added')
            window.location.reload();
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