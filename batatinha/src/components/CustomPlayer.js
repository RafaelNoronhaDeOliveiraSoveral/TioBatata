import React, { useRef, useState, useEffect } from "react";

const CustomPlayer = ({ src, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const playVideo = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((currentPlayStatus) => !currentPlayStatus);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    const handleLoadedMetadata = () => {
      setIsLoading(false);
    };

    videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoRef]);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      const updateProgress = () => {
        setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
      };
      updateProgress();
      videoRef.current.addEventListener('timeupdate', updateProgress);
      return () => {
        videoRef.current.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [isPlaying, videoRef]);

  useEffect(() => {
    videoRef.current.load(); // Tell the video to load a new source
    setIsLoading(true); // Set loading to true to show the loading state
    setIsPlaying(false); // Stop playing the video because the source has changed
  }, [src]); // Add the src prop to this useEffect's dependencies 

  return (
    <div className="relative">
      <video
        {...props}
        ref={videoRef}
        className="w-full h-full"
        onCanPlayThrough={() => {
          setIsLoading(false);
        }}
      >
        <source src={src} type="video/mp4"></source>
      </video>

      {isLoading && 
        <div className='absolute left-0 top-0 w-full h-full bg-gray-400'></div>
      }
      
      <div className="absolute left-0 right-0 top-0 w-full h-full" onClick={playVideo}>
        <div className="absolute bottom-0 left-0 right-0 mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 flex justify-center">
          <div className="bg-gray-300 h-2 rounded-full w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto flex items-center overflow-hidden">
            <div className="rounded-full h-2 w-4 bg-white" style={{width: `${progress}%`}}></div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 mb-4 mr-4">
          <button aria-label="button to share">
            <img src="/midias/SVGs/icones/contatos/whats_original.svg" className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32" alt="WhatsApp logo"></img>
          </button>
        </div>

        <div className="flex h-full items-center justify-center"> 
          <button>
          {isLoading ? 
              <img className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32" src="/midias/SVGs/icones/icone_carregamento.svg" alt="Loading icon"></img> : 
              (isPlaying ? "" : <img className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32" src="/midias/SVGs/icones/icone_player.svg" alt="Play button"></img>)
            }
          </button>
        </div>        
      </div>
    </div>
  );
};

export default CustomPlayer;