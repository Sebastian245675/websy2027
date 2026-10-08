import React from 'react';
import { 
  Monitor, 
  Smartphone, 
  ShoppingCart, 
  Database, 
  Bot, 
  TrendingUp, 
  Palette, 
  ClipboardCheck, 
  ArrowRight, 
  ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Diagram coordinate system (px at full size); everything scales with the container via cqw units
const VB_W = 600;
const VB_H = 520;
const HUB = { x: 300, y: 260, size: 76 };
const HUB_L = HUB.x - HUB.size / 2;
const HUB_R = HUB.x + HUB.size / 2;
const R = 12; // corner radius of connector lines

const cq = (px) => `${(px / VB_W) * 100}cqw`;

// Connector: vertical from (x, y1) to entry height y2, rounded turn, then horizontal into the hub side
const connector = (x, y1, y2) => {
  const toRight = x < HUB.x;
  const hubX = toRight ? HUB_L : HUB_R;
  const dy = y2 > y1 ? R : -R;
  const dx = toRight ? R : -R;
  return `M ${x} ${y1} V ${y2 - dy} Q ${x} ${y2} ${x + dx} ${y2} H ${hubX}`;
};

const nodes = [
  // Left side (enter hub's left edge at staggered heights)
  { title: 'Desarrollo Web y Landing Pages', icon: Monitor, x: 220, y: 52, line: [220, 132, 236] },
  { title: 'Auditoría y Consultoría Digital', icon: ClipboardCheck, x: 85, y: 142, line: [85, 222, 252] },
  { title: 'Branding y Diseño UI/UX', icon: Palette, x: 85, y: 348, line: [85, 312, 268] },
  { title: 'SEO y Marketing Digital', icon: TrendingUp, x: 220, y: 432, line: [220, 396, 284] },
  // Right side
  { title: 'Sistemas CRM y ERP a medida', icon: Database, x: 380, y: 52, line: [380, 132, 236] },
  { title: 'Aplicaciones Móviles', icon: Smartphone, x: 515, y: 142, line: [515, 222, 252] },
  { title: 'Tiendas Online y E-commerce', icon: ShoppingCart, x: 515, y: 348, line: [515, 312, 268] },
  { title: 'Automatización con IA', icon: Bot, x: 380, y: 432, line: [380, 396, 284] },
];

const ServiceNode = ({ icon: Icon, title, x, y }) => (
  <div
    className="absolute flex flex-col items-center text-center z-10 group"
    style={{
      left: `${(x / VB_W) * 100}%`,
      top: `${(y / VB_H) * 100}%`,
      width: cq(150),
      transform: `translate(-50%, -${cq(31)})`,
      gap: cq(8),
    }}
  >
    <div
      className="bg-[#182A2C] flex items-center justify-center text-white shadow-[0_10px_25px_-10px_rgba(24,42,44,0.6)] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#d9fb06] group-hover:text-[#182A2C]"
      style={{ width: cq(62), height: cq(62), borderRadius: cq(14) }}
    >
      <Icon style={{ width: cq(30), height: cq(30) }} strokeWidth={1.75} />
    </div>
    <span
      className="font-bold text-[#182A2C] leading-[1.2] tracking-tight"
      style={{ fontSize: cq(14) }}
    >
      {title}
    </span>
  </div>
);

export const BenefitsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="beneficios" className="py-20 lg:py-28 bg-[#f8fafc] relative overflow-hidden font-sans">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">
        
        {/* Left Side: Text and Buttons */}
        <div className="lg:w-[45%] flex flex-col items-start text-left z-10">
          <h2 className="text-[34px] md:text-[44px] lg:text-[48px] font-extrabold text-[#182A2C] leading-[1.08] tracking-tight mb-6">
            La infraestructura tecnológica para escalar tu empresa
          </h2>
          
          <p className="text-[#475569] text-[16px] md:text-[18px] leading-[1.7] mb-12 max-w-[500px]">
            Websy se adapta a cualquier tamaño y rubro de negocio. Desde emprendimientos hasta corporaciones, automatizamos y digitalizamos tus operaciones desde un único socio experto, garantizando estabilidad y el mejor soporte técnico del mercado.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <button 
              onClick={() => navigate('/contacto')}
              className="w-full sm:w-auto bg-[#0f172a] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-[15px] transition-all flex items-center justify-center gap-3 group shadow-xl hover:shadow-blue-500/30"
            >
              Hablemos de tu proyecto
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => navigate('/servicios')}
              className="w-full sm:w-auto bg-transparent hover:text-blue-600 text-[#0f172a] font-bold text-[15px] transition-colors flex items-center justify-center gap-1"
            >
              Ver todos los servicios
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Side: Infographic */}
        <div className="lg:w-[55%] w-full flex justify-center mt-8 lg:mt-0">
          {/* Desktop / tablet: hub diagram */}
          <div
            className="hidden sm:block relative w-full max-w-[600px]"
            style={{ aspectRatio: `${VB_W} / ${VB_H}`, containerType: 'inline-size' }}
          >
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              fill="none"
            >
              <g stroke="#182A2C" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {nodes.map(({ title, line }) => (
                  <path key={title} d={connector(...line)} />
                ))}
              </g>
            </svg>

            {/* Central hub */}
            <div
              className="absolute z-20 bg-white flex items-center justify-center ring-4 ring-[#d9fb06] shadow-[0_15px_35px_-12px_rgba(24,42,44,0.45)]"
              style={{
                left: `${(HUB.x / VB_W) * 100}%`,
                top: `${(HUB.y / VB_H) * 100}%`,
                width: cq(HUB.size),
                height: cq(HUB.size),
                borderRadius: cq(18),
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img src="/websy-logo.png" alt="Websy" className="w-[78%] h-[78%] object-contain" />
            </div>

            {nodes.map((node) => (
              <ServiceNode key={node.title} {...node} />
            ))}
          </div>

          {/* Mobile: compact grid */}
          <div className="sm:hidden grid grid-cols-2 gap-x-4 gap-y-8 w-full">
            {nodes.map(({ title, icon: Icon }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-[#182A2C] rounded-[14px] flex items-center justify-center text-white shadow-lg">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <span className="text-[13px] font-bold text-[#182A2C] leading-tight">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
