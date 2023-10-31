import React from 'react';

const MenuDesktop = () => {
  const homeUrl = '/';
  const galleryUrl = '/galeria';
  const contactUrl = '/contatos';
  const commonLinkClass = "flex items-center justify-center text-white font-titular text-4xl w-full";
  const commonBorderStyle = "border-r-[1.5px] border-white";
  const expandedVerticalPadding = "py-4"; // Adjust the padding as needed

  return (
    <div className="hidden lg:flex md:flex justify-between items-center ml-20 ">
      <img className="h-16 max-w-full mr-32 lg:mr-96" src="/midias/SVGs/logo.svg" alt="Logo" />
      <a href={homeUrl} className={`bg-magenta-batatinha ${commonBorderStyle} ${commonLinkClass} ${expandedVerticalPadding}`}>
        HOME
      </a>
      <a href={galleryUrl} className={`bg-roxo-batatinha ${commonBorderStyle} ${commonLinkClass} ${expandedVerticalPadding}`}>
        GALERIA
      </a>
      <a href={contactUrl} className={`bg-ciano-batatinha ${commonLinkClass} ${expandedVerticalPadding}`}>
        CONTATO
      </a>
    </div>
  );
};

export default MenuDesktop;
