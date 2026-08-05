import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { portfolio as defaultPortfolio } from '../mockData';
import { useLanguage } from '../LanguageContext';

export const Portfolio3D = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState(defaultPortfolio);

  useEffect(() => {
    try {
      const rawPortfolio = localStorage.getItem('websy_portfolio');
      if (rawPortfolio) {
        const parsed = JSON.parse(rawPortfolio);
        if (Array.isArray(parsed) && parsed.length > 0) setProjects(parsed);
      }
    } catch (e) {
      console.error('Error reading portfolio from localStorage', e);
    }
  }, []);

  return (
    <section
      id="portfolio"
      className="py-14 md:py-18 lg:py-22"
      style={{ backgroundColor: '#fafafa' }}
    >
      <div className="container px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Título de sección */}
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-14"
          style={{ color: '#182A2C' }}
        >
          {t('portfolio.title')}
        </h2>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              style={{ borderColor: '#e5e7eb' }}
            >
              {/* Imagen */}
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  width={400}
                  height={225}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="p-5 md:p-6">
                {/* Categoría */}
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-1.5"
                  style={{ color: '#DC143C' }}
                >
                  {project.category}
                </p>

                {/* Cliente / Título del proyecto */}
                <h3
                  className="text-lg font-bold mb-2 leading-snug"
                  style={{ color: '#182A2C' }}
                >
                  {project.title}
                </h3>

                {/* Descripción */}
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: '#4b5563' }}
                >
                  {project.description}
                </p>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium rounded-md"
                      style={{
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Botón */}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#182A2C' }}
                  >
                    {t('portfolio.viewProject')}
                    <ExternalLink size={16} className="shrink-0" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* CTA debajo del grid */}
        <div className="text-center mt-12 md:mt-16">
          <button
            type="button"
            onClick={() => {
              const el = document.querySelector('#contacto');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else window.location.href = '/contacto';
            }}
            className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 shadow-md hover:shadow-lg"
            style={{ backgroundColor: '#DC143C' }}
          >
            {t('portfolio.cta')}
          </button>
        </div>
      </div>
    </section>
  );
};
