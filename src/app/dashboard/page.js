"use client"
import { useEffect, useState } from "react";
import { storage } from "@/app/firebase";
import { ref, listAll, getDownloadURL} from "firebase/storage"
import { auth } from "@/app/firebase/config";
import { getAuth ,onAuthStateChanged } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../components/Sidebar";
import TextInput from "../components/TextInput";


export default function Dashboard() {

    
    const auth = getAuth();
    const [user, setUser] = useState(null);

    //const imageListRef = ref(storage, ('images/' + user)); // add user in curly brace: 'images/${user}'
    //const [imageList, setImageList] = useState([]) // image array


    onAuthStateChanged(auth, (user) => {
    if (user) { setUser(user.uid)}
    });

    /**
    listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
                setImageList((prev) => [...prev, url])
            })
        })
    })
    */

    /**
     * {imageList.map((url) => {
                    return <img src={url}/>
                })}
     */


    return (
        <main className="bg-white flex-row">
                <div>
                    <Sidebar></Sidebar>
                </div>


                <div className="flex-row">
                    <div>
                        <TextInput></TextInput>
                    </div>
                    <div>

                    </div>
                    
                </div>

        </main>
    )
}