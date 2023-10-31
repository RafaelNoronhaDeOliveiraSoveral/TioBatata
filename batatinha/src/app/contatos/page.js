import React from "react";
import NavContatos from "@/components/NavContatos";
import SocialMedia from "@/components/SocialMedia";

export default function Contatos() {
  const socialPlatforms = [
    {name: 'whats', link: 'https://wa.me/5541998611991'},
    {name: 'insta', link: 'https://www.instagram.com/obatatacuritiba/'},
    {name: 'tel', link: 'tel:41998611991'},
    {name: 'email', link: '/'}
  ]
  return (
    <>
      <NavContatos titulo="CONTATO"/>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="mb-32 grid grid-cols-2 gap-6">
          {socialPlatforms.map(({ name, link }) => (
            <SocialMedia key={name} plataforma={name} href={link} className='w-32 h-32 lg:w-10 lg:h-10'/>
          ))}
        </div>
      </div>
    </>
  )
}