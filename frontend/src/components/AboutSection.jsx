import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export const AboutSection = () => {
  const navigate = useNavigate();

  const caseResults = [
    {
      client: "STG GOLD",
      rubro: "Servicios de Alto Valor",
      mainMetric: "+$5,000 USD",
      mainMetricLabel: "Aumento en facturación neta",
      url: "https://mlogistica.grupoemesalta.com.ar/",
      details: [
        "40 consultas cualificadas por mes",
        "5 clientes cerrados mensualmente",
        "Estrategia de conversión directa"
      ],
      badgeColor: "bg-[#d9fb06] text-[#182A2C]"
    },
    {
      client: "Regala Algo",
      rubro: "E-commerce & Regales",
      mainMetric: "$2M ARS/mes",
      mainMetricLabel: "~$1,000 USD facturados por mes",
      url: "https://regalaalgosrl.com/",
      details: [
        "+3,000 productos activos en stock",
        "Inversión inicial de solo 600 USD",
        "Plataforma e-commerce escalable"
      ],
      badgeColor: "bg-[#182A2C] text-[#d9fb06]"
    },
    {
      client: "Konnet",
      rubro: "Importación & Distribución Latam",
      mainMetric: "ROI en 2 Semanas",
      mainMetricLabel: "Recuperación de inversión inicial",
      url: "https://covenant.adhoc.ar/",
      details: [
        "+100 productos traídos a Latinoamérica",
        "Margen de ganancia altísimo",
        "Canal digital de ventas optimizado"
      ],
      badgeColor: "bg-[#35affb] text-white"
    }
  ];

  return (
    <section id="nosotros" className="pt-12 lg:pt-16 pb-16 bg-white">
      <div className="container px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Main Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="text-[#182A2C] font-black tracking-[0.2em] uppercase text-xs mb-4 inline-block bg-[#d9fb06] px-3 py-1">
            RESULTADOS TANGIBLES DE CLIENTES REALES
          </span>

          <h2 className="text-3xl md:text-5xl font-black text-[#182A2C] leading-[1.15] mb-6 tracking-tight">
            Más de +25 empresas confiaron en nosotros a lo largo de Latinoamérica
          </h2>

          <p className="text-gray-600 text-base md:text-xl font-bold leading-relaxed max-w-3xl mx-auto">
            pero lo que más te importa es ver sus resultados, te dejo algunos para que veas la conversión.
          </p>
        </div>

        {/* 3 Result Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {caseResults.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded-none p-6 md:p-8 flex flex-col justify-between hover:border-[#182A2C] hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-[#182A2C] group-hover:bg-[#d9fb06] transition-colors" />

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {item.rubro}
                  </span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 tracking-wider ${item.badgeColor}`}>
                    {item.client}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-black text-[#182A2C]">
                    {item.client}
                  </h3>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-black text-[#182A2C] hover:text-[#556902] transition-colors bg-[#d9fb06]/30 px-2 py-1"
                    title="Ver sitio web del cliente"
                  >
                    <span>Visitar Web</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                {/* Main Metric Highlight */}
                <div className="my-5 p-4 bg-[#182A2C] text-white rounded-none border-l-4 border-[#d9fb06]">
                  <div className="text-3xl md:text-4xl font-black text-[#d9fb06] tracking-tight leading-none mb-1">
                    {item.mainMetric}
                  </div>
                  <div className="text-xs font-semibold text-gray-300">
                    {item.mainMetricLabel}
                  </div>
                </div>

                {/* Details List */}
                <ul className="space-y-2.5 mb-6">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs text-gray-600 font-bold">
                      <CheckCircle2 size={15} className="text-[#182A2C] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 mt-4">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-gray-200 hover:bg-gray-300 text-[#182A2C] font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Ver sitio web real</span>
                  <ExternalLink size={13} />
                </a>

                <button
                  onClick={() => navigate('/contacto?plan=Auditoría+Gratuita')}
                  className="w-full py-3 px-4 bg-[#182A2C] hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Quiero resultados similares</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Action Bar */}
        <div className="bg-[#182A2C] text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h4 className="text-2xl md:text-3xl font-black text-white mb-2">
              ¿Listo para convertir a tus visitas en facturación real?
            </h4>
            <p className="text-gray-300 text-sm font-medium">
              Obtén tu auditoría web gratuita y plan de aceleración en solo 2 minutos.
            </p>
          </div>
          <button
            onClick={() => navigate('/contacto')}
            className="shrink-0 bg-[#d9fb06] hover:bg-white text-[#182A2C] font-black py-4 px-8 text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-lg"
          >
            ¡Impulsar Mi Empresa Ahora!
          </button>
        </div>

      </div>
    </section>
  );
};
