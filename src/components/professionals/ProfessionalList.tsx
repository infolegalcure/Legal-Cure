import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProfessionalCard } from './ProfessionalCard';
import { ProfessionalSearch } from '../search/ProfessionalSearch';
import { 
  MapPin, 
  Building, 
  ShieldCheck, 
  ChevronRight, 
  Search, 
  UserPlus, 
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ProfessionalList: React.FC = () => {
  const { 
    lang, 
    filters, 
    activeSearchQuery,
    resetFilters, 
    professionals, 
    loadingPros,
    setActiveView,
    openAuthModal
  } = useApp();

  // SEO: Update Title & Canonical for Find Professional Landing Page
  useEffect(() => {
    document.title = lang === 'hi'
      ? 'बिहार में कातिब व अमीन खोजें | LegalCure'
      : 'Find Deed Writers & Amin in Bihar | LegalCure';
  }, [lang]);

  const hasExecutedSearch = Boolean(
    activeSearchQuery || 
    (filters.category && filters.category !== 'All') || 
    (filters.district && filters.district !== 'All')
  );

  return (
    <div className="py-8 md:py-10 max-w-7xl mx-auto px-4 sm:px-6" id="find-professional-page">
      
      {/* Semantic Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <li>
            <button 
              onClick={() => setActiveView('home')} 
              className="hover:text-[#082B63] transition-colors cursor-pointer"
            >
              {lang === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}
            </button>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </li>
          <li className="text-[#082B63] font-bold" aria-current="page">
            {lang === 'hi' ? 'विशेषज्ञ खोजें' : 'Find Professional'}
          </li>
        </ol>
      </nav>

      {/* Page Header (Targeted H1 & Supporting Text) */}
      <header className="mb-8 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{lang === 'hi' ? '100% सरकारी लाइसेंस व भौतिक रूप से सत्यापित' : 'Phase 1: 100% Verified Deed Writers & Amin Surveyors'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#082B63] tracking-tight leading-tight">
          {lang === 'hi' 
            ? 'बिहार में जमीन एवं निबंधन सेवा विशेषज्ञ खोजें' 
            : 'Find a Land Service Professional in Bihar'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          {lang === 'hi'
            ? 'अपने निबंधन कार्यालय के अधिकृत दस्तावेज लेखक (कातिब) और अंचल के सरकारी प्रशिक्षित अमीन से सीधे संपर्क करें व पारदर्शी बुकिंग करें।'
            : 'Connect with verified Deed Writers (Katibs) at Sub-Registry Offices and certified Amin Surveyors across Bihar revenue blocks.'}
        </p>
      </header>

      {/* Reusable Canonical 3-Level Conditional Search Component */}
      <div className="mb-10">
        <ProfessionalSearch variant="page" />
      </div>

      {/* Search State / Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200" id="search-results-header">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h2 className="text-base sm:text-lg font-bold text-[#082B63]">
            {loadingPros ? (
              <span>{lang === 'hi' ? 'सत्यापित विशेषज्ञ खोजे जा रहे हैं...' : 'Searching verified professionals...'}</span>
            ) : (
              <span>
                {professionals.length}{' '}
                {lang === 'hi' ? 'सत्यापित विशेषज्ञ उपलब्ध' : 'Verified Professionals Available'}
              </span>
            )}
          </h2>

          {filters.district && filters.district !== 'All' && (
            <span className="bg-blue-50 text-[#0B3D91] border border-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-500" />
              {filters.district}
            </span>
          )}

          {filters.category && filters.category !== 'All' && (
            <span className="bg-[#082B63] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              {filters.category}
            </span>
          )}

          {filters.location && filters.location !== 'All' && filters.location.trim() !== '' && (
            <span className="bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Building className="w-3 h-3 text-amber-600" />
              {filters.location}
            </span>
          )}
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{lang === 'hi' ? '₹100 टोकन सुरक्षा व आधिकारिक रसीद' : '₹100 Token Protection & Direct Office Appointment'}</span>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loadingPros ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse space-y-4 shadow-2xs">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-slate-200 rounded-2xl shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                  <div className="h-3 bg-slate-200 rounded-md w-1/2" />
                  <div className="h-3 bg-slate-200 rounded-md w-2/3" />
                </div>
              </div>
              <div className="h-10 bg-slate-100 rounded-xl" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-9 bg-slate-200 rounded-xl" />
                <div className="h-9 bg-slate-200 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : professionals.length === 0 ? (
        /* Mandatory Requirement 17: No Result Handling */
        <div 
          className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm my-8 animate-fadeIn"
          id="no-results-container"
        >
          <div className="w-16 h-16 bg-blue-50 text-[#082B63] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <Search className="w-8 h-8 text-[#0B3D91]" />
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-[#082B63] mb-2 tracking-tight">
            {lang === 'hi' 
              ? 'इस स्थान पर वर्तमान में कोई सत्यापित विशेषज्ञ उपलब्ध नहीं है।' 
              : 'No verified professional is currently available in this location.'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'हम बिहार के सभी सब-रजिस्ट्री कार्यालयों व अंचलों में निरंतर नए लाइसेंसधारी कातिबों और अमीन का सत्यापन कर रहे हैं।'
              : 'We strictly display 100% verified professionals. Try searching another Sub-Registry Office, Block, or neighboring district.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                resetFilters();
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-[#082B63] hover:bg-[#0B3D91] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              id="try-another-location-btn"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'hi' ? 'दूसरा स्थान चुनें' : 'Try Another Location'}</span>
            </button>

            <button
              onClick={() => {
                setActiveView('pro_register');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="register-as-pro-btn"
            >
              <UserPlus className="w-4 h-4 text-[#0B3D91]" />
              <span>{lang === 'hi' ? 'विशेषज्ञ के रूप में जुड़ें' : 'Register as Professional'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Verified Professional Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="professionals-results-grid">
          {professionals.map(pro => (
            <ProfessionalCard key={pro.id} pro={pro} />
          ))}
        </div>
      )}

      {/* Phase 1 Explanatory Footer Notice */}
      <div className="mt-12 p-5 bg-blue-50/70 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white text-[#0B3D91] flex items-center justify-center font-bold shrink-0 shadow-2xs">
            ℹ️
          </div>
          <div>
            <span className="font-bold text-[#082B63] block">
              {lang === 'hi' ? 'फेज 1 सेवा दायरा (Phase 1 Scope)' : 'LegalCure Phase 1 Operational Scope'}
            </span>
            <span>
              {lang === 'hi' 
                ? 'वर्तमान में केवल दस्तावेज लेखक (कातिब) और सरकारी अमीन सीधे उपलब्ध हैं। अन्य सेवाएं आगामी चरण में शुरू होंगी।' 
                : 'Currently supporting Sub-Registry Deed Writers (Katib) and Revenue Block Amin Surveyors.'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveView('for_professionals')}
          className="text-xs font-bold text-[#082B63] hover:text-[#0B3D91] underline shrink-0 cursor-pointer"
        >
          {lang === 'hi' ? 'कातिब / अमीन निबंधन जानकारी →' : 'Deed Writer / Amin Enrollment →'}
        </button>
      </div>

    </div>
  );
};
