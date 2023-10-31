"use client"
/// page.js
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import NavMinima from '@/components/NavMinima';
import ShortsPlayer from '@/components/ShortsPlayer';
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from "firebase/auth"
import Head from 'next/head';

export default function Palhaco() {

    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [displayedContent, setDisplayedContent] = useState('photos');
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // new state variable to keep track of the current video
    const [imgUrls, setImgUrls] = useState([]);
    const [videoUrls, setVideoUrls] = useState([]);
    const conteudo = "O show ainda deve chegar! :D"

    const firebaseConfig = {
        apiKey: "AIzaSyDHkX1ORW-WqOuo8xmk6lgNLZzclYT0E1Q",
        authDomain: "tiobatata-134f1.firebaseapp.com",
        projectId: "tiobatata-134f1",
        storageBucket: "tiobatata-134f1.appspot.com",
        messagingSenderId: "726411910302",
        appId: "1:726411910302:web:3b6ec5d4e7cd456cbb6f8f",
        measurementId: "G-WGF95RH9LQ"
    };

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const auth = getAuth();

    signInAnonymously(auth).then(() => {
        console.log('signed in anonymously');
    }).catch((error) => {
        console.error(error);
    });
      

    useEffect(() => {
        const getMediaUrls = async () => {
            // Get the references
            let imgListRef = ref(storage, 'imagens/palhaco');
            let videoListRef = ref(storage, 'videos/palhaco'); // Assuming 'videos' is the directory for videos
    
            // Find all images and videos.
            let imageFetching = await getUrls(imgListRef);
            let videoFetching = await getUrls(videoListRef);
    
            Promise.all([imageFetching, videoFetching]).then(([imageUrls, videoUrls]) => {
                setImgUrls(imageUrls);
                setVideoUrls(videoUrls);
            });
        };
    
        const getUrls = (listRef) => {
            return new Promise((resolve, reject) => {
                listAll(listRef).then((res) => {
                    let urls = [];
                    let promises = [];
                    res.items.forEach((itemRef) => {
                        promises.push(getDownloadURL(itemRef));
                    });
                    Promise.all(promises).then((urls) => { resolve(urls); }).catch((error) => { reject(error); });
                }).catch((error) => {
                    reject(error);
                });
            });
        };
    
        getMediaUrls();
    }, []);


    const openModal = (imgPath) => {
        setShowModal(true);
        setCurrentImage(imgPath);
    };

    const closeModal = () => setShowModal(false);

    const toggleContent = (content) => {
        setDisplayedContent(content);
    }

    // A helper function to handle video change
    const handleChangeVideo = (direction) => {
        // If swiped up, go to the next video
        if (direction === 'up') {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
        }

        // If swiped down, go to the previous video
        if (direction === 'down') {
            setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videoUrls.length) % videoUrls.length);
        }
    };

    return (
        <>
            <Head>
                <title>Tio Batata: Palhaço Batatinha</title>
            </Head>
            <NavMinima toggleContent={toggleContent} titulo={"BATATINHA"}/>

            {displayedContent === 'photos' && (
                imgUrls.length > 0 ?
                (
                    <div role="region" aria-label="Photo Gallery" className="flex justify-center p-4">
                        <div className="grid grid-cols-2 gap-4">
                            {imgUrls.map((imgUrl, index) => (
                                <div key={`${imgUrl}_${index}`} className="rounded" onClick={() => openModal(imgUrl)}>
                                    <img
                                        src={imgUrl}
                                        alt={`Gallery Image ${index + 1}`}
                                        className="w-full h-full object-cover rounded-xl cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) :
                (
                    <h1 className="text-gray-500 text-2xl m-4 font-titular">{conteudo}</h1>
                )
            )}

            {displayedContent === 'videos' && (
                videoUrls.length > 0 ?
                (
                    <div className='flex items-center justify-center h-full w-auto mt-24'>
                    <ShortsPlayer 
                    src={videoUrls[currentVideoIndex]}
                    onSwipe={handleChangeVideo}
                    />
                    </div>
                ) :
                (
                    <h1 className="text-gray-500 text-2xl m-4 font-titular">{conteudo}</h1>
                )
            )}
   
            {showModal && (
                <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="rounded-3xl shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                            <h2 id="modal-title" className="sr-only">Current Gallery Image</h2> 
                            <div className="relative p-6 flex-auto">
                                <img src={currentImage} alt={`Gallery Image ${currentImage}`} style={{imageRendering: '-webkit-optimize-contrast'}} className="w-full h-full object-contain rounded-3xl" />
                            </div>
                            <button
                                className="absolute top-0 right-0 mt-8 mr-8" 
                                onClick={() => closeModal()}>
                                <span className="sr-only">Close modal</span> {/* Screen-reader only text */}
                                <AiOutlineClose size={20} className='text-white'/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};