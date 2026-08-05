import React, { useState } from 'react';
import useNews from '../hooks/useNews';

const NewsManager = () => {
  const {
    news,
    loading: loadingNews,
    error: errorNews,
    createNews,
    updateNews,
    deleteNews
  } = useNews();

  const [editingNews, setEditingNews] = useState(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    subtitle: '',
    excerpt: '',
    content: '',
    images: [],
    imageInput: '',
    status: 'draft',
    publishAt: '',
    publishImmediately: false,
    sendNotification: false
  });

  // Función para enviar notificación
  const sendNotification = (newsItem) => {
    try {
      const notification = {
        title: newsItem.title,
        excerpt: newsItem.excerpt,
        newsId: newsItem.id,
      };
      try { window.dispatchEvent(new CustomEvent('websy:notification', { detail: notification })); } catch(e){}
    } catch (e) {
      console.error('Error enviando notificación:', e);
    }
  };

  const createOrUpdateNews = async (data) => {
    try {
      // Normalize data
      const normalized = {
        title: data.title,
        subtitle: data.subtitle || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        images: data.images || [],
        status: data.status || 'draft',
        publishAt: data.publishAt || '',
      };

      // If publishImmediately is set, set status published and publishAt to now
      if (data.publishImmediately) {
        normalized.status = 'published';
        normalized.publishAt = new Date().toISOString();
      }

      if (editingNews) {
        await updateNews(editingNews, normalized);
        if (data.sendNotification) {
          sendNotification({ ...normalized, id: editingNews });
        }
        setEditingNews(null);
      } else {
        const id = await createNews(normalized);
        if (data.sendNotification) {
          sendNotification({ ...normalized, id });
        }
      }
      setNewsForm({ 
        title: '', 
        subtitle: '', 
        excerpt: '', 
        content: '', 
        images: [], 
        imageInput: '', 
        status: 'draft', 
        publishAt: '', 
        publishImmediately: false, 
        sendNotification: false 
      });
    } catch (error) {
      console.error('Error al guardar noticia:', error);
      alert('Error al guardar la noticia');
    }
  };

  const handleEditNews = (id) => {
    const n = news.find(x => x.id === id);
    if (!n) return;
    setEditingNews(id);
    setNewsForm({
      title: n.title,
      subtitle: n.subtitle || '',
      excerpt: n.excerpt,
      content: n.content,
      images: n.images || [],
      imageInput: '',
      status: n.status || 'draft',
      publishAt: n.publishAt || '',
      publishImmediately: false,
      sendNotification: false
    });
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')) return;
    try {
      await deleteNews(id);
    } catch (error) {
      console.error('Error al eliminar noticia:', error);
      alert('Error al eliminar la noticia');
    }
  };

  const togglePublish = async (id) => {
    const item = news.find(n => n.id === id);
    if (!item) return;
    try {
      await updateNews(id, {
        ...item,
        status: item.status === 'published' ? 'draft' : 'published',
        publishAt: item.status === 'published' ? item.publishAt : new Date().toISOString()
      });
    } catch (error) {
      console.error('Error al cambiar estado de publicación:', error);
      alert('Error al cambiar el estado de publicación');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Noticias</h2>
        <div className="text-sm text-gray-600">Total: {news.length}</div>
      </div>

      {errorNews && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{errorNews}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Crear / Editar Noticia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input 
              value={newsForm.title} 
              onChange={(e) => setNewsForm({...newsForm, title: e.target.value})} 
              className="w-full mt-1 px-3 py-2 border rounded"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtítulo</label>
            <input 
              value={newsForm.subtitle} 
              onChange={(e) => setNewsForm({...newsForm, subtitle: e.target.value})} 
              className="w-full mt-1 px-3 py-2 border rounded" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Extracto</label>
            <input 
              value={newsForm.excerpt} 
              onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})} 
              className="w-full mt-1 px-3 py-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Contenido</label>
          <textarea 
            value={newsForm.content} 
            onChange={(e) => setNewsForm({...newsForm, content: e.target.value})} 
            rows={6} 
            className="w-full mt-1 px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Agregar imagen (URL)</label>
            <div className="flex space-x-2">
              <input 
                value={newsForm.imageInput} 
                onChange={(e) => setNewsForm({...newsForm, imageInput: e.target.value})} 
                className="w-full mt-1 px-3 py-2 border rounded" 
                placeholder="https://.../imagen.jpg" 
              />
              <button 
                onClick={() => {
                  if (!newsForm.imageInput) return;
                  setNewsForm({...newsForm, images: [newsForm.imageInput, ...newsForm.images], imageInput: ''});
                }} 
                className="ml-2 bg-gray-200 px-3 rounded hover:bg-gray-300"
              >
                Añadir
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {newsForm.images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} alt="preview" className="w-24 h-16 object-cover rounded border" />
                  <button 
                    onClick={() => setNewsForm({...newsForm, images: newsForm.images.filter((_, idx) => idx !== i)})} 
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de publicación</label>
            <input 
              type="datetime-local" 
              value={newsForm.publishAt} 
              onChange={(e) => setNewsForm({...newsForm, publishAt: e.target.value})} 
              className="w-full mt-1 px-3 py-2 border rounded" 
            />
            <label className="flex items-center mt-2 text-sm">
              <input 
                type="checkbox" 
                checked={newsForm.publishImmediately} 
                onChange={(e) => setNewsForm({...newsForm, publishImmediately: e.target.checked})} 
                className="mr-2" 
              /> 
              Publicar inmediatamente
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select 
              value={newsForm.status} 
              onChange={(e) => setNewsForm({...newsForm, status: e.target.value})} 
              className="w-full mt-1 px-3 py-2 border rounded"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
            <label className="flex items-center mt-2 text-sm">
              <input 
                type="checkbox" 
                checked={newsForm.sendNotification} 
                onChange={(e) => setNewsForm({...newsForm, sendNotification: e.target.checked})} 
                className="mr-2" 
              /> 
              Enviar notificación a suscriptores
            </label>
            <div className="flex items-end">
              <button 
                onClick={() => createOrUpdateNews(newsForm)} 
                className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={!newsForm.title || !newsForm.excerpt || !newsForm.content}
              >
                {editingNews ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Noticias</h3>
        </div>
        {loadingNews ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Cargando noticias...</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {news.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No hay noticias aún</div>
            ) : (
              news.map((item) => (
                <div key={item.id} className="p-6 flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title} 
                      <span className={`text-xs ml-2 px-2 py-1 rounded-full ${
                        item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status === 'published' ? 'Publicado' : 'Borrador'}
                      </span>
                    </h4>
                    {item.subtitle && <p className="text-sm text-gray-700">{item.subtitle}</p>}
                    <p className="text-sm text-gray-600">{item.excerpt}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Creada: {item.createdAt?.toDate?.()?.toLocaleString() || new Date(item.createdAt).toLocaleString()}
                      {item.publishAt ? ` • Publica: ${new Date(item.publishAt).toLocaleString()}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => togglePublish(item.id)} 
                      className={`px-3 py-1 rounded text-sm ${
                        item.status === 'published' 
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {item.status === 'published' ? 'Despublicar' : 'Publicar'}
                    </button>
                    <button 
                      onClick={() => handleEditNews(item.id)} 
                      className="px-3 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDeleteNews(item.id)} 
                      className="px-3 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsManager;