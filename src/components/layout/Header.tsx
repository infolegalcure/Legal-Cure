import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Globe, 
  ShieldCheck, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Bell, 
  ChevronDown, 
  Briefcase, 
  CalendarCheck, 
  CheckCircle2,
  Sparkles,
  Shield,
  ArrowRight
} from 'lucide-react';
import { PRIMARY_NAVIGATION, AUTH_NAVIGATION, NavItem } from '../../constants/navigation';
import legalcureLogo from '../../assets/images/legalcure_logo_1786984287741.jpg';

export const Header: React.FC = () => {
  const { 
    lang, 
    toggleLang, 
    activeView, 
    setActiveView, 
    currentUser, 
    openAuthModal, 
    logoutUser, 
    userBookings,
    setIsWhatsAppDrawerOpen,
    whatsAppMessages
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll listener for sticky compacting transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    setActiveView(item.view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openAuthModal('login');
    setMobileMenuOpen(false);
  };

  const handleProRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveView('pro_register');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 transition-all duration-200 shadow-xs">
      {/* Top trust micro-bar */}
      <div className="bg-[#082B63] text-blue-100 text-xs py-1.5 px-4 sm:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
            <span className="font-medium text-slate-200 truncate">
              {lang === 'hi' 
                ? 'बिहार के 38 जिलों के 135+ निबंधन कार्यालयों में प्रमाणित कातिब व अमीन' 
                : '135+ Bihar Registry & Sub-Registry Offices Covered with Verified Pros'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden md:flex items-center gap-1 text-[#10B981] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? '₹100 टोकन सुरक्षा गारंटी' : '₹100 Token Protection Guarantee'}</span>
            </span>
            <span className="hidden md:inline-block opacity-40">|</span>
            <button
              onClick={toggleLang}
              id="lang-toggle-top-btn"
              className="flex items-center gap-1 font-bold text-white hover:text-amber-300 transition-colors uppercase tracking-tight"
              title="Switch Language / भाषा बदलें"
            >
              <Globe className="w-3 h-3 text-blue-300" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={`max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between transition-all duration-200 ${
          isScrolled ? 'h-16' : 'h-18'
        }`}
      >
        {/* LEFT: LegalCure Logo */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#082B63] rounded-xl"
            id="brand-logo"
            aria-label="LegalCure Home"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-blue-950/20 border border-amber-400/40 flex items-center justify-center bg-[#05162e] shrink-0 group-hover:border-amber-400/70 transition-all">
              <img 
                src={legalcureLogo} 
                alt="LegalCure Logo" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline">
                <span className="text-xl font-black text-[#082B63] tracking-tight">LegalCure</span>
                <span className="text-xl font-black text-[#0B3D91]">.in</span>
              </div>
              <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">
                {lang === 'hi' ? 'बिहार भूमि सेवा मंच' : 'Bihar Land Marketplace'}
              </span>
            </div>
          </a>
        </div>

        {/* CENTER: Primary Navigation Links */}
        <nav 
          className="hidden xl:flex items-center gap-6 text-[13px] font-semibold text-slate-600"
          aria-label="Main Navigation"
        >
          {PRIMARY_NAVIGATION.map((item) => {
            const isActive = activeView === item.view;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`py-1.5 transition-colors relative whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#082B63] rounded-md ${
                  isActive 
                    ? 'text-[#082B63] font-bold' 
                    : 'text-slate-600 hover:text-[#082B63]'
                }`}
              >
                <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#082B63] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Compact Center for Laptop screens (lg - xl) */}
        <nav 
          className="hidden lg:flex xl:hidden items-center gap-4 text-xs font-semibold text-slate-600"
          aria-label="Main Navigation Compact"
        >
          {PRIMARY_NAVIGATION.map((item) => {
            const isActive = activeView === item.view;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`py-1 transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'text-[#082B63] font-bold border-b-2 border-[#082B63]' 
                    : 'text-slate-600 hover:text-[#082B63]'
                }`}
              >
                <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
              </a>
            );
          })}
        </nav>

        {/* RIGHT: Auth & Primary Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            /* Logged-In State */
            <div className="flex items-center gap-3" ref={dropdownRef}>
              {/* Notification trigger */}
              <button
                onClick={() => setIsWhatsAppDrawerOpen(true)}
                className="relative p-2 text-slate-600 hover:text-[#082B63] rounded-full hover:bg-slate-100 transition-colors"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {whatsAppMessages.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#10B981] rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>

              {/* Customer Bookings Quick Nav */}
              {currentUser.role === 'customer' && (
                <button
                  onClick={() => {
                    setActiveView('bookings');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                    activeView === 'bookings'
                      ? 'bg-blue-50 border-[#082B63] text-[#082B63]'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-[#082B63]" />
                  <span>{lang === 'hi' ? 'मेरी बुकिंग्स' : 'My Bookings'}</span>
                  {userBookings.length > 0 && (
                    <span className="bg-[#082B63] text-white text-[10px] px-1.5 py-0.2 rounded-full">
                      {userBookings.length}
                    </span>
                  )}
                </button>
              )}

              {/* Professional Dashboard Quick Nav */}
              {currentUser.role === 'professional' && (
                <button
                  onClick={() => {
                    setActiveView('pro_dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                    activeView === 'pro_dashboard'
                      ? 'bg-blue-50 border-[#082B63] text-[#082B63]'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#082B63]" />
                  <span>{lang === 'hi' ? 'कातिब / अमीन पोर्टल' : 'Pro Portal'}</span>
                </button>
              )}

              {/* Admin Quick Nav */}
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => {
                    setActiveView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                    activeView === 'admin'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'hi' ? 'सत्यापन' : 'Admin'}</span>
                </button>
              )}

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full py-1.5 pl-2 pr-3 text-xs font-bold text-slate-800 transition-colors"
                  aria-expanded={userDropdownOpen}
                >
                  <div className="w-6 h-6 rounded-full bg-[#082B63] text-white flex items-center justify-center text-[10px] font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in-50 slide-in-from-top-2">
                    <div className="px-3 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 text-[#082B63] uppercase tracking-wider">
                        {currentUser.role}
                      </span>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'customer' && (
                        <button
                          onClick={() => {
                            setActiveView('bookings');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 font-medium"
                        >
                          <CalendarCheck className="w-3.5 h-3.5 text-slate-400" />
                          <span>My Bookings</span>
                        </button>
                      )}

                      {currentUser.role === 'professional' && (
                        <button
                          onClick={() => {
                            setActiveView('pro_dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 font-medium"
                        >
                          <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                          <span>Professional Dashboard</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setIsWhatsAppDrawerOpen(true);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 font-medium"
                      >
                        <Bell className="w-3.5 h-3.5 text-slate-400" />
                        <span>Notifications Channel</span>
                      </button>

                      <div className="h-px bg-slate-100 my-1" />

                      <button
                        onClick={() => {
                          logoutUser();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 font-bold"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-500" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Logged-Out State: Login and Register as Professional */
            <div className="flex items-center gap-3">
              {/* Secondary: Login */}
              <a
                href={AUTH_NAVIGATION.login.path}
                onClick={handleLoginClick}
                className="text-xs font-bold text-slate-700 hover:text-[#082B63] px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap border border-slate-200 hover:border-slate-300 bg-slate-50/50"
                id="header-login-btn"
              >
                {lang === 'hi' ? AUTH_NAVIGATION.login.labelHi : AUTH_NAVIGATION.login.labelEn}
              </a>

              {/* Primary CTA: Register as Professional */}
              <a
                href={AUTH_NAVIGATION.proRegister.path}
                onClick={handleProRegisterClick}
                className="bg-[#082B63] text-white hover:bg-[#0B3D91] px-5 py-2 rounded-full text-xs font-bold shadow-md shadow-blue-950/10 transition-all active:scale-98 whitespace-nowrap flex items-center gap-1.5"
                id="header-pro-register-btn"
              >
                <Briefcase className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'hi' ? AUTH_NAVIGATION.proRegister.labelHi : AUTH_NAVIGATION.proRegister.labelEn}</span>
              </a>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLang}
            className="text-[11px] font-bold text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full uppercase"
          >
            {lang === 'en' ? 'हिन्दी' : 'EN'}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-[#082B63] rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Strictly using PRIMARY_NAVIGATION single source of truth) */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden bg-white border-b border-slate-200 px-4 py-6 shadow-xl animate-in slide-in-from-top-2"
          id="mobile-navigation-drawer"
        >
          <div className="flex flex-col gap-1">
            {/* Primary Nav Links */}
            {PRIMARY_NAVIGATION.map((item) => {
              const isActive = activeView === item.view;
              return (
                <a
                  key={`mobile-${item.id}`}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-left py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive 
                      ? 'bg-blue-50 text-[#082B63] font-bold' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#082B63]" />}
                </a>
              );
            })}

            <div className="h-px bg-slate-100 my-3" />

            {/* Mobile Auth & User Section */}
            {currentUser ? (
              <div className="space-y-2 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500">{currentUser.email}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-100 text-[#082B63] uppercase">
                    {currentUser.role}
                  </span>
                </div>

                {currentUser.role === 'customer' && (
                  <button
                    onClick={() => {
                      setActiveView('bookings');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2.5 px-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center justify-between"
                  >
                    <span>{lang === 'hi' ? 'मेरी बुकिंग्स' : 'My Bookings'}</span>
                    {userBookings.length > 0 && (
                      <span className="bg-[#082B63] text-white text-[10px] px-2 py-0.5 rounded-full">
                        {userBookings.length}
                      </span>
                    )}
                  </button>
                )}

                {currentUser.role === 'professional' && (
                  <button
                    onClick={() => {
                      setActiveView('pro_dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2.5 px-3.5 text-xs font-bold text-[#082B63] hover:bg-blue-50 rounded-xl flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'प्रोफेशनल डैशबोर्ड' : 'Professional Dashboard'}</span>
                  </button>
                )}

                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      setActiveView('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2.5 px-3.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 rounded-xl flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'hi' ? 'एडमिन सत्यापन' : 'Admin Verification'}</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setIsWhatsAppDrawerOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2.5 px-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2"
                >
                  <Bell className="w-4 h-4 text-slate-500" />
                  <span>{lang === 'hi' ? 'व्हाट्सएप सूचनाएं' : 'Notifications Channel'}</span>
                </button>

                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2.5 px-3.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 mt-2"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>{lang === 'hi' ? 'लॉगआउट' : 'Logout'}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 pt-1">
                <a
                  href={AUTH_NAVIGATION.login.path}
                  onClick={handleLoginClick}
                  className="w-full block text-center py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
                >
                  {lang === 'hi' ? AUTH_NAVIGATION.login.labelHi : AUTH_NAVIGATION.login.labelEn}
                </a>

                <a
                  href={AUTH_NAVIGATION.proRegister.path}
                  onClick={handleProRegisterClick}
                  className="w-full text-center py-3 text-xs font-bold text-white bg-[#082B63] hover:bg-[#0B3D91] rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-amber-300" />
                  <span>{lang === 'hi' ? AUTH_NAVIGATION.proRegister.labelHi : AUTH_NAVIGATION.proRegister.labelEn}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
