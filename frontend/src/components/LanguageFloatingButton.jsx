import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { ChevronDown } from 'lucide-react';

export const LanguageFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: 'es', name: 'Español (Latinoamérica)', flagImg: 'https://flagcdn.com/w40/mx.png' },
    { code: 'en', name: 'English', flagImg: 'https://flagcdn.com/w40/us.png' }
  ];

  const currentLangObj = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      <div className="relative">
        {/* Toggle Button - Small, square/sharp on mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center gap-2 
            w-14 h-10 md:w-auto md:h-auto md:px-4 md:py-2.5 
            bg-white border border-gray-200 rounded-none shadow-xl 
            hover:bg-gray-50 transition-all duration-300 font-black group"
          aria-label="Idioma"
        >
          <img
            src={currentLangObj.flagImg}
            alt=""
            className="w-5 h-3 object-cover rounded-none hidden md:inline shrink-0"
          />
          <span className="text-[10px] md:text-sm text-[#182A2C] uppercase tracking-tighter md:tracking-widest">{currentLanguage}</span>
          <ChevronDown size={14} className={`transition-transform duration-300 text-gray-400 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu - Sharp corners */}
        {isOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-none shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden animate-slide-up">
            <div className="p-1 space-y-0.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-[11px] md:text-xs font-bold transition-all rounded-none ${
                    currentLanguage === lang.code 
                    ? 'bg-gray-100 text-[#182A2C]' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-[#182A2C]'
                  }`}
                >
                  <img src={lang.flagImg} alt="" className="w-4 h-2.5 object-cover rounded-none hidden sm:inline" />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};
