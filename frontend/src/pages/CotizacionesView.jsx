import React, { useState, useEffect } from 'react';
import { subscribeCotizaciones, deleteCotizacion } from '../firebase';
import { useLanguage } from '../LanguageContext';

export const CotizacionesView = () => {
    const [cotizaciones, setCotizaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        let unsub;
        const setupSub = async () => {
            unsub = await subscribeCotizaciones((data) => {
                setCotizaciones(data);
                setLoading(false);
            });
        };

        setupSub();

        return () => {
            if (unsub && typeof unsub === 'function') {
                unsub();
            }
        };
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta cotización?')) {
            try {
                await deleteCotizacion(id);
            } catch (error) {
                console.error('Error al eliminar:', error);
                alert('Error al eliminar');
            }
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleString();
    };

    return (
        <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: '#f9fafb', paddingTop: '100px' }}>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Solicitudes de Cotización</h1>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {cotizaciones.length} solicitudes
                    </span>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : cotizaciones.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
                        No hay solicitudes registradas aún.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {cotizaciones.map((cot) => (
                            <div key={cot.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md relative group">
                                <button
                                    onClick={() => handleDelete(cot.id)}
                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                                    title="Eliminar"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Cliente</p>
                                        <p className="text-lg font-bold text-gray-800">{cot.name}</p>
                                        <p className="text-sm text-blue-600 font-medium">{cot.email}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Proyecto / Empresa</p>
                                        <p className="text-sm font-medium text-gray-800">
                                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 mr-2">{cot.projectType || 'No especificado'}</span>
                                            {cot.company || 'Particular'}
                                        </p>
                                        <p className="text-sm text-green-600 font-semibold">Presupuesto: {cot.budget || 'A convenir'}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Fecha</p>
                                        <p className="text-sm text-gray-600">{formatDate(cot.createdAt)}</p>
                                    </div>

                                    <div className="md:col-span-2 lg:col-span-3 mt-4 pt-4 border-t border-gray-50">
                                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Descripción del Proyecto</p>
                                        <p className="text-gray-700 text-sm whitespace-pre-wrap bg-gray-50 p-4 rounded-lg leading-relaxed">
                                            {cot.message || 'Sin descripción adicional.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
