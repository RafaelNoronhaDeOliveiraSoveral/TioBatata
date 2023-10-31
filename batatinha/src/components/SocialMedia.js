"use client"

import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";

export default function SocialMedia({ plataforma, href }) {
  const [imgSrc, setImgSrc] = useState('');

  const firebaseConfig = {
    apiKey: "AIzaSyDHkX1ORW-WqOuo8xmk6lgNLZzclYT0E1Q",
    authDomain: "tiobatata-134f1.firebaseapp.com",
    projectId: "tiobatata-134f1",
    storageBucket: "tiobatata-134f1.appspot.com",
    messagingSenderId: "726411910302",
    appId: "1:726411910302:web:3b6ec5d4e7cd456cbb6f8f",
    measurementId: "G-WGF95RH9LQ"
  }

  const app = initializeApp(firebaseConfig)
  const storage = getStorage(app)
  const auth = getAuth()

  useEffect(() => {
    signInAnonymously(auth).then(() => {
      const getImage = async () => {
        const utilityRef = ref(storage, `src/icones/${plataforma}.svg`)
        const url = await getDownloadURL(utilityRef)
        setImgSrc(url)
      }
      getImage()
    }).catch((error) => {
      console.error(error)
    })
  }, [auth, plataforma, storage])

  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={plataforma}>
      <img src={imgSrc} alt={`${plataforma} logo`} className="h-[30vw] w-[30vw] md:h-[25vw] md:w-[25vw] lg:h-[20vw] lg:w-[20vw] xl:h-[10vw] xl:w-[10vw]"/>
    </a>
  )
}