import React, { useRef, useState, useEffect } from "react";
import { useSwipeable } from 'react-swipeable';

const ShortsPlayer = ({ src, onSwipe, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [swipeStatus, setSwipeStatus] = useState("idle");
    const videoRef = useRef(null);
    const IconSize = "h-[10vw] sm:h-[8vw] md:h-[6vw] lg:h-[4vw] xl:h-[3vw] 2xl:h-[2vw] w-[10vw] sm:w-[8vw] md:w-[6vw] lg:w-[4vw] xl:w-[3vw] 2xl:w-[2vw]";
  
    const playVideo = () => {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
  
      setIsPlaying((currentPlayStatus) => !currentPlayStatus);
    };
  
    useEffect(() => {
      if (videoRef.current && isLoading) {
        videoRef.current.onloadedmetadata = () => {
          setIsLoading(false);
        };
      }
    }, [isLoading, videoRef]);
  
    useEffect(() => {
      if (isPlaying) {
        if (isLoading) {
          setIsLoading(false);
        }
  
        const updateProgress = () => {
          setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
        };
  
        updateProgress();
  
        videoRef.current.addEventListener("timeupdate", updateProgress);
  
        return () => {
          videoRef.current.removeEventListener("timeupdate", updateProgress);
        };
      }
    }, [isPlaying, isLoading, videoRef]);

    useEffect(() => {
        videoRef.current.load(); // Tell the video to load a new source
        setIsLoading(true); // Set loading to true to show the loading state
        setIsPlaying(false); // Stop playing the video because the source has changed
    }, [src]); // Add the src prop to this useEffect's dependencies
  
    const swipableHandlers = useSwipeable({
      onSwipedUp: () => onSwipe('up'),
      onSwipedDown: () => onSwipe('down'),
    });

    const handleUpClick = () => {
      onSwipe('up');
    }

    const handleDownClick = () => {
        onSwipe('down');
    }

  return (
    <div className="relative" {...swipableHandlers}>

      <button 
          className="z-50 absolute left-4 top-1/2 transform -translate-y-1/2 lg:block hidden bg-magenta-batatinha rounded-full" 
          onClick={handleUpClick}
          aria-label="Swipe up"
      >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 16l-6-6h12z"/>
          </svg>
      </button>

      <button 
          className="z-50 absolute right-4 top-1/2 transform -translate-y-1/2 lg:block hidden bg-magenta-batatinha rounded-full" 
          onClick={handleDownClick}
          aria-label="Swipe down"
      >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 8l-6 6h12z"/>
          </svg>
      </button>

      <video
        {...props}
        ref={videoRef}
        className="w-full h-full rounded-2xl"
        onCanPlayThrough={() => {
          setIsLoading(false);
        }}
      >
        <source src={src} type="video/mp4"></source>
      </video>

      {isLoading && 
        <div className='absolute left-0 top-0 w-full h-full bg-gray-400 rounded-2xl'></div>
      }

      <div></div>
      
      <div className="absolute left-0 right-0 top-0 w-full h-full" onClick={playVideo}>
        <div className="absolute bottom-0 left-0 right-0 mb-[32vw] flex justify-center">
          <div className="bg-gray-300 h-2.5 rounded-full w-[65%] mx-auto flex items-center overflow-hidden">
            <div className="rounded-full h-2.5 w-4 bg-white" style={{width: `${progress}%`}}></div>
          </div>
        </div>

        <div className="flex h-full items-center justify-center"> 
          <button>
            {isLoading ? 
              <img className={IconSize} src="/midias/SVGs/icones/icone_carregamento.svg"></img> : 
              (isPlaying ? "" : <img className={IconSize} src="/midias/SVGs/icones/icone_player.svg"></img>)
            }
          </button>
        </div>        
      </div>
    </div>
  );
};

export default ShortsPlayer;
