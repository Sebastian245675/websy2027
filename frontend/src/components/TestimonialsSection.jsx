import React, { useState, useEffect } from 'react';
import { fetchGooglePlacesReviews } from '../services/googleReviewsService';

// Official Google 'G' Multi-color Logo
const GoogleGLogo = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
    <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z" />
  </svg>
);

const StarIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#FBBC04" stroke="#FBBC04">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
);

export const TestimonialsSection = () => {
  const [googleData, setGoogleData] = useState(null);

  const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || 'AIzaSyB2ufd4HRmjazQv3NYWkbOyyFoeD02drdU';
  const placeId = process.env.REACT_APP_GOOGLE_PLACE_ID || 'ChIJ3aORdXanMI4R6jrBFmEaZsM';

  useEffect(() => {
    fetchGooglePlacesReviews(apiKey, placeId).then((result) => {
      if (result) {
        setGoogleData(result);
      }
    });
  }, [apiKey, placeId]);

  const reviews = googleData?.reviews || [];
  const rating = googleData?.rating ? googleData.rating.toFixed(1) : '5.0';
  const totalReviews = googleData?.userRatingsTotal || reviews.length || 1;
  const writeReviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;

  const scrollContainer = (direction) => {
    const container = document.getElementById('google-reviews-scroll-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getInitials = (name) => {
    if (!name) return 'G';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#009688', '#FF5722', '#795548', '#607D8B'];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <section id="testimonios" className="py-10 md:py-14 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* BARRITA SUPERIOR GRIS (#f2f3f5) - UNICAMENTE EL ENCABEZADO */}
        <div className="bg-[#f2f3f5] rounded-2xl p-5 md:p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GoogleGLogo size={26} />
              <span className="font-extrabold text-2xl text-gray-900 tracking-tight">Reseñas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-gray-900">{rating}</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} size={15} />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium ml-1">
                {totalReviews} {totalReviews === 1 ? 'reseña' : 'reseñas'}
              </span>
            </div>
          </div>

          {/* Boton negro Escribe una reseña */}
          <a
            href={writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white hover:bg-gray-800 font-bold text-xs px-6 py-3 rounded-lg transition-all shadow-sm self-stretch sm:self-auto text-center"
          >
            Escribe una reseña
          </a>
        </div>

        {/* CONTENEDOR DE TARJETAS DE COMENTARIOS SOBRE FONDO BLANCO */}
        <div className="relative group">
          
          {/* Flecha Izquierda */}
          <button
            onClick={() => scrollContainer('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all opacity-80 hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft />
          </button>

          {/* Tarjetas deslizables con fondo gris individual (#f1f2f5) */}
          <div
            id="google-reviews-scroll-container"
            className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-1 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="min-w-[260px] sm:min-w-[280px] max-w-[300px] bg-[#f1f2f5] rounded-2xl p-6 flex flex-col items-center text-center shrink-0 hover:bg-[#e9eaee] transition-colors"
              >
                {/* Avatar con insignia de Google */}
                <div className="relative mb-3">
                  {rev.profilePhoto ? (
                    <img
                      src={rev.profilePhoto}
                      alt={rev.name}
                      className="w-14 h-14 rounded-full object-cover shadow-sm border border-white"
                    />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-full text-white font-bold text-lg flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: getAvatarColor(rev.name) }}
                    >
                      {getInitials(rev.name)}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-gray-200">
                    <GoogleGLogo size={14} />
                  </div>
                </div>

                {/* Nombre */}
                <h4 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1 mb-0.5">
                  {rev.name}
                </h4>

                {/* Fecha */}
                <span className="text-[11px] text-gray-400 font-medium mb-3">
                  {rev.relativeTime || 'Google Maps'}
                </span>

                {/* 5 Estrellas */}
                <div className="flex justify-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} size={15} />
                  ))}
                </div>

                {/* Comentario */}
                <p className="text-xs text-gray-600 leading-relaxed italic line-clamp-4 font-normal mb-2">
                  "{rev.text}"
                </p>

                <a
                  href={rev.googleUrl || writeReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-gray-400 font-semibold hover:text-gray-900 transition-colors mt-auto"
                >
                  Leer más
                </a>
              </div>
            ))}
          </div>

          {/* Flecha Derecha */}
          <button
            onClick={() => scrollContainer('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all opacity-80 hover:opacity-100"
            aria-label="Siguiente"
          >
            <ChevronRight />
          </button>
        </div>

      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};