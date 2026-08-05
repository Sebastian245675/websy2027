import { useState, useEffect } from 'react';
import { subscribeCotizaciones, updateCotizacion, deleteCotizacion } from '../firebase';

const useCotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const unsubscribe = subscribeCotizaciones((docs) => {
        setCotizaciones(docs);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error('Error loading cotizaciones:', err);
      setError('Error al cargar las cotizaciones');
      setLoading(false);
    }
  }, []);

  const editarCotizacion = async (id, data) => {
    try {
      await updateCotizacion(id, data);
    } catch (err) {
      console.error('Error updating cotizacion:', err);
      throw err;
    }
  };

  const eliminarCotizacion = async (id) => {
    try {
      await deleteCotizacion(id);
    } catch (err) {
      console.error('Error deleting cotizacion:', err);
      throw err;
    }
  };

  const cambiarEstadoCotizacion = async (id, nuevoEstado) => {
    try {
      await updateCotizacion(id, { status: nuevoEstado });
    } catch (err) {
      console.error('Error changing cotizacion status:', err);
      throw err;
    }
  };

  return {
    cotizaciones,
    loading,
    error,
    editarCotizacion,
    eliminarCotizacion,
    cambiarEstadoCotizacion
  };
};

export default useCotizaciones;
