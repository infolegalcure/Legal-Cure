import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, CalendarCheck, HelpCircle, User, Briefcase, Sparkles, Headphones } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeView, setActiveView, userBookings, currentUser, openAuthModal, lang } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
      <button
        onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
          activeView === 'home' ? 'text-[#082B63] font-bold' : 'text-slate-500 hover:text-[#082B63]'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>{lang === 'hi' ? 'होम' : 'Home'}</span>
      </button>

      <button
        onClick={() => { setActiveView('professionals'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
          activeView === 'professionals' ? 'text-[#082B63] font-bold' : 'text-slate-500 hover:text-[#082B63]'
        }`}
      >
        <Search className="w-5 h-5" />
        <span>{lang === 'hi' ? 'विशेषज्ञ' : 'Find Pros'}</span>
      </button>

      <button
        onClick={() => { setActiveView('how_it_works'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
          activeView === 'how_it_works' ? 'text-[#082B63] font-bold' : 'text-slate-500 hover:text-[#082B63]'
        }`}
      >
        <Sparkles className="w-5 h-5 text-amber-600" />
        <span>{lang === 'hi' ? 'प्रक्रिया' : 'How It Works'}</span>
      </button>

      <button
        onClick={() => { setActiveView('support'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
          activeView === 'support' ? 'text-[#082B63] font-bold' : 'text-slate-500 hover:text-[#082B63]'
        }`}
      >
        <Headphones className="w-5 h-5" />
        <span>{lang === 'hi' ? 'सहायता' : 'Support'}</span>
      </button>

      {currentUser ? (
        <button
          onClick={() => { 
            if (currentUser.role === 'professional') {
              setActiveView('pro_dashboard');
            } else if (currentUser.role === 'admin') {
              setActiveView('admin');
            } else {
              setActiveView('bookings');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }}
          className={`relative flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
            activeView === 'bookings' || activeView === 'pro_dashboard' || activeView === 'admin'
              ? 'text-[#082B63] font-bold' 
              : 'text-slate-500 hover:text-[#082B63]'
          }`}
        >
          {currentUser.role === 'professional' ? <Briefcase className="w-5 h-5" /> : <CalendarCheck className="w-5 h-5" />}
          <span>{currentUser.role === 'professional' ? 'Portal' : (lang === 'hi' ? 'बुकिंग्स' : 'Bookings')}</span>
          {userBookings.length > 0 && (
            <span className="absolute top-0.5 right-1.5 bg-[#082B63] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {userBookings.length}
            </span>
          )}
        </button>
      ) : (
        <button
          onClick={() => openAuthModal('login')}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-[10px] font-semibold text-slate-700 hover:text-[#082B63]"
        >
          <User className="w-5 h-5 text-[#082B63]" />
          <span>{lang === 'hi' ? 'लॉगिन' : 'Login'}</span>
        </button>
      )}
    </div>
  );
};
