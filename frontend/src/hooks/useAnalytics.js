import { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp, where, getDocs } from 'firebase/firestore';

const useAnalytics = () => {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageViews, setPageViews] = useState({});
  const [stats, setStats] = useState({
    visitasHoy: 0,
    paginasVistas: 0,
    tasaRebote: 0,
    visitasTotales: 0
  });

  useEffect(() => {
    try {
      const db = getFirestore();
      const visitasRef = collection(db, 'analytics');
      const q = query(visitasRef, orderBy('fecha', 'desc'), limit(100));

      const unsubscribe = onSnapshot(
        q,
        async (snapshot) => {
          const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setVisitas(docs);
          
          // Calcular vistas por página
          const viewsByPage = {};
          docs.forEach(v => {
            const page = v.pagina || '/';
            viewsByPage[page] = (viewsByPage[page] || 0) + 1;
          });
          setPageViews(viewsByPage);
          
          // Calcular estadísticas
          if (docs.length > 0) {
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            
            const visitasHoy = docs.filter(v => {
              if (!v.fecha?.toDate) return false;
              const fechaVisita = v.fecha.toDate();
              fechaVisita.setHours(0, 0, 0, 0);
              return fechaVisita.getTime() === hoy.getTime();
            });
            
            const totalPaginasVistas = docs.reduce((sum, v) => sum + (v.paginasVistas || 1), 0);
            const visitasConRebote = docs.filter(v => v.tasaRebote > 0).length;
            const avgBounceRate = docs.length > 0 ? (visitasConRebote / docs.length) * 100 : 0;
            
            setStats({
              visitasHoy: visitasHoy.length,
              paginasVistas: totalPaginasVistas,
              tasaRebote: Math.round(avgBounceRate),
              visitasTotales: docs.length
            });
          }
          
          setLoading(false);
        },
        (err) => {
          console.error('Error loading analytics:', err);
          setError('Error al cargar analytics');
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up analytics:', err);
      setError('Error al configurar analytics');
      setLoading(false);
    }
  }, []);

  const registrarVisita = async (pagina, duracion = 0) => {
    try {
      const db = getFirestore();
      const visitasRef = collection(db, 'analytics');
      
      // Get country information using ipdata.co
      let countryInfo = { country_code: 'Desconocido', country_name: 'Desconocido' };
      try {
        // Usa tu API key de ipdata.co - regístrate en https://ipdata.co/sign-up.html
        const API_KEY = 'YOUR_IPDATA_API_KEY'; // Reemplaza con tu API key
        const response = await fetch(`https://api.ipdata.co?api-key=${API_KEY}`);
        
        if (response.ok) {
          const data = await response.json();
          countryInfo = {
            country_code: data.country_code,
            country_name: data.country_name
          };
        } else {
          // Fallback a geoapify si ipdata falla
          const GEOAPIFY_API_KEY = 'YOUR_GEOAPIFY_API_KEY'; // Reemplaza con tu API key
          const geoResponse = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${GEOAPIFY_API_KEY}`);
          
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            countryInfo = {
              country_code: geoData.country.iso_code,
              country_name: geoData.country.name
            };
          }
        }
      } catch (error) {
        console.error('Error getting country info:', error);
      }

      await addDoc(visitasRef, {
        fecha: serverTimestamp(),
        pagina: pagina || window.location.pathname,
        duracion: duracion,
        paginasVistas: 1,
        tasaRebote: duracion < 5 ? 100 : 0,
        userAgent: navigator.userAgent,
        idioma: navigator.language,
        pantalla: `${window.screen.width}x${window.screen.height}`,
        referrer: document.referrer || 'directo',
        pais: countryInfo.country_name,
        codigoPais: countryInfo.country_code,
        fechaRegistro: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error registering visit:', err);
    }
  };

  const getPageStats = () => {
    return Object.entries(pageViews).map(([page, views]) => ({
      page: page === '/' ? 'Inicio' : page.replace('/', '').charAt(0).toUpperCase() + page.slice(2),
      views,
      percentage: ((views / stats.visitasTotales) * 100).toFixed(1)
    })).sort((a, b) => b.views - a.views);
  };

  return {
    visitas,
    stats,
    pageViews,
    loading,
    error,
    registrarVisita,
    getPageStats
  };
};

export default useAnalytics;
