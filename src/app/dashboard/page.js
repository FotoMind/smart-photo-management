"use client"
import { useEffect, useState } from "react";
import { storage } from "@/app/firebase";
import { ref, listAll, getDownloadURL} from "firebase/storage"
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from 'axios';



export default function Dashboard() {


    const [user] = useAuthState(auth);

    const imageListRef = ref(storage, `images/${user}`); // add user in curly brace: 'images/${user}'
    const [imageList, setImageList] = useState();

    
    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
    }, []);

    const getLabels = (file) => {
        // Convert image to form data
        let formData = new FormData();
        formData.append("labels", "Chris");
        axios.post('/api/home', {
            key1: "hello"
        })
        .then((response) => {
          //console.log(response);
        })
        .catch((error) => {
          //console.log(error);
        });
      };

    return (
        <main>
            <input type="file" cltassName="file-input file-input-bordered w-full max-w-xs" onChange={(event) => {setImageList(event.target.files[0])}}/>

            <button onClick={getLabels(imageList)} className="w-full max-w-xs outline-dotted">
                Upload Image and label
            </button>
        </main>
    )
}