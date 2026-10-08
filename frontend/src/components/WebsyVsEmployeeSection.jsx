import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UserRound } from 'lucide-react';

// Montos por mes de cada tarea: los pasa Agustín. Mientras sean null, la fila muestra solo la comparación
// en texto. Ejemplo: employeeCost: 'ARS 900.000/mes', websyCost: 'Desde USD 80/mes'.
const rows = [
  {
    task: 'Responder consultas por WhatsApp',
    employee: 'Contesta en horario laboral y de a una persona por vez.',
    websy: 'Un asistente con IA responde al instante, las 24 horas.',
    employeeCost: null,
    websyCost: null,
  },
  {
    task: 'Mostrar productos y tomar pedidos',
    employee: 'Manda fotos y precios a mano y anota cada pedido.',
    websy: 'Tu tienda online muestra el catálogo y toma los pedidos sola.',
    employeeCost: null,
    websyCost: null,
  },
  {
    task: 'Cargar ventas, stock y caja',
    employee: 'Carga planillas a mano, con demoras y errores.',
    websy: 'El sistema registra cada venta y actualiza stock y caja.',
    employeeCost: null,
    websyCost: null,
  },
  {
    task: 'Crecer el doble',
    employee: 'Hay que contratar y capacitar más gente.',
    websy: 'El mismo sistema atiende el doble de clientes.',
    employeeCost: null,
    websyCost: null,
  },
];

const Cost = ({ value }) => (value ? <span className="mt-2 block text-sm font-black text-[#182A2C]">{value}</span> : null);

export const WebsyVsEmployeeSection = () => {
  const navigate = useNavigate();

  return (
    <section id="websy-vs-empleado" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-5 lg:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-[#52645d] mb-5">
              <span className="h-2 w-2 rounded-full bg-[#d9fb06] ring-4 ring-[#d9fb06]/25" />
              Costos
            </div>
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#182A2C] leading-[1.1] tracking-tight">
              Websy vs. un empleado
            </h2>
          </div>
          <p className="text-[#475569] text-base md:text-lg leading-relaxed max-w-md">
            Las tareas que hoy te ocupan horas, resueltas por tu web y tu sistema, sin sueldos ni horarios.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-black uppercase tracking-[.16em]">
                <th scope="col" className="w-[28%] px-6 py-5 bg-[#f8fafc] text-slate-500">Tarea</th>
                <th scope="col" className="w-[36%] px-6 py-5 bg-[#f8fafc] text-slate-500">
                  <span className="inline-flex items-center gap-2"><UserRound size={15} /> Con un empleado</span>
                </th>
                <th scope="col" className="w-[36%] px-6 py-5 bg-[#182A2C] text-[#d9fb06]">Con Websy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((row) => (
                <tr key={row.task} className="align-top">
                  <th scope="row" className="px-6 py-6 text-lg font-bold text-[#182A2C]">{row.task}</th>
                  <td className="px-6 py-6 text-[15px] leading-relaxed text-slate-600">
                    {row.employee}
                    <Cost value={row.employeeCost} />
                  </td>
                  <td className="px-6 py-6 text-[15px] leading-relaxed text-[#182A2C] font-medium bg-[#d9fb06]/10">
                    {row.websy}
                    <Cost value={row.websyCost} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row) => (
            <div key={row.task} className="rounded-2xl border border-slate-200 overflow-hidden">
              <p className="px-5 pt-5 pb-3 text-lg font-bold text-[#182A2C]">{row.task}</p>
              <div className="px-5 pb-4 text-sm text-slate-600">
                <span className="block text-[10px] font-black uppercase tracking-[.16em] text-slate-400 mb-1">Con un empleado</span>
                {row.employee}
                <Cost value={row.employeeCost} />
              </div>
              <div className="px-5 py-4 text-sm text-[#182A2C] font-medium bg-[#d9fb06]/15">
                <span className="block text-[10px] font-black uppercase tracking-[.16em] text-[#52645d] mb-1">Con Websy</span>
                {row.websy}
                <Cost value={row.websyCost} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate('/contacto?tipo=auditoria')}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#182A2C] px-8 py-4 text-[15px] font-bold text-white transition-colors hover:bg-black"
          >
            Calcular cuánto ahorra mi empresa
            <ArrowRight size={18} className="text-[#d9fb06] transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
