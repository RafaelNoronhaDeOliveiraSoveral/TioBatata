
export default function NavMinima({ toggleContent , titulo }){
    return(
        <div role="navigation" aria-label="Gallery navigation" className="flex bg-magenta-batatinha justify-around h-16 items-center">
            <div className="flex justify-center items-center">
                <a href="/">
                    <img src="/midias/SVGs/icones/retornar.svg" alt="Return icon" className="h-6 w-auto mr-4"></img>
                </a>
                <h1 className="font-titular text-white text-5xl mt-2">{titulo}</h1>
            </div>
            <div className="flex justify-center">
                <button onClick={() => toggleContent('photos')} aria-label="Display photos">
                    <img src="/midias/SVGs/icones/fotos.svg" alt="Photos icon" className="h-10 w-auto"></img>
                </button>
                <button onClick={() => toggleContent('videos')} aria-label="Display videos">
                    <img src="/midias/SVGs/icones/videos.svg" alt="Videos icon" className="h-10 w-auto pl-4"></img>
                </button>
            </div>
        </div>
    )
}