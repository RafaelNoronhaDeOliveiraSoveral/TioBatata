
export default function NavContatos({ titulo }){
    return(
        <div role="navigation" aria-label="Gallery navigation" className="flex bg-roxo-batatinha justify-around h-16 items-center">
            <div className="flex justify-center items-center">
                <a href="/">
                    <img src="/midias/SVGs/icones/retornar.svg" alt="Return icon" className="h-6 w-auto mr-4"></img>
                </a>
                <h1 className="font-titular text-white text-5xl mt-2">{titulo}</h1>
            </div>
        </div>
    )
}