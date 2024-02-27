"use client"
import { useEffect, useState } from "react";
import { storage } from "@/app/firebase";
import { ref, listAll, getDownloadURL} from "firebase/storage"

export default function Dashboard() {

    const imageListRef = ref(storage, "images/") // add user in curly brace: 'images/${user}'
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

    return (
        <main>
            <div>
                {imageList.map((url) => {
                    return <img src={url}/>
                })}
            </div>
        </main>
    )
}