"use client"
import { useEffect, useState } from "react";
import { storage } from "@/app/firebase";
import { ref, listAll, getDownloadURL} from "firebase/storage"
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";



export default function Dashboard() {


    const [user] = useAuthState(auth);

    const imageListRef = ref(storage, ('images/' + user.uid)); // add user in curly brace: 'images/${user}'
    const [imageList, setImageList] = useState([]);

    
    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
    }, []);

    const getLabels = () => {
        // Add sign in function
        console.log('MAKING REQ');
        axios.post('/api/home', {})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      };

    return (
        <main>
            <div>
                {imageList.map((url) => {
                    return <img src={url}/>
                })}
            </div>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
        </main>
    )
}