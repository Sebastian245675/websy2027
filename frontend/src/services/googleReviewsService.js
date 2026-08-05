/**
 * Service to fetch official Google Places Reviews via Google Maps Places API SDK
 */
export const fetchGooglePlacesReviews = (apiKey, placeId) => {
  return new Promise((resolve, reject) => {
    if (!apiKey || !placeId) {
      return resolve({
        configured: false,
        message: 'Falta configurar REACT_APP_GOOGLE_PLACES_API_KEY y REACT_APP_GOOGLE_PLACE_ID en el archivo .env'
      });
    }

    // Function to query Google Places API
    const getDetails = () => {
      try {
        const dummyElem = document.createElement('div');
        const service = new window.google.maps.places.PlacesService(dummyElem);

        service.getDetails(
          {
            placeId: placeId,
            fields: ['name', 'rating', 'reviews', 'user_ratings_total', 'url']
          },
          (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
              const reviews = (place.reviews || []).map((rev, index) => ({
                id: index + 1,
                name: rev.author_name,
                text: rev.text,
                rating: rev.rating,
                relativeTime: rev.relative_time_description,
                profilePhoto: rev.profile_photo_url,
                googleUrl: rev.author_url || place.url || 'https://maps.google.com'
              }));

              resolve({
                configured: true,
                name: place.name,
                rating: place.rating || 5.0,
                userRatingsTotal: place.user_ratings_total || reviews.length,
                placeUrl: place.url || `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${placeId}`,
                reviews: reviews
              });
            } else {
              console.warn('⚠️ Google Places API status error:', status);
              resolve({
                configured: true,
                error: `Error al obtener datos de Google Places API (Estado: ${status})`,
                reviews: []
              });
            }
          }
        );
      } catch (e) {
        console.error('❌ Exception in Google Places API execution:', e);
        resolve({
          configured: true,
          error: e.message,
          reviews: []
        });
      }
    };

    // If Google script is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      return getDetails();
    }

    // Load Google Maps SDK dynamically
    const scriptId = 'google-maps-places-sdk';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => getDetails();
      script.onerror = () => {
        resolve({
          configured: true,
          error: 'Error de red o API Key inválida al cargar el SDK de Google Maps.',
          reviews: []
        });
      };
      document.head.appendChild(script);
    } else {
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkInterval);
          getDetails();
        }
      }, 100);
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve({
          configured: true,
          error: 'Tiempo de espera agotado al conectar con Google Maps.',
          reviews: []
        });
      }, 5000);
    }
  });
};
