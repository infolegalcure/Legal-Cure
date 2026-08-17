import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, ShieldCheck, Calculator, CalendarCheck, Briefcase, Menu, X, UserCheck, HelpCircle } from 'lucide-react';

export const Header: React.FC = () => {
  const { lang, toggleLang, activeView, setActiveView, t, userBookings, setIsHelpMeChooseOpen, setIsStampCalcOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: typeof activeView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
      {/* Top micro-bar for trust & district notice */}
      <div className="bg-[#082B63] text-blue-100 text-xs py-1.5 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="font-medium text-[11px] sm:text-xs">
              {lang === 'hi' 
                ? 'बिहार के 38 जिलों के 135+ रजिस्ट्री कार्यालयों में प्रमाणित पेशेवर उपलब्ध' 
                : '135+ Bihar Registry & Sub-Registry Offices Covered with Verified Pros'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-300 text-[11px]">
            <button 
              onClick={() => setIsStampCalcOpen(true)} 
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Calculator className="w-3 h-3 text-[#F59E0B]" />
              {lang === 'hi' ? 'स्टाम्प ड्यूटी कैलकुलेटर' : 'Bihar Stamp Duty Calc'}
            </button>
            <span className="opacity-40">|</span>
            <span className="text-[#10B981] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              100% Token Protection Guarantee
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('home')} 
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo"
        >
          <div className="w-10 h-10 bg-[#082B63] rounded-xl flex items-center justify-center shadow-md shadow-blue-950/10 group-hover:bg-[#0B3D91] transition-colors">
            <span className="text-white font-bold text-xl leading-none">L</span>
          </div>
          <div className="flex flex-col leading-none">
            <div className="flex items-baseline">
              <span className="text-2xl font-black text-[#082B63] tracking-tight">LegalCure</span>
              <span className="text-2xl font-black text-[#0B3D91]">.in</span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">
              {lang === 'hi' ? 'बिहार भूमि सेवा मंच' : 'Bihar Property Marketplace'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold text-gray-600">
          <button
            onClick={() => handleNav('home')}
            className={`transition-colors py-1 ${activeView === 'home' ? 'text-[#0B3D91] border-b-2 border-[#0B3D91] font-bold pb-1' : 'hover:text-[#0B3D91]'}`}
          >
            {t('nav_home')}
          </button>
          
          <button
            onClick={() => handleNav('professionals')}
            className={`transition-colors py-1 ${activeView === 'professionals' ? 'text-[#0B3D91] border-b-2 border-[#0B3D91] font-bold pb-1' : 'hover:text-[#0B3D91]'}`}
          >
            {t('nav_pros')}
          </button>

          <button
            onClick={() => handleNav('how_it_works')}
            className={`transition-colors py-1 ${activeView === 'how_it_works' ? 'text-[#0B3D91] border-b-2 border-[#0B3D91] font-bold pb-1' : 'hover:text-[#0B3D91]'}`}
          >
            {t('nav_how')}
          </button>

          <button
            onClick={() => setIsStampCalcOpen(true)}
            className="hover:text-[#0B3D91] text-gray-600 flex items-center gap-1.5 transition-colors py-1"
          >
            <Calculator className="w-4 h-4 text-[#0B3D91]" />
            {lang === 'hi' ? 'स्टाम्प ड्यूटी' : 'Stamp Duty'}
          </button>

          <button
            onClick={() => handleNav('bookings')}
            className={`flex items-center gap-1.5 transition-colors py-1 ${activeView === 'bookings' ? 'text-[#0B3D91] border-b-2 border-[#0B3D91] font-bold pb-1' : 'hover:text-[#0B3D91]'}`}
          >
            <CalendarCheck className="w-4 h-4" />
            {t('nav_bookings')}
            {userBookings.length > 0 && (
              <span className="bg-[#0B3D91] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {userBookings.length}
              </span>
            )}
          </button>

          <div className="h-4 w-px bg-gray-200" />

          <button
            onClick={() => handleNav('pro_dashboard')}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
              activeView === 'pro_dashboard' 
                ? 'bg-blue-50 border-[#0B3D91] text-[#0B3D91]' 
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#082B63]" />
            {lang === 'hi' ? 'कातिब / वकील पोर्टल' : 'Pro Portal'}
          </button>

          <button
            onClick={() => handleNav('admin')}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
              activeView === 'admin' 
                ? 'bg-[#E6FFFA] border-[#10B981] text-[#10B981]' 
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#10B981]" />
            {lang === 'hi' ? 'सत्यापन' : 'Admin'}
          </button>
        </nav>

        {/* Right CTA / Language Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            id="lang-toggle-btn"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 uppercase tracking-tight transition-all"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5 text-[#0B3D91]" />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          <button
            onClick={() => setIsHelpMeChooseOpen(true)}
            className="hidden md:flex items-center gap-1.5 border border-[#0B3D91] text-[#0B3D91] hover:bg-blue-50 px-4 py-2 rounded-full text-xs font-bold transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {lang === 'hi' ? 'मदद चाहिए?' : 'Help Me Choose'}
          </button>

          <button
            onClick={() => handleNav('professionals')}
            className="bg-[#0B3D91] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-blue-900/10 hover:bg-[#082B63] transition-all active:scale-95"
            id="find-pros-cta-header"
          >
            {lang === 'hi' ? 'विशेषज्ञ खोजें' : 'Find Professionals'}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-[#082B63] rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#082B63]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-5 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3 text-sm font-semibold">
            <button
              onClick={() => handleNav('home')}
              className={`text-left py-2 px-3 rounded-lg ${activeView === 'home' ? 'bg-blue-50 text-primary font-bold' : 'text-slate-700'}`}
            >
              {t('nav_home')}
            </button>
            <button
              onClick={() => handleNav('professionals')}
              className={`text-left py-2 px-3 rounded-lg ${activeView === 'professionals' ? 'bg-blue-50 text-primary font-bold' : 'text-slate-700'}`}
            >
              {t('nav_pros')}
            </button>
            <button
              onClick={() => handleNav('how_it_works')}
              className={`text-left py-2 px-3 rounded-lg ${activeView === 'how_it_works' ? 'bg-blue-50 text-primary font-bold' : 'text-slate-700'}`}
            >
              {t('nav_how')}
            </button>
            <button
              onClick={() => {
                setIsStampCalcOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-slate-700 flex items-center justify-between"
            >
              <span>{lang === 'hi' ? 'बिहार स्टाम्प ड्यूटी कैलकुलेटर' : 'Bihar Stamp Duty Calculator'}</span>
              <Calculator className="w-4 h-4 text-primary" />
            </button>
            <button
              onClick={() => handleNav('bookings')}
              className={`text-left py-2 px-3 rounded-lg flex items-center justify-between ${activeView === 'bookings' ? 'bg-blue-50 text-primary font-bold' : 'text-slate-700'}`}
            >
              <span>{t('nav_bookings')}</span>
              {userBookings.length > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                  {userBookings.length}
                </span>
              )}
            </button>
            <div className="h-px bg-slate-100 my-1" />
            <button
              onClick={() => handleNav('pro_dashboard')}
              className="text-left py-2 px-3 rounded-lg text-slate-700 flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-navy" />
              <span>{lang === 'hi' ? 'प्रोफेशनल पोर्टल (कातिब / वकील)' : 'Professional Portal'}</span>
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="text-left py-2 px-3 rounded-lg text-slate-700 flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'hi' ? 'एडमिन सत्यापन डैशबोर्ड' : 'Admin Verification'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
