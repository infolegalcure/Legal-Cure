import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, CheckCheck, Smartphone, ShieldCheck, ArrowRight, Bell } from 'lucide-react';

export const WhatsAppSection: React.FC = () => {
  const { lang, setIsWhatsAppDrawerOpen } = useApp();

  return (
    <section className="py-12 bg-gradient-to-r from-[#082B63] to-[#0A367B] text-white" id="whatsapp-first-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'hi' ? 'व्हाट्सएप आधारित संचार तंत्र' : 'WhatsApp-First Communication Architecture'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === 'hi'
                ? 'हर बुकिंग, नया समय व शेड पता — सीधे आपके व्हाट्सएप पर'
                : 'Real-Time WhatsApp Notifications for Bookings, Time Proposals & Shed Locations'}
            </h2>

            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed max-w-2xl">
              Deed writers and land buyers in Bihar rely on WhatsApp as their primary communication tool. LegalCure automatically routes booking requests, proposed slot adjustments, and meeting coordinates directly to WhatsApp.
            </p>

            <div className="flex flex-wrap gap-4 text-xs pt-2">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                <CheckCheck className="w-4 h-4 text-emerald-400" />
                <span>Instant Client Booking Receipt</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                <CheckCheck className="w-4 h-4 text-emerald-400" />
                <span>Katib 1-Click Accept / Reschedule</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                <CheckCheck className="w-4 h-4 text-emerald-400" />
                <span>Official Registry Shed Map Pin</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <button
              onClick={() => setIsWhatsAppDrawerOpen(true)}
              className="bg-[#10B981] hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3.5 rounded-2xl text-xs transition-all shadow-xl flex items-center gap-2 active:scale-95"
            >
              <Smartphone className="w-4 h-4" />
              <span>Open Live WhatsApp Simulation Feed</span>
            </button>
            <span className="text-[11px] text-blue-200/70 mt-2">
              Inspect real-time dispatched message templates
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
