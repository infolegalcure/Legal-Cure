import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, CalendarCheck, Calculator, Sparkles } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeView, setActiveView, userBookings, setIsStampCalcOpen, lang } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
      <button
        onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
          activeView === 'home' ? 'text-primary' : 'text-slate-500 hover:text-navy'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>{lang === 'hi' ? 'होम' : 'Home'}</span>
      </button>

      <button
        onClick={() => { setActiveView('professionals'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
          activeView === 'professionals' ? 'text-primary' : 'text-slate-500 hover:text-navy'
        }`}
      >
        <Search className="w-5 h-5" />
        <span>{lang === 'hi' ? 'खोजें' : 'Find Pros'}</span>
      </button>

      <button
        onClick={() => setIsStampCalcOpen(true)}
        className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-semibold text-slate-500 hover:text-navy"
      >
        <Calculator className="w-5 h-5 text-amber-600" />
        <span>{lang === 'hi' ? 'कैलकुलेटर' : 'Stamp Calc'}</span>
      </button>

      <button
        onClick={() => { setActiveView('bookings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`relative flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
          activeView === 'bookings' ? 'text-primary' : 'text-slate-500 hover:text-navy'
        }`}
      >
        <CalendarCheck className="w-5 h-5" />
        <span>{lang === 'hi' ? 'बुकिंग्स' : 'Bookings'}</span>
        {userBookings.length > 0 && (
          <span className="absolute top-0.5 right-2 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {userBookings.length}
          </span>
        )}
      </button>

      <button
        onClick={() => { setActiveView('how_it_works'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
          activeView === 'how_it_works' ? 'text-primary' : 'text-slate-500 hover:text-navy'
        }`}
      >
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <span>{lang === 'hi' ? 'प्रक्रिया' : 'Process'}</span>
      </button>
    </div>
  );
};
