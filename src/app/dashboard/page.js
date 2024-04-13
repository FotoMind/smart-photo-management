"use client"
import { useEffect, useState } from "react";
import { storage } from "@/app/firebase";
import { ref, listAll, getDownloadURL} from "firebase/storage"
import { auth } from "@/app/firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
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
        const formdata = new FormData();
        formdata.append("image", image);
        axios.post('/api/home', {
            name: 'bname',
            uid: 'uid'
        })
        .then((response) => {
        //   console.log(response);
        })
        .catch((error) => {
        //   console.log(error);
        });
      };

      /**
       * <input type='file' onChange={(e) => setImage(e.target.value)}/>
                        <button onClick={getLabels}>Submit</button>
       */



    return (
        <main className="flex bg-gradient-to-r from-blue to-red">
                <div className="">
                    <Sidebar></Sidebar>
                </div>


                <div className="rows-2 border-dark-blue float-left">

                    <div className="py-5 px-5">
                        <TextInput></TextInput>
                    </div>

                    <div className="px-10 py-10 columns-3 space-y-5 space-x-2">
                        {imageList.map((url) => {
                            return <img key={url} className="rounded-xl shadow-2xl" src={url} />
                        })}
                    </div>
                    
                </div>

        </main>
    )
}