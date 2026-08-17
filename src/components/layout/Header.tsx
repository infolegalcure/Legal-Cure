import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Globe, 
  ShieldCheck, 
  Calculator, 
  CalendarCheck, 
  Briefcase, 
  Menu, 
  X, 
  UserCheck, 
  HelpCircle,
  MessageSquare,
  Search,
  BookOpen,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Award
} from 'lucide-react';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const { 
    lang, 
    toggleLang, 
    activeView, 
    setActiveView, 
    t, 
    userBookings, 
    setIsStampCalcOpen, 
    setIsHelpMeChooseOpen,
    setIsSeoAuditOpen,
    setIsWhatsAppDrawerOpen,
    whatsAppMessages,
    currentUser,
    currentRole,
    switchRole,
    openAuthModal,
    logoutUser
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleNav = (view: typeof activeView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pendingBookingsCount = userBookings.filter(b => b.status === 'PENDING_PROFESSIONAL' || b.status === 'TIME_CHANGE_REQUESTED').length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs" id="site-header">
      {/* Top micro-bar with trust badges & Role Switcher */}
      <div className="bg-[#082B63] text-blue-100 text-xs py-1.5 px-4 sm:px-10 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Left badge */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="font-medium text-[11px] sm:text-xs">
              {lang === 'hi' 
                ? 'बिहार भूमि सेवा मंच: केवल 100% सत्यापित कातिब (Deed Writer) एवं अमीन (Surveyor)' 
                : 'Bihar Land Service Platform: 100% Verified Deed Writers & Amins across 38 Districts'}
            </span>
          </div>

          {/* Right Tools & Role Switcher */}
          <div className="flex items-center gap-3 text-[11px]">
            {/* Stamp Duty Calc Shortcut */}
            <button 
              onClick={() => setIsStampCalcOpen(true)} 
              className="hidden md:flex items-center gap-1 hover:text-white text-slate-300 transition-colors"
              id="header-stamp-calc-btn"
            >
              <Calculator className="w-3 h-3 text-[#F59E0B]" />
              <span>{lang === 'hi' ? 'स्टाम्प ड्यूटी कैलकुलेटर' : 'Bihar Stamp Calc'}</span>
            </button>

            <span className="hidden md:inline opacity-30">|</span>

            {/* Technical SEO Audit Button */}
            <button 
              onClick={() => setIsSeoAuditOpen(true)} 
              className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded-full font-semibold transition-colors"
              id="header-seo-audit-btn"
              title="View Live Technical SEO Audit & Schema"
            >
              <Sparkles className="w-3 h-3" />
              <span>SEO Audit (100% Pass)</span>
            </button>

            <span className="opacity-30">|</span>

            {/* WhatsApp Alerts Drawer Toggle */}
            <button 
              onClick={() => setIsWhatsAppDrawerOpen(true)} 
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 bg-[#0B3D91] px-2.5 py-0.5 rounded-full font-bold transition-all relative"
              id="header-whatsapp-drawer-btn"
              title="Open WhatsApp-First Notification Center"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Live Feed</span>
              {whatsAppMessages.length > 0 && (
                <span className="bg-[#10B981] text-slate-900 text-[10px] font-black px-1.5 py-0.2 rounded-full leading-none">
                  {whatsAppMessages.length}
                </span>
              )}
            </button>

            <span className="opacity-30">|</span>

            {/* Quick Interactive Role Switcher Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 bg-blue-900/80 hover:bg-blue-800 text-white px-2.5 py-0.5 rounded border border-blue-700 text-[11px] font-bold transition-colors"
                id="role-switcher-btn"
              >
                <User className="w-3 h-3 text-amber-300" />
                <span className="capitalize">
                  Role: {currentRole === 'customer' ? 'Customer (Vivek)' : currentRole === 'professional' ? 'Katib (Rajesh)' : currentRole === 'admin' ? 'Admin' : 'Guest'}
                </span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-64 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 py-1.5 z-50 animate-in fade-in-50"
                  onMouseLeave={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1 border-b border-gray-100 text-[10px] font-black tracking-wider text-gray-400 uppercase">
                    Switch Test Account / Role
                  </div>
                  
                  <button
                    onClick={() => { switchRole('customer'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                      currentRole === 'customer' ? 'font-bold text-[#0B3D91] bg-blue-50/70' : 'text-gray-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">Customer / User</div>
                      <div className="text-[10px] text-gray-500">Vivek Ranjan (LCU-001248)</div>
                    </div>
                    {currentRole === 'customer' && <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">Active</span>}
                  </button>

                  <button
                    onClick={() => { switchRole('professional'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                      currentRole === 'professional' ? 'font-bold text-[#0B3D91] bg-blue-50/70' : 'text-gray-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">Deed Writer (Katib)</div>
                      <div className="text-[10px] text-gray-500">Rajesh Kumar Singh (LCP-000492)</div>
                    </div>
                    {currentRole === 'professional' && <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">Active</span>}
                  </button>

                  <button
                    onClick={() => { switchRole('admin'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                      currentRole === 'admin' ? 'font-bold text-[#0B3D91] bg-blue-50/70' : 'text-gray-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">Platform Admin</div>
                      <div className="text-[10px] text-gray-500">Verification & Compliance</div>
                    </div>
                    {currentRole === 'admin' && <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">Active</span>}
                  </button>

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => { logoutUser(); setRoleDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-1.5"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Log Out / Guest Mode</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('home')} 
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo"
        >
          <div className="w-10 h-10 bg-[#082B63] rounded-xl flex items-center justify-center shadow-md shadow-blue-950/10 group-hover:bg-[#0B3D91] transition-colors">
            <span className="text-white font-black text-xl leading-none">L</span>
          </div>
          <div className="flex flex-col leading-none">
            <div className="flex items-baseline">
              <span className="text-2xl font-black text-[#082B63] tracking-tight">LegalCure</span>
              <span className="text-2xl font-black text-[#0B3D91]">.in</span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">
              {lang === 'hi' ? 'बिहार भूमि सेवा मंच' : 'Bihar Land Tech'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-gray-600">
          <button
            onClick={() => handleNav('home')}
            className={`transition-colors py-1 ${activeView === 'home' ? 'text-[#0B3D91] border-b-2 border-[#0B3D91] font-bold pb-1' : 'hover:text-[#0B3D91]'}`}
          >
            {t('nav_home')}
          </button>
          
          <button
            onClick={() => handleNav('professionals')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${activeView === 'professionals' ? 'text-[#0B3D91] border-b-2 border-[#0B3D91] font-bold pb-1' : 'hover:text-[#0B3D91]'}`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('nav_pros')}</span>
          </button>

          <button
            onClick={() => handleNav('how_it_works')}
            className={`transition-colors py-1 ${activeView === 'how_it_works' ? 'text-[#0B3D91] border-b-2 border-[#0B3D91] font-bold pb-1' : 'hover:text-[#0B3D91]'}`}
          >
            {lang === 'hi' ? 'कार्यप्रणाली' : 'How It Works'}
          </button>

          <button
            onClick={() => handleNav('for_professionals')}
            className={`transition-colors py-1 flex items-center gap-1 ${activeView === 'for_professionals' ? 'text-[#0B3D91] border-b-2 border-[#0B3D91] font-bold pb-1' : 'hover:text-[#0B3D91]'}`}
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'hi' ? 'कातिब / अमीन बनें' : 'For Professionals'}</span>
          </button>

          <button
            onClick={() => handleNav('knowledge_center')}
            className={`transition-colors py-1 flex items-center gap-1 ${activeView === 'knowledge_center' ? 'text-[#0B3D91] border-b-2 border-[#0B3D91] font-bold pb-1' : 'hover:text-[#0B3D91]'}`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'hi' ? 'जमीन नियम व गाइड' : 'Bihar Land Guide'}</span>
          </button>

          <button
            onClick={() => handleNav('bookings')}
            className={`flex items-center gap-1.5 transition-colors py-1 ${activeView === 'bookings' ? 'text-[#0B3D91] border-b-2 border-[#0B3D91] font-bold pb-1' : 'hover:text-[#0B3D91]'}`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{t('nav_bookings')}</span>
            {userBookings.length > 0 && (
              <span className="bg-[#0B3D91] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {userBookings.length}
              </span>
            )}
          </button>

          {/* Quick jump to active role dashboard */}
          {currentRole === 'professional' && (
            <button
              onClick={() => handleNav('pro_dashboard')}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                activeView === 'pro_dashboard' 
                  ? 'bg-blue-50 border-[#0B3D91] text-[#0B3D91]' 
                  : 'border-blue-200 text-blue-800 bg-blue-50/50 hover:border-blue-300'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-[#082B63]" />
              <span>Pro Desk</span>
            </button>
          )}

          {currentRole === 'admin' && (
            <button
              onClick={() => handleNav('admin')}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                activeView === 'admin' 
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-800' 
                  : 'border-emerald-200 text-emerald-800 bg-emerald-50/50 hover:border-emerald-300'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Admin Desk</span>
            </button>
          )}
        </nav>

        {/* Right CTA / Language Switcher & Auth */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            id="lang-toggle-btn"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 border border-gray-200 rounded-full px-3.5 py-2 hover:bg-gray-50 uppercase tracking-tight transition-all"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5 text-[#0B3D91]" />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Auth Button or User Badge */}
          {currentUser ? (
            <button
              onClick={() => handleNav(currentRole === 'professional' ? 'pro_dashboard' : currentRole === 'admin' ? 'admin' : 'bookings')}
              className="hidden sm:flex items-center gap-2 border border-gray-200 hover:border-blue-300 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-[#082B63] text-white flex items-center justify-center text-[10px] font-bold">
                {currentUser.name.charAt(0)}
              </div>
              <span className="max-w-[90px] truncate">{currentUser.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="hidden sm:flex items-center gap-1.5 border border-[#0B3D91] text-[#0B3D91] hover:bg-blue-50 px-4 py-2 rounded-full text-xs font-bold transition-all"
              id="header-login-btn"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login / Sign Up</span>
            </button>
          )}

          {/* Main Action Button */}
          <button
            onClick={() => handleNav('professionals')}
            className="bg-[#0B3D91] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-blue-900/10 hover:bg-[#082B63] transition-all active:scale-95 flex items-center gap-1.5"
            id="find-pros-cta-header"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'कातिब / अमीन खोजें' : 'Find Professionals'}</span>
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
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-5 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-2.5 text-sm font-semibold">
            <button
              onClick={() => handleNav('home')}
              className={`text-left py-2 px-3 rounded-lg ${activeView === 'home' ? 'bg-blue-50 text-[#0B3D91] font-bold' : 'text-slate-700'}`}
            >
              {t('nav_home')}
            </button>
            <button
              onClick={() => handleNav('professionals')}
              className={`text-left py-2 px-3 rounded-lg ${activeView === 'professionals' ? 'bg-blue-50 text-[#0B3D91] font-bold' : 'text-slate-700'}`}
            >
              {t('nav_pros')} (Deed Writer & Amin)
            </button>
            <button
              onClick={() => handleNav('how_it_works')}
              className={`text-left py-2 px-3 rounded-lg ${activeView === 'how_it_works' ? 'bg-blue-50 text-[#0B3D91] font-bold' : 'text-slate-700'}`}
            >
              {lang === 'hi' ? 'कार्यप्रणाली (How It Works)' : 'How LegalCure Works'}
            </button>
            <button
              onClick={() => handleNav('for_professionals')}
              className={`text-left py-2 px-3 rounded-lg ${activeView === 'for_professionals' ? 'bg-blue-50 text-[#0B3D91] font-bold' : 'text-slate-700'}`}
            >
              {lang === 'hi' ? 'कातिब / अमीन पंजीकरण' : 'For Professionals (Register)'}
            </button>
            <button
              onClick={() => handleNav('knowledge_center')}
              className={`text-left py-2 px-3 rounded-lg ${activeView === 'knowledge_center' ? 'bg-blue-50 text-[#0B3D91] font-bold' : 'text-slate-700'}`}
            >
              {lang === 'hi' ? 'बिहार जमीन नियम व गाइड' : 'Bihar Land Rules & Guides'}
            </button>
            <button
              onClick={() => {
                setIsStampCalcOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-slate-700 flex items-center justify-between"
            >
              <span>{lang === 'hi' ? 'बिहार स्टाम्प ड्यूटी कैलकुलेटर' : 'Bihar Stamp Duty Calculator'}</span>
              <Calculator className="w-4 h-4 text-[#0B3D91]" />
            </button>
            <button
              onClick={() => handleNav('bookings')}
              className={`text-left py-2 px-3 rounded-lg flex items-center justify-between ${activeView === 'bookings' ? 'bg-blue-50 text-[#0B3D91] font-bold' : 'text-slate-700'}`}
            >
              <span>{t('nav_bookings')}</span>
              {userBookings.length > 0 && (
                <span className="bg-[#0B3D91] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {userBookings.length}
                </span>
              )}
            </button>

            <div className="h-px bg-slate-100 my-1" />

            <button
              onClick={() => handleNav('pro_dashboard')}
              className="text-left py-2 px-3 rounded-lg text-slate-700 flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-[#082B63]" />
              <span>{lang === 'hi' ? 'कातिब / अमीन पोर्टल' : 'Professional Portal'}</span>
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="text-left py-2 px-3 rounded-lg text-slate-700 flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-[#10B981]" />
              <span>{lang === 'hi' ? 'एडमिन सत्यापन डैशबोर्ड' : 'Admin Verification Desk'}</span>
            </button>
            
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                className="w-full bg-[#082B63] text-white text-center py-2.5 rounded-xl font-bold text-xs"
              >
                {currentUser ? `Logged in as ${currentUser.name}` : 'Login / Register'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
