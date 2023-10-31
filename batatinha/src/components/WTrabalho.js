import React from 'react';
import CardImagens from './CardImagens';

function WTrabalho({ back, cards, titulo, rec_animado, cor_btn, cor_titulo, redirect }) {
  return (
    <div 
      style={{ backgroundImage: `url(${back})` }}
      className="bg-cover h-screen w-full flex flex-col justify-center items-center "
      role="region"
      aria-label="Work section"
    > 
      
      <div className='absolute mb-24'>
        <img src={rec_animado} className='w-auto' style={{minHeight: '800px'}}/>
      </div>

      <div role="group" aria-label="Image Cards Group" className="mb-12">
        <CardImagens imgs={cards} scale={180}/>
      </div>

      <h1 
        aria-label={titulo.includes('.svg') ? 'title image' : 'title text'} 
        className="mt-4 -rotate-3 text-4xl md:text-6xl lg:text-8xl"
      >
          {titulo.includes('.svg') ? (
              <img src={titulo} alt="title"/>
          ) : (
              <span
                  className='font-titular text-6xl'
                  style={{color: cor_titulo}}
                >{titulo}
              </span>
          )}
      </h1>
      <a href={`/galeria/${redirect}`} className="z-50">
        <button 
          className='py-2 px-6 rounded-full text-white mt-4 text-base md:text-lg lg:text-xl font-medium'
          style={{backgroundColor: cor_btn}}
        >
          + Fotos
        </button>
      </a>
    </div>
  );
}

export default WTrabalho;