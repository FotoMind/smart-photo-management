"use client"
import { useEffect, useState } from "react";
import { storage, auth, db } from "@/app/firebase";
import { useRouter } from 'next/navigation'
import { ref, listAll, getDownloadURL, deleteObject} from "firebase/storage"
import { doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth'
import Sidebar from "../components/sidebar";
import TextInput from "../components/TextInput";



export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    const imageListRef = ref(storage, ('images/' + user)); // add user in curly brace: 'images/${user}'
    const [imageList, setImageList] = useState([]) // image array


    useEffect(() => {
        router.refresh()
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

    const deleteImage = (url) => {
        const desertRef = ref(storage, url);
        const name = String(desertRef.fullPath).split("/")[2]
        
        deleteObject(desertRef).then(() => {
            const imageRef = doc(db, 'users', user, 'images', name);
            deleteDoc(imageRef);
            console.log("Deleted Image");
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

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
                        <div className="shadow-md">
                            <input type="text" placeholder="Search" className="input w-full min-w-full bg-white" />
                        </div>
                    </div>

                    <div className="px-10 py-10 columns-3 space-y-5 space-x-2">
                        {imageList.map((url) => {
                            return (
                            <div key={url} className="relative group">
                                <img className="rounded-xl shadow-2xl transition duration-300 ease-in-out group-hover:opacity-50" src={url} />
                                <div className="absolute top-0 right-0 flex items-center justify-center w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => {deleteImage(url)}} className="text-2xl font-bold text-red-600">X</button>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    
                </div>

        </main>
    )
}