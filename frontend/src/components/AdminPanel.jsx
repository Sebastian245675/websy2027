import React, { useState, useEffect } from 'react';
import {
  X,
  Home,
  Users,
  FileText,
  Settings,
  BarChart3,
  LogOut,
  Edit,
  Trash2,
  Plus,
  Eye,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Check,
  X as XIcon
} from 'lucide-react';
import useComentarios from '../hooks/useComentarios';
import useCotizaciones from '../hooks/useCotizaciones';
import useAnalytics from '../hooks/useAnalytics';
import { useNews } from '../hooks/useNews';

const AdminPanel = ({ onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingComment, setEditingComment] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', comment: '' });
  const [editingQuote, setEditingQuote] = useState(null);
  const [editQuoteForm, setEditQuoteForm] = useState({});
  const [editingNews, setEditingNews] = useState(null);
  const {
    news,
    loading: loadingNews,
    error: errorNews,
    createNews,
    updateNews,
    deleteNews
  } = useNews();
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
      // Disparar evento de notificación
      try { window.dispatchEvent(new CustomEvent('websy:notification', { detail: notification })); } catch(e){}
    } catch (e) {
      console.error('Error enviando notificación:', e);
    }
  };

  const createOrUpdateNews = async (data) => {
    try {
      // Normalize data: images from form
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
      setNewsForm({ title: '', subtitle: '', excerpt: '', content: '', images: [], imageInput: '', status: 'draft', publishAt: '', publishImmediately: false, sendNotification: false });
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


  const {
    comentarios,
    loading: loadingComentarios,
    error: errorComentarios,
    editarComentario,
    eliminarComentario,
    cambiarEstadoComentario
  } = useComentarios();

  const {
    cotizaciones,
    loading: loadingCotizaciones,
    error: errorCotizaciones,
    editarCotizacion,
    eliminarCotizacion,
    cambiarEstadoCotizacion
  } = useCotizaciones();

  const {
    visitas,
    stats: analyticsStats,
    loading: loadingAnalytics,
    error: errorAnalytics
  } = useAnalytics();

  const stats = {
    visitors: analyticsStats.visitasTotales || 0,
    pages: analyticsStats.paginasVistas || 0,
    users: comentarios.length + cotizaciones.length,
    revenue: cotizaciones.reduce((sum, q) => sum + (parseFloat(q.budget) || 0), 0)
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'visits', label: 'Visitas', icon: TrendingUp },
    { id: 'comments', label: 'Comentarios', icon: MessageSquare },
    { id: 'quotes', label: 'Cotizaciones', icon: DollarSign },
    { id: 'news', label: 'Noticias', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', icon: Plus },
    { id: 'pages', label: 'Páginas', icon: FileText },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  // Portfolio (localStorage-backed) ---------------------------------------------
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
    category: '',
    technologies: '', // comma separated
    client: '',
    year: new Date().getFullYear(),
    status: 'published'
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem('websy_portfolio');
      if (raw) setPortfolioItems(JSON.parse(raw));
    } catch (e) { console.error('Error reading portfolio from localStorage', e); }
  }, []);

  const persistPortfolio = (next) => {
    setPortfolioItems(next);
    try { localStorage.setItem('websy_portfolio', JSON.stringify(next)); } catch (e) { console.error('Error saving portfolio', e); }
  };

  const createOrUpdateProject = (data) => {
    const normalized = {
      title: data.title,
      description: data.description,
      image: data.image,
      url: data.url,
      category: data.category,
      technologies: data.technologies ? data.technologies.split(',').map(t => t.trim()).filter(Boolean) : [],
      client: data.client,
      year: data.year,
      status: data.status || 'published'
    };
    if (editingProject) {
      const next = portfolioItems.map(p => p.id === editingProject ? { ...p, ...normalized, updatedAt: new Date().toISOString() } : p);
      persistPortfolio(next);
      setEditingProject(null);
    } else {
      const item = { ...normalized, id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      persistPortfolio([item, ...portfolioItems]);
    }
    setProjectForm({ title: '', description: '', image: '', url: '', category: '', technologies: '', client: '', year: new Date().getFullYear(), status: 'published' });
  };

  const handleEditProject = (id) => {
    const p = portfolioItems.find(x => x.id === id);
    if (!p) return;
    setEditingProject(id);
    setProjectForm({
      title: p.title || '',
      description: p.description || '',
      image: p.image || '',
      url: p.url || '',
      category: p.category || '',
      technologies: (p.technologies || []).join(', '),
      client: p.client || '',
      year: p.year || new Date().getFullYear(),
      status: p.status || 'published'
    });
  };

  const handleDeleteProject = (id) => {
    if (!window.confirm('Eliminar proyecto del portfolio?')) return;
    persistPortfolio(portfolioItems.filter(p => p.id !== id));
  };

  const moveProject = (id, dir) => {
    const idx = portfolioItems.findIndex(p => p.id === id);
    if (idx === -1) return;
    const next = [...portfolioItems];
    const swap = dir === 'up' ? idx - 1 : idx + 1;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    persistPortfolio(next);
  };


  const renderDashboard = () => {
    const pageStats = visitas.reduce((acc, v) => {
      const page = v.pagina || '/';
      const pageName = page === '/' ? 'Inicio' : 
                       page === '/#servicios' ? 'Servicios' :
                       page === '/#portfolio' ? 'Portfolio' :
                       page === '/#nosotros' ? 'Nosotros' :
                       page === '/#contacto' ? 'Contacto' :
                       page.replace('/', '').charAt(0).toUpperCase() + page.slice(2);
      
      if (!acc[pageName]) {
        acc[pageName] = { name: pageName, views: 0 };
      }
      acc[pageName].views += 1;
      return acc;
    }, {});

    const topPages = Object.values(pageStats).sort((a, b) => b.views - a.views).slice(0, 5);

    // Calcular tendencias
    const hoy = new Date();
    const ayer = new Date(hoy);
    ayer.setDate(ayer.getDate() - 1);
    
    const visitasHoy = visitas.filter(v => {
      if (!v.fecha?.toDate) return false;
      const fecha = v.fecha.toDate();
      return fecha.toDateString() === hoy.toDateString();
    }).length;

    const visitasAyer = visitas.filter(v => {
      if (!v.fecha?.toDate) return false;
      const fecha = v.fecha.toDate();
      return fecha.toDateString() === ayer.toDateString();
    }).length;

    const tendenciaVisitas = visitasAyer > 0 ? ((visitasHoy - visitasAyer) / visitasAyer * 100).toFixed(1) : 0;
    const tendenciaCotizaciones = ((cotizaciones.filter(c => c.status === 'pendiente').length / (cotizaciones.length || 1)) * 100).toFixed(1);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <div className="text-sm text-gray-500">
            Última actualización: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Stats Cards con tendencias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Visitantes Totales</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analyticsStats.visitasTotales}</p>
                <p className={`text-sm mt-2 flex items-center ${tendenciaVisitas >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp size={16} className="mr-1" />
                  {tendenciaVisitas >= 0 ? '+' : ''}{tendenciaVisitas}% vs ayer
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Eye className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Páginas Vistas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analyticsStats.paginasVistas}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Promedio: {(analyticsStats.paginasVistas / (analyticsStats.visitasTotales || 1)).toFixed(1)} por visita
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="text-green-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cotizaciones</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{cotizaciones.length}</p>
                <p className="text-sm text-yellow-600 mt-2">
                  {cotizaciones.filter(c => c.status === 'pendiente' || !c.status).length} pendientes
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="text-purple-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${stats.revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {cotizaciones.filter(c => c.status === 'completada').length} completadas
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <BarChart3 className="text-yellow-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Métricas adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tasa de Rebote</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={analyticsStats.tasaRebote > 50 ? '#ef4444' : '#10b981'}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(analyticsStats.tasaRebote / 100) * 352} 352`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{analyticsStats.tasaRebote}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comentarios</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Aprobados</span>
                <span className="font-semibold text-green-600">{comentarios.filter(c => c.status === 'aprobado').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pendientes</span>
                <span className="font-semibold text-yellow-600">{comentarios.filter(c => c.status === 'pendiente').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rechazados</span>
                <span className="font-semibold text-red-600">{comentarios.filter(c => c.status === 'rechazado').length}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-sm font-medium text-gray-900">Total</span>
                <span className="font-bold text-gray-900">{comentarios.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estados de Cotizaciones</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pendientes</span>
                <span className="font-semibold text-yellow-600">{cotizaciones.filter(c => c.status === 'pendiente' || !c.status).length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">En Progreso</span>
                <span className="font-semibold text-blue-600">{cotizaciones.filter(c => c.status === 'en_progreso').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Aprobadas</span>
                <span className="font-semibold text-green-600">{cotizaciones.filter(c => c.status === 'aprobada').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completadas</span>
                <span className="font-semibold text-purple-600">{cotizaciones.filter(c => c.status === 'completada').length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Páginas con vistas reales */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Páginas Más Visitadas</h3>
          </div>
          <div className="p-6">
            {topPages.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No hay datos de visitas aún</p>
            ) : (
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-400' :
                        'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{page.name}</h4>
                        <p className="text-sm text-gray-600">{page.views} visitas</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-48 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(page.views / topPages[0].views) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 min-w-[60px] text-right">
                        {((page.views / analyticsStats.visitasTotales) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[...comentarios.slice(0, 3), ...cotizaciones.slice(0, 2)]
                .sort((a, b) => {
                  const dateA = a.createdAt?.toDate?.() || new Date(0);
                  const dateB = b.createdAt?.toDate?.() || new Date(0);
                  return dateB - dateA;
                })
                .slice(0, 5)
                .map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`p-2 rounded-full ${item.projectType ? 'bg-purple-100' : 'bg-blue-100'}`}>
                      {item.projectType ? <DollarSign className="text-purple-600" size={20} /> : <MessageSquare className="text-blue-600" size={20} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.projectType ? 'Nueva cotización' : 'Nuevo comentario'} de {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.createdAt?.toDate?.()?.toLocaleString() || 'Fecha no disponible'}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'aprobado' ? 'bg-green-100 text-green-800' :
                      item.status === 'pendiente' || !item.status ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status || 'pendiente'}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVisits = () => {
    const visitasFormateadas = visitas.map(v => ({
      fecha: v.fecha?.toDate?.()?.toLocaleDateString() || 'N/A',
      visitantes: 1, // Cada documento es una visita
      paginasVistas: v.paginasVistas || 1,
      tasaRebote: v.tasaRebote || 0,
      pagina: v.pagina || 'N/A',
      pais: v.pais || 'Desconocido'
    }));

    // Calcular estadísticas por país
    const estatsPorPais = visitas.reduce((acc, v) => {
      const pais = v.pais || 'Desconocido';
      if (!acc[pais]) {
        acc[pais] = { total: 0, paginasVistas: 0 };
      }
      acc[pais].total++;
      acc[pais].paginasVistas += (v.paginasVistas || 1);
      return acc;
    }, {});

    const paisesOrdenados = Object.entries(estatsPorPais)
      .sort(([,a], [,b]) => b.total - a.total);

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Análisis de Visitas</h2>

        {errorAnalytics && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{errorAnalytics}</p>
          </div>
        )}

        {/* Estadísticas principales */}
        {/* Resumen por país */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Visitas por País</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paisesOrdenados.map(([pais, stats]) => (
                <div key={pais} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{pais}</span>
                    <span className="text-blue-600 font-bold">{stats.total}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {(stats.paginasVistas / stats.total).toFixed(1)} páginas/visita
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Visitantes Hoy</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsStats.visitasHoy}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Páginas Vistas</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsStats.paginasVistas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="text-orange-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tasa Rebote</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsStats.tasaRebote}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de visitas */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Visitas Recientes</h3>
          </div>
          {loadingAnalytics ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Cargando visitas...</p>
            </div>
          ) : visitasFormateadas.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No hay visitas registradas aún
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Página</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Páginas Vistas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasa Rebote</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {visitasFormateadas.slice(0, 10).map((visit, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.fecha}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.pais}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.pagina}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.paginasVistas}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.tasaRebote}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderUsers = () => {
    // Consolidar todos los usuarios únicos de comentarios y cotizaciones
    const allUsers = new Map();

    // Agregar usuarios de comentarios
    comentarios.forEach(c => {
      const key = c.email?.toLowerCase() || c.name?.toLowerCase();
      if (key && !allUsers.has(key)) {
        allUsers.set(key, {
          name: c.name || 'Sin nombre',
          email: c.email || 'Sin email',
          phone: c.phone || 'N/A',
          company: c.company || 'N/A',
          source: 'comentario',
          status: c.status || 'pendiente',
          date: c.createdAt?.toDate?.() || new Date(),
          comment: c.comment,
          id: c.id
        });
      }
    });

    // Agregar usuarios de cotizaciones
    cotizaciones.forEach(q => {
      const key = q.email?.toLowerCase() || q.name?.toLowerCase();
      if (key) {
        if (allUsers.has(key)) {
          // Usuario ya existe, actualizar información
          const existing = allUsers.get(key);
          existing.source = 'ambos';
          existing.company = q.company || existing.company;
          existing.phone = q.phone || existing.phone;
          existing.projectType = q.projectType;
          existing.budget = q.budget;
        } else {
          allUsers.set(key, {
            name: q.name || 'Sin nombre',
            email: q.email || 'Sin email',
            phone: q.phone || 'N/A',
            company: q.company || 'N/A',
            source: 'cotización',
            status: q.status || 'pendiente',
            date: q.createdAt?.toDate?.() || new Date(),
            projectType: q.projectType,
            budget: q.budget,
            id: q.id
          });
        }
      }
    });

    const users = Array.from(allUsers.values()).sort((a, b) => b.date - a.date);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
          <div className="text-sm text-gray-600">
            Total: {users.length} usuarios
          </div>
        </div>

        {/* Estadísticas de usuarios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Solo Comentarios</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {users.filter(u => u.source === 'comentario').length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <MessageSquare className="text-purple-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Con Cotizaciones</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {users.filter(u => u.source === 'cotización' || u.source === 'ambos').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="text-green-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Lista de usuarios */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Lista de Usuarios</h3>
          </div>
          {users.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No hay usuarios registrados aún
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origen</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.company}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.source === 'comentario' ? 'bg-purple-100 text-purple-800' :
                          user.source === 'cotización' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {user.source}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.status === 'aprobado' || user.status === 'completada' ? 'bg-green-100 text-green-800' :
                          user.status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                          user.status === 'en_progreso' || user.status === 'aprobada' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.date.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex flex-col space-y-1">
                          {user.projectType && (
                            <span className="text-xs text-gray-600">Tipo: {user.projectType}</span>
                          )}
                          {user.budget && (
                            <span className="text-xs text-green-600 font-semibold">
                              Presupuesto: ${parseFloat(user.budget).toLocaleString()}
                            </span>
                          )}
                          {user.comment && (
                            <span className="text-xs text-gray-500 truncate max-w-xs">
                              {user.comment.substring(0, 50)}...
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderComments = () => {
    const handleEditComment = (comment) => {
      console.log('Editando comentario:', comment); // Debug
      setEditingComment(comment.id);
      setEditForm({
        name: comment.name || '',
        email: comment.email || '',
        comment: comment.comment || ''
      });
    };

    const handleSaveEdit = async () => {
      try {
        await editarComentario(editingComment, editForm);
        console.log('Comentario editado exitosamente');
        setEditingComment(null);
        setEditForm({ name: '', email: '', comment: '' });
      } catch (error) {
        console.error('Error al guardar comentario:', error);
        alert('Error al guardar el comentario');
      }
    };

    const handleCancelEdit = () => {
      setEditingComment(null);
      setEditForm({ name: '', email: '', comment: '' });
    };

    const handleDeleteComment = async (id) => {
      if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
        try {
          await eliminarComentario(id);
          console.log('Comentario eliminado exitosamente');
        } catch (error) {
          console.error('Error al eliminar comentario:', error);
          alert('Error al eliminar el comentario');
        }
      }
    };

    const handleStatusChange = async (id, newStatus) => {
      try {
        await cambiarEstadoComentario(id, newStatus);
        console.log('Estado de comentario cambiado exitosamente');
      } catch (error) {
        console.error('Error al cambiar estado:', error);
        alert('Error al cambiar el estado');
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Comentarios</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => comentarios.filter(c => c.status === 'pendiente').forEach(c => handleStatusChange(c.id, 'aprobado'))}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              disabled={comentarios.filter(c => c.status === 'pendiente').length === 0}
            >
              Aprobar Todos Pendientes
            </button>
          </div>
        </div>

        {errorComentarios && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{errorComentarios}</p>
          </div>
        )}

        {/* Estadísticas de comentarios */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-2xl font-bold text-green-600">
              {comentarios.filter(c => c.status === 'aprobado').length}
            </p>
            <p className="text-sm text-gray-600">Aprobados</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {comentarios.filter(c => c.status === 'pendiente').length}
            </p>
            <p className="text-sm text-gray-600">Pendientes</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-2xl font-bold text-red-600">
              {comentarios.filter(c => c.status === 'rechazado').length}
            </p>
            <p className="text-sm text-gray-600">Rechazados</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-2xl font-bold text-blue-600">{comentarios.length}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
        </div>

        {/* Lista de comentarios */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Comentarios Recientes</h3>
          </div>

          {loadingComentarios ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Cargando comentarios...</p>
            </div>
          ) : comentarios.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No hay comentarios aún
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {comentarios.map(comment => (
                <div key={comment.id} className="p-6">
                  {editingComment === comment.id ? (
                    <div className="space-y-4 border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                      <div className="flex items-center mb-4">
                        <Edit className="text-blue-600 mr-2" size={20} />
                        <h3 className="text-lg font-medium text-blue-900">Editando Comentario</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                            placeholder="Nombre del usuario"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                            placeholder="correo@ejemplo.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Comentario</label>
                        <textarea
                          value={editForm.comment}
                          onChange={(e) => setEditForm({...editForm, comment: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                          rows="4"
                          placeholder="Contenido del comentario"
                        />
                      </div>
                      <div className="flex space-x-3 pt-4">
                        <button
                          onClick={handleSaveEdit}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                        >
                          <Check size={18} className="mr-2" />
                          Guardar Cambios
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                        >
                          <XIcon size={18} className="mr-2" />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{comment.name}</h4>
                          <p className="text-sm text-gray-600">{comment.email}</p>
                          <p className="text-sm text-gray-500">
                            Página: {comment.page || 'General'} • {comment.createdAt?.toDate?.()?.toLocaleDateString() || 'Fecha no disponible'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            comment.status === 'aprobado' ? 'bg-green-100 text-green-800' :
                            comment.status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {comment.status}
                          </span>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleEditComment(comment)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{comment.comment}</p>
                      <div className="mt-4 flex space-x-2">
                        {comment.status === 'pendiente' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(comment.id, 'aprobado')}
                              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                            >
                              Aprobar
                            </button>
                            <button
                              onClick={() => handleStatusChange(comment.id, 'rechazado')}
                              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                            >
                              Rechazar
                            </button>
                          </>
                        )}
                        {comment.status === 'aprobado' && (
                          <button
                            onClick={() => handleStatusChange(comment.id, 'rechazado')}
                            className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
                          >
                            Marcar como Spam
                          </button>
                        )}
                        {comment.status === 'rechazado' && (
                          <button
                            onClick={() => handleStatusChange(comment.id, 'aprobado')}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                          >
                            Restaurar
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderQuotes = () => {
    const handleDeleteQuote = async (id) => {
      if (window.confirm('¿Estás seguro de que quieres eliminar esta cotización?')) {
        try {
          await eliminarCotizacion(id);
          console.log('Cotización eliminada exitosamente');
        } catch (error) {
          console.error('Error al eliminar cotización:', error);
          alert('Error al eliminar la cotización');
        }
      }
    };

    const handleStatusChange = async (id, newStatus) => {
      try {
        await cambiarEstadoCotizacion(id, newStatus);
        console.log('Estado cambiado exitosamente');
      } catch (error) {
        console.error('Error al cambiar estado:', error);
        alert('Error al cambiar el estado');
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Cotizaciones</h2>
        </div>

        {errorCotizaciones && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{errorCotizaciones}</p>
          </div>
        )}

        {/* Estadísticas de cotizaciones */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-2xl font-bold text-yellow-600">{cotizaciones.filter(q => q.status === 'pendiente' || !q.status).length}</p>
            <p className="text-sm text-gray-600">Pendientes</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-2xl font-bold text-blue-600">{cotizaciones.filter(q => q.status === 'en_progreso').length}</p>
            <p className="text-sm text-gray-600">En Progreso</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-2xl font-bold text-green-600">{cotizaciones.filter(q => q.status === 'aprobada' || q.status === 'completada').length}</p>
            <p className="text-sm text-gray-600">Completadas</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <p className="text-2xl font-bold text-purple-600">${cotizaciones.reduce((sum, q) => sum + (parseFloat(q.budget) || 0), 0).toLocaleString()}</p>
            <p className="text-sm text-gray-600">Valor Total</p>
          </div>
        </div>

        {/* Lista de cotizaciones */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Cotizaciones Recientes</h3>
          </div>
          
          {loadingCotizaciones ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Cargando cotizaciones...</p>
            </div>
          ) : cotizaciones.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No hay cotizaciones aún
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Proyecto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cotizaciones.map(quote => (
                    <tr key={quote.id}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{quote.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{quote.email || 'N/A'}</div>
                          {quote.company && <div className="text-xs text-gray-400">{quote.company}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{quote.projectType || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">${quote.budget ? parseFloat(quote.budget).toLocaleString() : 'N/A'}</td>
                      <td className="px-6 py-4">
                        <select
                          value={quote.status || 'pendiente'}
                          onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                          className={`px-2 py-1 text-xs rounded-full border-0 cursor-pointer ${
                            quote.status === 'completada' ? 'bg-green-100 text-green-800' :
                            quote.status === 'aprobada' ? 'bg-blue-100 text-blue-800' :
                            quote.status === 'en_progreso' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="en_progreso">En Progreso</option>
                          <option value="aprobada">Aprobada</option>
                          <option value="completada">Completada</option>
                          <option value="rechazada">Rechazada</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {quote.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => {
                              alert(`
Cotización Completa:
------------------
Cliente: ${quote.name}
Email: ${quote.email}
Empresa: ${quote.company || 'N/A'}
Tipo: ${quote.projectType}
Presupuesto: $${quote.budget || 'N/A'}
Mensaje: ${quote.message || 'N/A'}
Estado: ${quote.status || 'pendiente'}
Fecha: ${quote.createdAt?.toDate?.()?.toLocaleString() || 'N/A'}
                              `);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="Ver detalles"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteQuote(quote.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Páginas</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus size={16} className="mr-2" />
          Nueva Página
        </button>
      </div>

      {/* Estadísticas de páginas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-green-600">{recentPages.filter(p => p.status === 'Publicado').length}</p>
          <p className="text-sm text-gray-600">Publicadas</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-yellow-600">{recentPages.filter(p => p.status === 'Borrador').length}</p>
          <p className="text-sm text-gray-600">Borradores</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-blue-600">{recentPages.reduce((sum, p) => sum + p.views, 0)}</p>
          <p className="text-sm text-gray-600">Vistas Totales</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <p className="text-2xl font-bold text-purple-600">{recentPages.length}</p>
          <p className="text-sm text-gray-600">Total Páginas</p>
        </div>
      </div>

      {/* Lista de páginas */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Páginas del Sitio</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentPages.map(page => (
            <div key={page.id} className="p-6 flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{page.title}</h4>
                <p className="text-sm text-gray-600">{page.views} vistas</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  page.status === 'Publicado'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {page.status}
                </span>
                <div className="flex space-x-1">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNews = () => (
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
            <input value={newsForm.title} onChange={(e) => setNewsForm({...newsForm, title: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtítulo</label>
            <input value={newsForm.subtitle} onChange={(e) => setNewsForm({...newsForm, subtitle: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Extracto</label>
            <input value={newsForm.excerpt} onChange={(e) => setNewsForm({...newsForm, excerpt: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded text-gray-900" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Contenido</label>
          <textarea value={newsForm.content} onChange={(e) => setNewsForm({...newsForm, content: e.target.value})} rows={6} className="w-full mt-1 px-3 py-2 border rounded text-gray-900" />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Agregar imagen (URL)</label>
            <div className="flex space-x-2">
              <input value={newsForm.imageInput} onChange={(e) => setNewsForm({...newsForm, imageInput: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded text-gray-900" placeholder="https://.../imagen.jpg" />
              <button onClick={() => {
                if (!newsForm.imageInput) return;
                setNewsForm({...newsForm, images: [newsForm.imageInput, ...newsForm.images], imageInput: ''});
              }} className="ml-2 bg-gray-200 px-3 rounded">Añadir</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {newsForm.images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} alt="preview" className="w-24 h-16 object-cover rounded border" />
                  <button onClick={() => setNewsForm({...newsForm, images: newsForm.images.filter((_, idx) => idx !== i)})} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de publicación</label>
            <input type="datetime-local" value={newsForm.publishAt} onChange={(e) => setNewsForm({...newsForm, publishAt: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded text-gray-900" />
            <label className="flex items-center mt-2 text-sm">
              <input type="checkbox" checked={newsForm.publishImmediately} onChange={(e) => setNewsForm({...newsForm, publishImmediately: e.target.checked})} className="mr-2" /> Publicar inmediatamente
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select value={newsForm.status} onChange={(e) => setNewsForm({...newsForm, status: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded text-gray-900">
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
            <label className="flex items-center mt-2 text-sm">
              <input type="checkbox" checked={newsForm.sendNotification} onChange={(e) => setNewsForm({...newsForm, sendNotification: e.target.checked})} className="mr-2" /> Enviar notificación a suscriptores
            </label>
            <div className="flex items-end">
              <button onClick={() => createOrUpdateNews(newsForm)} className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{editingNews ? 'Actualizar' : 'Crear'}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Noticias</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {news.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No hay noticias aún</div>
          ) : (
            news.map((item, idx) => (
              <div key={item.id} className="p-6 flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{item.title} <span className="text-xs text-gray-500">• {item.status}</span></h4>
                  {item.subtitle && <p className="text-sm text-gray-700">{item.subtitle}</p>}
                  <p className="text-sm text-gray-600">{item.excerpt}</p>
                  <p className="text-xs text-gray-400 mt-2">Creada: {new Date(item.createdAt).toLocaleString()} {item.publishAt ? `• Publica: ${new Date(item.publishAt).toLocaleString()}` : ''}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col">
                    <button onClick={() => moveNews(item.id, 'up')} disabled={idx === 0} className="px-2 py-1 bg-gray-100 rounded text-sm">↑</button>
                    <button onClick={() => moveNews(item.id, 'down')} disabled={idx === news.length-1} className="px-2 py-1 bg-gray-100 rounded text-sm mt-1">↓</button>
                  </div>
                  <button onClick={() => togglePublish(item.id)} className="px-3 py-1 rounded bg-green-100 text-green-800 text-sm">{item.status === 'published' ? 'Despublicar' : 'Publicar'}</button>
                  <button onClick={() => handleEditNews(item.id)} className="px-3 py-1 rounded bg-blue-100 text-blue-800 text-sm">Editar</button>
                  <button onClick={() => handleDeleteNews(item.id)} className="px-3 py-1 rounded bg-red-100 text-red-800 text-sm">Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Portfolio</h2>
        <div className="text-sm text-gray-600">Total: {portfolioItems.length}</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Crear / Editar Proyecto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <input value={projectForm.category} onChange={(e) => setProjectForm({...projectForm, category: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cliente</label>
            <input value={projectForm.client} onChange={(e) => setProjectForm({...projectForm, client: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Año</label>
            <input type="number" value={projectForm.year} onChange={(e) => setProjectForm({...projectForm, year: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} rows={4} className="w-full mt-1 px-3 py-2 border rounded" />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Imagen (URL)</label>
            <input value={projectForm.image} onChange={(e) => setProjectForm({...projectForm, image: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Enlace al proyecto</label>
            <input value={projectForm.url} onChange={(e) => setProjectForm({...projectForm, url: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tecnologías (comma-separated)</label>
            <input value={projectForm.technologies} onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
        </div>
        <div className="mt-4 flex items-end">
          <button onClick={() => createOrUpdateProject(projectForm)} className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{editingProject ? 'Actualizar' : 'Crear'}</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Proyectos</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {portfolioItems.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No hay proyectos</div>
          ) : (
            portfolioItems.map((p, idx) => (
              <div key={p.id} className="p-6 flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{p.title} <span className="text-xs text-gray-500">• {p.category}</span></h4>
                  <p className="text-sm text-gray-600">{p.client} • {p.year}</p>
                  <p className="text-sm text-gray-700 mt-2">{p.description}</p>
                  <p className="text-xs text-gray-400 mt-2">Tecnologías: {(p.technologies || []).join(', ')}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col">
                    <button onClick={() => moveProject(p.id, 'up')} disabled={idx === 0} className="px-2 py-1 bg-gray-100 rounded text-sm">↑</button>
                    <button onClick={() => moveProject(p.id, 'down')} disabled={idx === portfolioItems.length-1} className="px-2 py-1 bg-gray-100 rounded text-sm mt-1">↓</button>
                  </div>
                  <button onClick={() => handleEditProject(p.id)} className="px-3 py-1 rounded bg-blue-100 text-blue-800 text-sm">Editar</button>
                  <button onClick={() => handleDeleteProject(p.id)} className="px-3 py-1 rounded bg-red-100 text-red-800 text-sm">Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'visits':
        return renderVisits();
      case 'comments':
        return renderComments();
      case 'quotes':
        return renderQuotes();
      case 'news':
        return renderNews();
      case 'portfolio':
        return renderPortfolio();
      case 'pages':
        return renderPages();
      case 'users':
        return renderUsers();
      case 'analytics':
        return <div className="text-center py-12 text-gray-500">Analytics próximamente</div>;
      case 'settings':
        return <div className="text-center py-12 text-gray-500">Configuración próximamente</div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-900">Panel Admin</h1>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} className="mr-3" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t flex-shrink-0">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
        <div className="p-6 border-b bg-white flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">WebSy Admin</h1>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;