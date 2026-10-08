import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Globe, MessageSquare, Instagram, Bot, Smartphone, ShoppingBag,
  TrendingUp, Zap, Cpu, Database, Sparkles
} from 'lucide-react';

export const HeroSection = () => {
  const navigate = useNavigate();

  const colUpItems = [
    { label: 'Auto. WhatsApp', icon: MessageSquare, badge: 'IA 24/7' },
    { label: 'Bots Instagram', icon: Instagram, badge: 'Auto' },
    { label: 'Flujos Make/n8n', icon: Zap, badge: 'Flows' },
    { label: 'Modelos GPT', icon: Bot, badge: 'AI Engine' },
    { label: 'Agentes IA', icon: Cpu, badge: 'Agentes' },
  ];

  const colDownItems = [
    { label: 'Webs & Landings', icon: Globe, badge: 'Top Design' },
    { label: 'Tiendas online', icon: ShoppingBag, badge: 'Ventas' },
    { label: 'Apps Android/iOS', icon: Smartphone, badge: 'Mobile' },
    { label: 'SEO en Google', icon: TrendingUp, badge: 'Tráfico' },
    { label: 'ERP / CRM', icon: Database, badge: 'A Medida' },
  ];

  return (
    <section id="inicio" className="relative w-full min-h-screen flex flex-col justify-start sm:justify-center items-center bg-[#182A2C] text-white overflow-hidden pb-16">
      <div className="hidden xl:flex absolute inset-y-0 right-2 lg:right-4 h-full flex-row gap-2.5 items-center overflow-hidden pointer-events-none z-20 opacity-90">
        <div className="flex flex-col gap-3 overflow-hidden h-full">
          <div className="flex flex-col gap-3 animate-marquee-v-up shrink-0">
            {[...colUpItems, ...colUpItems, ...colUpItems, ...colUpItems, ...colUpItems, ...colUpItems].map((item, idx) => {
              const IconComp = item.icon;
              return <div key={idx} className="py-1.5 px-2 flex items-center gap-2.5 w-40 shrink-0 transition-opacity hover:opacity-100 opacity-80"><div className="w-6 h-6 rounded-md bg-[#d9fb06]/20 flex items-center justify-center text-[#d9fb06] shrink-0"><IconComp size={13} /></div><div className="flex flex-col min-w-0"><span className="text-[11px] font-bold text-white tracking-tight truncate leading-tight">{item.label}</span><span className="text-[8px] font-black text-[#d9fb06] uppercase tracking-widest leading-none mt-0.5">{item.badge}</span></div></div>;
            })}
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-hidden h-full">
          <div className="flex flex-col gap-3 animate-marquee-v-down shrink-0">
            {[...colDownItems, ...colDownItems, ...colDownItems, ...colDownItems, ...colDownItems, ...colDownItems].map((item, idx) => {
              const IconComp = item.icon;
              return <div key={idx} className="py-1.5 px-2 flex items-center gap-2.5 w-40 shrink-0 transition-opacity hover:opacity-100 opacity-70"><div className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center text-white shrink-0"><IconComp size={13} /></div><div className="flex flex-col min-w-0"><span className="text-[11px] font-bold text-white tracking-tight truncate leading-tight">{item.label}</span><span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mt-0.5">{item.badge}</span></div></div>;
            })}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Outfit:wght@800;900&display=swap');
        .font-brand-bold { font-family: 'Outfit', sans-serif; }
        .font-cursive { font-family: 'Caveat', cursive; }
        @keyframes marquee-vertical-up { 0% { transform: translateY(0%); } 100% { transform: translateY(-50%); } }
        @keyframes marquee-vertical-down { 0% { transform: translateY(-50%); } 100% { transform: translateY(0%); } }
        .animate-marquee-v-up { animation: marquee-vertical-up 55s linear infinite; }
        .animate-marquee-v-down { animation: marquee-vertical-down 55s linear infinite; }
        #inicio { padding-top: 195px !important; }
        @media (min-width: 640px) { #inicio { padding-top: 130px !important; } }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#244246]/60 via-[#182A2C]/90 to-[#0e1b1d] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-20 text-center flex flex-col items-center justify-center max-w-5xl">
        <div aria-hidden="true" className="font-brand-bold text-7xl sm:text-9xl lg:text-[160px] font-black text-white leading-none tracking-tight uppercase drop-shadow-2xl">WEBSY</div>
        <p aria-hidden="true" className="font-cursive text-4xl sm:text-6xl lg:text-7xl text-[#d9fb06] -mt-2 sm:-mt-6 lg:-mt-10 mb-6 sm:mb-8 font-normal tracking-wide drop-shadow-lg rotate-[-2deg]">desarrollo & tecnología</p>
        <h1 className="max-w-[44rem] text-3xl sm:text-5xl lg:text-[3.4rem] font-black text-white leading-[1.08] tracking-tight mb-6">Webs y sistemas que le traen clientes a tu empresa</h1>
        <p className="max-w-3xl text-base sm:text-xl text-gray-100 font-medium leading-relaxed mb-10 opacity-95">Páginas web, tiendas online y automatizaciones pensadas para que tus visitas se conviertan en consultas y esas consultas en ventas.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button onClick={() => navigate('/contacto')} className="w-full sm:w-auto bg-[#d9fb06] hover:bg-white text-[#182A2C] font-black px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-2xl hover:scale-105 flex items-center justify-center gap-3 group"><span>Solicitar Cotización</span><ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
          <button onClick={() => navigate('/contacto?tipo=auditoria')} className="w-full sm:w-auto bg-black/50 hover:bg-black/80 text-white font-black px-8 py-3.5 text-xs sm:text-sm border border-[#d9fb06]/60 hover:border-[#d9fb06] backdrop-blur-md transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center group"><div className="flex items-center gap-2 uppercase tracking-[0.15em] text-white group-hover:text-[#d9fb06] transition-colors"><Sparkles size={16} className="text-[#d9fb06]" /><span>Auditoría Web Gratuita</span></div><span className="text-[11px] font-medium text-gray-300 normal-case tracking-normal opacity-90 mt-0.5">3 mejoras concretas por WhatsApp</span></button>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-white/70"><span>ARGENTINA</span><span>•</span><span>COLOMBIA</span><span>•</span><span>MÉXICO</span><span>•</span><span>ESTADOS UNIDOS</span></div>
      </div>
    </section>
  );
};
