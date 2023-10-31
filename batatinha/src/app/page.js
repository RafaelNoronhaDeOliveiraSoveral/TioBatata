"use client";
import MenuMobile from "@/components/MenuMobile";
import MenuDesktop from "@/components/MenuDesktop";
import CustomPlayer from "@/components/CustomPlayer";
import WTrabalho from "@/components/WTrabalho";
import { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth , signInAnonymously } from "firebase/auth";
import Head from 'next/head';


export default function Home() {

  const [fotosPalhaco, setFotosPalhaco] = useState([])
  const [fotosMago, setFotosMago] = useState([])
  const [fotosAnimador, setFotosAnimador] = useState([])
  const [homevideoUrl, setHomevideoUrl] = useState([])
  const [socialMediaIcons, setsocialMediaIcons] = useState([])

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

  useEffect(() => {
    signInAnonymously(auth).then(() => {
      const getImageUrls = async (folderName, setStateFunction) => {
        const listRef = ref(storage, `cards/${folderName}`);
        const res = await listAll(listRef)
        const promises = res.items.map(itemRef => getDownloadURL(itemRef));
        const urls = await Promise.all(promises);
        setStateFunction(urls);
      }
      const getHomevideoUrl = async () => {
        const videoRef = ref(storage, 'videoshome/exemplo.mp4'); // replace 'my_video.mp4' with your actual video path 
        const url = await getDownloadURL(videoRef);
        setHomevideoUrl(url);
      }

      const getSocialMediaIcons = async () => {
        const listRef = ref(storage, `src/icones/minimos`); // replace this based on your icon location
        const res = await listAll(listRef)
        const promises = res.items.map(itemRef => getDownloadURL(itemRef));
        const urls = await Promise.all(promises);
        setsocialMediaIcons(urls);
      }
      
      getHomevideoUrl();
      getSocialMediaIcons();
      getImageUrls('palhaco', setFotosPalhaco);
      getImageUrls('mago', setFotosMago);
      getImageUrls('animador', setFotosAnimador);
      // Call this function similarly for 'mago' and 'animador' folders
    }).catch((error) => {
      console.error(error);
    });

  },[])

  return (
    <>
      <Head>
        <title>Tio Batata</title>
      </Head>
      <div className="w-screen">
      {/*MENU*/}
      <header className="bg-white">
        <MenuMobile/>
        <MenuDesktop/>
      </header>

      <div className="w-full h-auto md:hidden">
          <CustomPlayer src={homevideoUrl} />
      </div>

      {/*SOBRE*/}
      <div className="flex flex-col bg-white min-h-screen px-6 py-10 sm:px-2 sm:py-6 lg:px-10 xl:px-20 2xl:px-40 2xl:py-20">
        <div className="flex justify-center">
          <h1 className="font-titular text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl py-6 text-azul-opaco">SOBRE</h1>
        </div>
        <div className="flex justify-center items-center flex-col lg:flex-row">
            <img src="/midias/imagens/recursos_app/foto_circular_perfil.jpg" className="rounded-full h-28 sm:h-32 md:h-36 lg:h-40 2xl:h-48 w-28 sm:w-32 md:w-36 lg:w-40 2xl:w-48" alt="Profile Image"/>
            <div className="pl-3 mt-4 lg:mt-0 lg:pl-8">
              <h3 className="font-titular text-azul-opaco text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl text-center">Henrique Reis</h3>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl">Animador de festas infantis</p>
            </div>
        </div>
        <div className="flex justify-center mt-8 text-center">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl">
            Se você quer uma festa infantil divertida e inesquecível, 
            contrate o Tio Batata, o animador que faz a criançada rir e se encantar. 
            Ele tem muita experiência em brincadeiras, piadas, mágicas, músicas e balões, se adaptando ao tema e
            espaço da festa. 
          </p>
        </div>
        <div className="flex flex-col justify-center items-center mt-auto mb-20">
          <h1 className="font-titular text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl text-azul-opaco mt-32">TRABALHOS</h1>
          <img src="/midias/SVGs/seta_baixo.svg" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 2xl:h-10 2xl:w-10 mt-2" alt="Arrow Down"/>
        </div>
      </div>



      <div className="h-full">
        {/*SEÇÃO PALHAÇO BATATINHA*/}
        <WTrabalho
          id="1"
          back="/midias/imagens/recursos_app/backgrounds/inicio_palhaco2.jpg"
          cards={fotosPalhaco}
          titulo="BATATINHA"
          cor_btn={"#22709C"}
          cor_titulo={"#FF1A51"}
          redirect = {"palhaco"}
        />

        {/*SEÇÃO BRUXO*/}
        <WTrabalho
          id="2"
          back="/midias/imagens/recursos_app/backgrounds/inicio_bruxo.png"
          cards={fotosMago}
          titulo="MAGO"
          cor_btn={"#FF1A51"}
          cor_titulo={"#FFBB0D"}
          redirect = {"mago"}
        />

        {/*SEÇÃO ANIMADOR*/}
        <WTrabalho
          id="3"
          back="/midias/imagens/recursos_app/backgrounds/inicio_animador.png"
          cards={fotosAnimador}
          titulo="ANIMADOR"
          rec_animado="\midias\SVGs\inicio_splash2.svg"
          cor_btn={"#FF1A51"}
          cor_titulo={"#FFFFFF"}
          redirect = {"animador"}
        />
      </div>

      {/*RODAPÉ*/}
      <footer className="flex flex-col justify-around items-center bg-roxo-batatinha w-screen box-content py-4">
        <div>
          <p className="text-white">copyright © 2023 Henrique Reis de Oliveira</p>
        </div>
        <ul className="flex">
          {
            socialMediaIcons.map((url, index) => (
              <li className="px-1" key={index}>
                <img src={url} className="h-6 w-auto" alt={`Social Icon #${index}`} />
              </li>
            ))
          }
        </ul>
      </footer>
      </div>
    </>
  );
}