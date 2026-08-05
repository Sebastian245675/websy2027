import { useState, useEffect } from 'react';
import { subscribeNews, saveNews, updateNews as updateNewsDoc, deleteNews as deleteNewsDoc } from '../firebase';

const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Crear noticia
  const createNews = async (newsData) => {
    setLoading(true);
    try {
      const id = await saveNews(newsData);
      setError(null);
      return id;
    } catch (err) {
      console.error('Error creando noticia:', err);
      setError('Error al crear la noticia');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar noticia
  const updateNews = async (id, newsData) => {
    setLoading(true);
    try {
      await updateNewsDoc(id, newsData);
      setError(null);
    } catch (err) {
      console.error('Error actualizando noticia:', err);
      setError('Error al actualizar la noticia');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar noticia
  const deleteNews = async (id) => {
    setLoading(true);
    try {
      await deleteNewsDoc(id);
      setError(null);
    } catch (err) {
      console.error('Error eliminando noticia:', err);
      setError('Error al eliminar la noticia');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Suscribirse a cambios en las noticias
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeNews((newsData) => {
      setNews(newsData);
      setLoading(false);
      setError(null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    news,
    loading,
    error,
    createNews,
    updateNews,
    deleteNews
  };
};

export { useNews };