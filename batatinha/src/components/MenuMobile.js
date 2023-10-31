import React, { useState, useRef, useEffect } from 'react';

const MenuMobile = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const buttonRef = useRef(null);
 
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        if (dropdownOpen) {
            buttonRef.current.focus();
        }
    }, [dropdownOpen]);
    
    return(
        <div role="navigation" aria-label="Mobile Menu" className="lg:hidden md:hidden relative">
            <div className="py-4 bg-slate-100 flex justify-evenly lg:justify-between">
                <img className="h-[16vw] max-w-full lg:ml-20" src="/midias/SVGs/logo.svg" alt="Logo"/>
                <button ref={buttonRef} aria-label="Menu" className="text-white h-[10vw] w-[10vw] bg-magenta-batatinha rounded-lg md:hidden item-center justify-center mt-3" onClick={toggleDropdown}>
                    <svg xmlns="http://www.w3.org/2000/svg" className='m-2' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            {/* Dropdown Links */}
            {dropdownOpen ? (
                <div role="menu" className="z-50 flex grid-cols-3 absolute right-0 w-screen text-center h-20 transition-all transform scale-100 origin-top">
                    <a role="menuitem" href="/" className="flex items-center justify-center text-white bg-magenta-batatinha w-full border-r-[1.5px] border-white font-titular text-4xl">
                      HOME
                    </a>
                    <a role="menuitem" href="/galeria" className="flex items-center justify-center text-white bg-roxo-batatinha w-full border-r-[1.5px] border-white font-titular text-4xl">
                      GALERIA
                    </a>
                    <a role="menuitem" href="/contatos" className="flex items-center justify-center text-white bg-ciano-batatinha w-full font-titular text-4xl">
                      CONTATO
                    </a>
                </div>
            ) : null}
        </div>
    )
}

export default MenuMobile;