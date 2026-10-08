import React, { useState } from 'react';
import { openWhatsApp } from '../lib/tracking';

// Ícono oficial de WhatsApp
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size} 
    className={className}
    fill="currentColor"
  >
    <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.953 0-7.51 6.11-13.62 13.62-13.62s13.62 6.11 13.62 13.62-6.11 13.62-13.62 13.62zM21.305 19.26c-0.346-0.174-2.049-1.007-2.366-1.123-0.316-0.117-0.547-0.174-0.776 0.174s-0.892 1.123-1.094 1.347c-0.201 0.23-0.402 0.26-0.748 0.087-0.346-0.174-1.461-0.539-2.785-1.722-1.031-0.922-1.727-2.056-1.929-2.402-0.201-0.346-0.022-0.533 0.152-0.705 0.156-0.156 0.346-0.402 0.518-0.603 0.174-0.201 0.23-0.346 0.346-0.575 0.117-0.23 0.058-0.431-0.028-0.603-0.087-0.174-0.776-1.87-1.063-2.565-0.28-0.672-0.56-0.58-0.776-0.591-0.201-0.010-0.431-0.012-0.662-0.012s-0.603 0.087-0.92 0.431c-0.316 0.346-1.206 1.179-1.206 2.873s1.235 3.333 1.406 3.561c0.174 0.23 2.384 3.764 5.799 5.273 0.811 0.354 1.443 0.566 1.936 0.724 0.814 0.26 1.555 0.224 2.141 0.136 0.653-0.098 2.049-0.835 2.335-1.642 0.288-0.807 0.288-1.501 0.201-1.642-0.086-0.14-0.316-0.23-0.662-0.402z"/>
  </svg>
);

export const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    openWhatsApp('¡Hola! Me interesa conocer más sobre sus servicios. ¿Me pasan más información?', 'boton_flotante');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          flex items-center justify-center gap-3 
          w-14 h-14 md:w-auto md:h-auto md:px-6 md:py-3.5
          bg-[#2ecc71] hover:bg-[#27ae60] 
          text-white font-bold text-sm
          rounded-full transition-all duration-500
          shadow-[0_10px_30px_rgba(46,204,113,0.3)]
          hover:shadow-[0_15px_40px_rgba(46,204,113,0.5)]
          hover:-translate-y-1 group
        `}
        aria-label="Contactar por WhatsApp"
      >
        <div className="flex items-center justify-center transform group-hover:rotate-12 transition-transform shrink-0">
          <WhatsAppIcon size={28} />
        </div>
        <span className="tracking-wide hidden md:inline whitespace-nowrap">Escribinos por WhatsApp</span>
        
        {/* Particle effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-white pointer-events-none" />
        )}
      </button>
    </div>
  );
};