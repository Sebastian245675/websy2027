import React, { useEffect, useState, useRef } from 'react';
import { portfolio as defaultPortfolio } from '../mockData';
import { Link, useNavigate } from 'react-router-dom';
import { LazyImage } from './LazyImage';
import { caseForPortfolio } from '../caseStudies';

export const PortfolioSection = () => {
  const [projects, setProjects] = useState(() => defaultPortfolio.filter((p) => p.image));
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);
  const navigate = useNavigate();

  // Sync with local storage
  useEffect(() => {
    try {
      const rawPortfolio = localStorage.getItem('websy_portfolio');
      if (rawPortfolio) {
        const parsed = JSON.parse(rawPortfolio);
        if (Array.isArray(parsed) && parsed.length > 0) setProjects(parsed.filter((p) => p.image));
      }
    } catch (e) {
      console.error('Error reading data from localStorage', e);
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragMoved(false);
    setStartX(e.pageX - (scrollRef.current ? scrollRef.current.offsetLeft : 0));
    setScrollLeft(scrollRef.current ? scrollRef.current.scrollLeft : 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragMoved(true);
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Con página de caso se abre el caso (enlace interno); si no, el sitio del cliente
  const handleCardClick = (project) => {
    if (dragMoved) return;
    const study = caseForPortfolio(project.id);
    if (study) navigate(`/casos-de-exito/${study.slug}`);
    else if (project.url) window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  const nextSlide = () => {
    if (scrollRef.current) {
      const scrollAmount = Math.min(scrollRef.current.offsetWidth * 0.4, 500);
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="pt-0 lg:pt-4 pb-2 bg-[#eeeeef] relative overflow-hidden select-none">

      {/* 1. Header always aligned with the standard site container - ULTRA COMPACT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 md:mb-12">
        <span className="text-[#182A2C] font-black tracking-[0.25em] uppercase text-[10px] mb-6 inline-block bg-[#d9fb06] px-2 py-1 animate-fade-in-up">
          PROYECTOS
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-[#182A2C] leading-[1.2] mb-8 tracking-tighter max-w-4xl mx-auto">
          ¿Cómo es trabajar con{' '}
          <span className="inline-block text-[#182A2C] bg-[#d9fb06] px-3 py-1 mt-2 leading-none">Websy?</span>
        </h2>
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">
            Trabajar con nosotros significa contar con un equipo que combina estrategia, creatividad y tecnología para llevar tu negocio al próximo nivel.
          </p>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Creemos que los resultados hablan por sí solos, por eso compartimos nuestros proyectos reales, donde cada cliente confió en nosotros para escalar su marca.
          </p>
        </div>
      </div>

      {/* 2. THE RIGID WALL WRAPPER: Matches 7xl container start but allows right bleed */}
      <div className="w-full relative">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex overflow-x-auto cursor-grab active:cursor-grabbing no-scrollbar hide-scrollbar scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            // This is the CRITICAL start point distanced from the left
            paddingLeft: 'min(15.5vw, max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem)))'
          }}
        >
          <div className="flex gap-10 md:gap-14 py-4 pr-[25vw]">
            {projects.map((project, idx) => (
              <div
                key={`${project.id}-${idx}`}
                className="flex-shrink-0 w-[85vw] sm:w-[500px] lg:w-[460px] flex flex-col group"
                onClick={() => handleCardClick(project)}
              >
                <div className="bg-white rounded-none overflow-hidden aspect-video relative transition-all duration-700 group-hover:shadow-[0_45px_100px_rgba(0,0,0,0.15)]">
                  <LazyImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                    style={{ objectPosition: 'center top' }}
                  />
                  <div className="absolute inset-0 bg-[#182A2C]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                <div className="flex flex-col items-start pt-6 pb-2 pr-4">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 leading-tight block">
                    {project.category}
                  </span>
                  <h3 className="text-3xl md:text-3xl font-extrabold text-[#182A2C] transition-all duration-300 leading-tight mb-2 tracking-tight group-hover:text-[#d9fb06]">
                    {caseForPortfolio(project.id) ? (
                      <Link to={`/casos-de-exito/${caseForPortfolio(project.id).slug}`} onClick={(e) => e.preventDefault()} draggable={false}>
                        {project.title}
                      </Link>
                    ) : project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 text-center md:text-left">
        <Link to="/casos-de-exito" className="text-base font-bold text-[#182A2C] underline decoration-[#d9fb06] decoration-4 underline-offset-4">
          Ver los {defaultPortfolio.length} proyectos con su caso completo
        </Link>
      </div>

      {/* 3. Navigation Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-2">
          <div className="flex items-center gap-2 mb-14 md:mb-0">
            <div className="h-2 w-2 bg-[#d9fb06] rounded-full"></div>
            <div className="h-1 w-20 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#182A2C] w-1/3"></div>
            </div>
          </div>
          <div className="md:pr-[15%] flex justify-center">
            <button
              onClick={nextSlide}
              className="w-16 h-16 rounded-full border border-gray-100 bg-white flex items-center justify-center text-[#182A2C] hover:border-[#d9fb06] hover:bg-[#d9fb06] hover:shadow-2xl transition-all duration-700 group shadow-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
};