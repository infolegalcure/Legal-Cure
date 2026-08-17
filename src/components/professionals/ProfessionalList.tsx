import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProfessionalCard } from './ProfessionalCard';
import { BIHAR_DISTRICTS, PROFESSIONAL_TYPES } from '../../constants/biharData';
import { sortAlphabetically } from '../../utils/sorting';
import { Search, Filter, RotateCcw, SlidersHorizontal, UserCheck, ShieldCheck, MapPin, Building, X } from 'lucide-react';

export const ProfessionalList: React.FC = () => {
  const { 
    lang, 
    filters, 
    updateFilter, 
    resetFilters, 
    activeSearchQuery,
    setActiveSearchQuery,
    professionals, 
    loadingPros,
    t,
    setIsHelpMeChooseOpen,
    setIsStampCalcOpen
  } = useApp();

  const sortedDistricts = sortAlphabetically(BIHAR_DISTRICTS, d => d.name);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#082B63] tracking-tight">
            {lang === 'hi' ? 'बिहार के प्रमाणित जमीन व रजिस्ट्री विशेषज्ञ' : 'Verified Land & Property Professionals in Bihar'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {lang === 'hi'
              ? 'कातिब (दस्तावेज लेखक), वकील, अमीन (सर्वेयर) और नोटरी। 100% सरकारी लाइसेंस सत्यापित।'
              : 'Direct connection with licensed Deed Writers, Lawyers, Amin Surveyors, and Notaries across 38 Bihar districts.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsHelpMeChooseOpen(true)}
            className="text-xs font-bold text-[#0B3D91] bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            {lang === 'hi' ? '🤔 किसे चुनें? (गाइड)' : '🤔 Help Me Choose Wizard'}
          </button>
          <button
            onClick={() => setIsStampCalcOpen(true)}
            className="text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            {lang === 'hi' ? '📑 स्टाम्प ड्यूटी गणना' : '📑 Stamp Duty Calc'}
          </button>
        </div>
      </div>

      {/* Active 3-Level Search Query Banner */}
      {activeSearchQuery && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0B3D91] text-white flex items-center justify-center shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">
                {t('search_active_query')}
              </div>
              <div className="text-sm font-bold text-[#082B63] flex flex-wrap items-center gap-1.5 mt-0.5">
                <span className="bg-white px-2.5 py-0.5 rounded-md border border-blue-200 text-[#0B3D91]">
                  {activeSearchQuery.professionalType}
                </span>
                <span className="text-slate-400 font-normal">{t('in_district')}</span>
                <span className="bg-white px-2.5 py-0.5 rounded-md border border-blue-200 text-[#082B63] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" />
                  {activeSearchQuery.district}
                </span>
                <span className="text-slate-400 font-normal">•</span>
                <span className="bg-white px-2.5 py-0.5 rounded-md border border-blue-200 text-slate-700 flex items-center gap-1">
                  <Building className="w-3 h-3 text-blue-600" />
                  {activeSearchQuery.location}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="text-xs font-bold text-[#0B3D91] hover:text-[#082B63] bg-white hover:bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-center shrink-0 shadow-2xs"
          >
            <X className="w-3.5 h-3.5" />
            <span>{t('change_search')}</span>
          </button>
        </div>
      )}

      {/* Main Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mb-8 shadow-xl shadow-gray-200/50">
        
        {/* Search row */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery || ''}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              placeholder={lang === 'hi' ? 'नाम, केवाला, दाखिल खारिज, अमीन, या ऑफिस से खोजें...' : 'Search by name, deed type, office, or skill...'}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs sm:text-sm font-medium text-gray-800 focus:bg-white focus:border-[#0B3D91] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              id="search-input-field"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 whitespace-nowrap hidden sm:inline uppercase">
              {lang === 'hi' ? 'क्रमबद्ध:' : 'Sort By:'}
            </span>
            <select
              value={filters.sortBy || 'rating'}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="px-3.5 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-[#082B63] outline-none cursor-pointer focus:border-[#0B3D91]"
              id="sort-select-field"
            >
              <option value="rating">{lang === 'hi' ? '★ सर्वोच्च रेटिंग (Rating)' : '★ Highest Rated'}</option>
              <option value="experience">{lang === 'hi' ? 'सर्वाधिक अनुभव (Experience)' : 'Most Experienced'}</option>
              <option value="price_asc">{lang === 'hi' ? 'कम फीस पहले (Fee: Low to High)' : 'Fee: Low to High'}</option>
              <option value="cases">{lang === 'hi' ? 'अधिकतम केस (Cases Handled)' : 'Most Cases Handled'}</option>
            </select>

            <button
              onClick={resetFilters}
              title="Reset all filters"
              className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-600 rounded-xl transition-colors shrink-0 cursor-pointer"
              aria-label="Reset filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Selects */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-3 border-t border-gray-100 text-xs">
          
          {/* Category */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              {lang === 'hi' ? 'विशेषज्ञ श्रेणी' : 'Category'}
            </label>
            <select
              value={filters.category || 'All'}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg font-semibold text-[#082B63] outline-none cursor-pointer focus:border-[#0B3D91]"
              id="filter-category"
            >
              <option value="All">{lang === 'hi' ? 'सभी श्रेणियां' : 'All Categories'}</option>
              <option value="Amin / Land Surveyor">{lang === 'hi' ? 'अमीन (भूमि नापी)' : 'Amin / Land Surveyor'}</option>
              <option value="Deed Writer">{lang === 'hi' ? 'कातिब / दस्तावेज लेखक' : 'Deed Writer'}</option>
              <option value="Lawyer">{lang === 'hi' ? 'जमीन व राजस्व वकील' : 'Lawyer'}</option>
              <option value="Notary">{lang === 'hi' ? 'नोटरी पब्लिक' : 'Notary'}</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              {lang === 'hi' ? 'जिला (38 Districts)' : 'District'}
            </label>
            <select
              value={filters.district || 'All'}
              onChange={(e) => updateFilter('district', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg font-semibold text-[#082B63] outline-none cursor-pointer focus:border-[#0B3D91]"
              id="filter-district"
            >
              <option value="All">{lang === 'hi' ? 'सभी 38 जिले' : 'All 38 Districts'}</option>
              {sortedDistricts.map(d => (
                <option key={d.name} value={d.name}>
                  {d.name} ({d.nameHi})
                </option>
              ))}
            </select>
          </div>

          {/* Office Type */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              {lang === 'hi' ? 'कार्यालय प्रकार' : 'Office Type'}
            </label>
            <select
              value={filters.officeType || 'All'}
              onChange={(e) => updateFilter('officeType', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg font-semibold text-[#082B63] outline-none cursor-pointer focus:border-[#0B3D91]"
              id="filter-office-type"
            >
              <option value="All">{lang === 'hi' ? 'सभी कार्यालय' : 'All Office Types'}</option>
              <option value="Registry Office">{lang === 'hi' ? 'रजिस्ट्री ऑफिस' : 'Registry Office'}</option>
              <option value="Block Office">{lang === 'hi' ? 'प्रखंड / अंचल कार्यालय' : 'Block / Circle Office'}</option>
              <option value="Civil Court">{lang === 'hi' ? 'सिविल कोर्ट' : 'Civil Court'}</option>
              <option value="Independent Chamber">{lang === 'hi' ? 'निजी चेंबर' : 'Independent Chamber'}</option>
            </select>
          </div>

          {/* Min Experience */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              {lang === 'hi' ? 'न्यूनतम अनुभव' : 'Min Experience'}
            </label>
            <select
              value={filters.minExperience || 0}
              onChange={(e) => updateFilter('minExperience', Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg font-semibold text-[#082B63] outline-none cursor-pointer focus:border-[#0B3D91]"
              id="filter-experience"
            >
              <option value={0}>{lang === 'hi' ? 'सभी अनुभव (Any Exp)' : 'Any Experience'}</option>
              <option value={5}>5+ {lang === 'hi' ? 'वर्ष' : 'Years'}</option>
              <option value={10}>10+ {lang === 'hi' ? 'वर्ष' : 'Years'}</option>
              <option value={15}>15+ {lang === 'hi' ? 'वर्ष' : 'Years'}</option>
              <option value={20}>20+ {lang === 'hi' ? 'वर्ष (वरिष्ठ)' : 'Years (Senior)'}</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Count & Active Filter Tags */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-extrabold text-[#082B63]">
            {professionals.length} {lang === 'hi' ? 'प्रमाणित विशेषज्ञ उपलब्ध' : 'Verified Professionals Available'}
          </span>
          {filters.district && filters.district !== 'All' && (
            <span className="bg-blue-100 text-[#0B3D91] text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {filters.district}
            </span>
          )}
          {filters.category && filters.category !== 'All' && (
            <span className="bg-[#082B63] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              {filters.category}
            </span>
          )}
          {filters.location && filters.location !== 'All' && filters.location.trim() !== '' && (
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Building className="w-3 h-3" />
              {filters.location}
            </span>
          )}
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{lang === 'hi' ? 'सभी प्रोफाइल्स में ₹100 टोकन सुरक्षा लागू है' : '₹100 Token Protection Active on all bookings'}</span>
        </div>
      </div>

      {/* Grid of cards */}
      {loadingPros ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse space-y-4">
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
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 bg-blue-50 text-[#0B3D91] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#082B63] mb-2">
            {t('no_results')}
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            {lang === 'hi'
              ? 'कृपया अपने चुने हुए फिल्टर (जिला, श्रेणी या स्थान) को बदलें या रीसेट करें।'
              : 'Try clearing some filters or searching for another district or office location.'}
          </p>
          <button
            onClick={resetFilters}
            className="bg-[#0B3D91] hover:bg-[#082B63] text-white px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            {t('change_search')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map(pro => (
            <ProfessionalCard key={pro.id} pro={pro} />
          ))}
        </div>
      )}

    </div>
  );
};
