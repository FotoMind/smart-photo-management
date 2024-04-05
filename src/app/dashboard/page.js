"use client"
import { useEffect, useState } from "react";
import { storage } from "@/app/firebase";
import { ref, listAll, getDownloadURL} from "firebase/storage"
import { auth } from "@/app/firebase/config";
import { getAuth ,onAuthStateChanged } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../components/sidebar";
import TextInput from "../components/TextInput";
import axios from 'axios';


export default function Dashboard() {

    
    const auth = getAuth();
    const [user, setUser] = useState(null);

    const imageListRef = ref(storage, ('images/' + user)); // add user in curly brace: 'images/${user}'
    const [imageList, setImageList] = useState([]) // image array
    const [image, setImage] = useState();


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) { 
                setUser(user.uid);
                setImages();
            }
        });
    }, [user])

    const setImages = () => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url])
                })
            })
        })
    }

    const getLabels = () => {
        // Add sign in function
        console.log('MAKING REQ');

        const formdata = new FormData();
        formdata.append("image", image);
        axios.post('/api/home', {
            body: formdata
        })
        .then((response) => {
        //   console.log(response);
        })
        .catch((error) => {
        //   console.log(error);
        });
      };


    return (
        <main className="bg-white flex-row">
                <div>
                    <Sidebar></Sidebar>
                </div>


                <div className="flex-row">
                    <div>
                        <TextInput></TextInput>
                        <input type='file' onChange={(e) => setImage(e.target.value)}/>
                        <button onClick={getLabels}>Submit</button>
                    </div>
                    <div className="px-10 py-10">
                        {imageList.map((url) => {
                            return <img src={url} />
                        })}
                    </div>
                    
                </div>

        </main>
    )
}