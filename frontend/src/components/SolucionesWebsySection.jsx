import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { plans } from '../planData';
import { DEFAULT_MARKET, formatPrice, pricingNote } from '../pricing';

export const SolucionesWebsySection = ({ countryCode = DEFAULT_MARKET }) => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden pb-12 pt-2 md:pb-20 md:pt-6 lg:pb-28 lg:pt-8">
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-1/2 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100 L100 0 L100 100 Z" fill="#182A2C" /></svg>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 pb-12 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <article key={plan.id} className={`relative flex overflow-hidden rounded-2xl border bg-white transition duration-300 hover:-translate-y-1 hover:border-[#182A2C] hover:shadow-xl ${plan.highlighted ? 'border-2 border-[#182A2C] lg:scale-[1.03]' : 'border-slate-200 shadow-sm'}`}>
              {plan.badge && <span className="absolute right-0 top-0 rounded-bl-xl bg-[#182A2C] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">{plan.badge}</span>}
              <div className="flex w-full flex-col p-7">
                <Icon size={24} className="mb-5 text-[#556902]" />
                <p className="text-xs font-black uppercase tracking-[.16em] text-slate-500">{plan.shortName}</p>
                <p className="mt-2 min-h-[68px] text-[1.65rem] font-black leading-tight tracking-tight text-[#182A2C] md:text-3xl">{formatPrice(plan.price, countryCode)}</p>
                <div className="mt-5 border-t border-slate-200 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Ideal para</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{plan.ideal}</p>
                </div>
                <p className="mt-5 text-base leading-relaxed text-slate-600">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.slice(0, 3).map((feature) => <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"><CheckCircle size={16} className="mt-0.5 shrink-0 text-[#9db600]" />{feature}</li>)}
                </ul>
                {plan.example && (
                  <div className="mt-6 rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[.16em] text-slate-400">Ejemplo entregado</p>
                    <p className="mt-1 text-sm font-bold text-[#182A2C]">{plan.example.name}</p>
                    <p className="text-xs text-slate-500">{plan.example.detail}</p>
                  </div>
                )}
                <Link to={`/planes/${plan.id}`} aria-label={`${t('plans.moreInfo')} ${plan.name}`} className={`mt-auto flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors ${plan.highlighted ? 'bg-[#182A2C] text-white hover:bg-black' : 'border-2 border-[#182A2C] text-[#182A2C] hover:bg-[#182A2C] hover:text-white'} ${plan.example ? 'mt-6' : 'mt-10'}`}>
                  {t('plans.moreInfo')} <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <p className="container mx-auto -mt-7 mb-10 px-4 text-center text-sm text-slate-500">{pricingNote(countryCode)}</p>
    </div>
  );
};
